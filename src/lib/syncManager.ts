import type { ConnectionStatus, Resource, AppSettings } from '@/types';
import { getLessonForVersion, getQuizForVersion, prioritizeResources, type ScoredResource } from '@/lib/priorityEngine';
import {
  addSyncOperation,
  db,
  getAllDownloadStates,
  getAllResources,
  getDataUsage,
  getPendingSyncOperations,
  getSettings,
  markProgressSynced,
  markResourceDownloaded,
  updateDownloadState,
  updateSyncOperation,
} from '@/lib/db';

type SyncListener = (event: SyncEvent) => void;

export interface SyncEvent {
  type: 'started' | 'progress' | 'paused' | 'completed' | 'error' | 'idle' | 'budget_exhausted';
  resourceId?: string;
  progress?: number;
  message?: string;
}

export interface SyncPlan {
  selected: ScoredResource[];
  totalSize: number;
  remainingBudget: number;
}

class SyncManager {
  private listeners = new Set<SyncListener>();
  private running = false;
  private currentStatus: SyncEvent = { type: 'idle' };
  private connection: ConnectionStatus = 'connected';

  setConnection(status: ConnectionStatus) {
    const wasOnline = !this.isOffline();
    this.connection = status;
    const isOnline = !this.isOffline();

    if (wasOnline && !isOnline && this.running) {
      this.emit({ type: 'paused', message: 'Connection lost. Download will resume automatically.' });
    }
  }

  subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    listener(this.currentStatus);
    return () => this.listeners.delete(listener);
  }

  private emit(event: SyncEvent) {
    this.currentStatus = event;
    this.listeners.forEach((listener) => listener(event));
  }

  async createPlan(): Promise<SyncPlan> {
    const resources = await getAllResources();
    const settings = await getSettings();
    const { totalDownloaded } = await getDataUsage();
    const remainingBudget = Math.max(0, settings.data_budget_bytes - totalDownloaded);
    const downloadedStates = await getAllDownloadStates();
    const downloadedIds = new Set(
      downloadedStates.filter((state) => state.status === 'completed').map((state) => state.resource_id)
    );

    const { selected } = this.getPrioritizedSelection(
      resources,
      settings,
      remainingBudget,
      downloadedIds
    );
    const totalSize = selected.reduce((sum, item) => sum + item.selectedVersion.size_bytes, 0);

    return {
      selected,
      totalSize,
      remainingBudget: Math.max(0, remainingBudget - totalSize),
    };
  }

  private getPrioritizedSelection(
    resources: Resource[],
    settings: AppSettings,
    remainingBudget: number,
    downloadedIds: Set<string>
  ) {
    return {
      selected: prioritizeResources(
        resources,
        settings,
        this.connection,
        remainingBudget,
        downloadedIds
      ),
    };
  }

  async queuePlan(plan: SyncPlan): Promise<void> {
    for (const item of plan.selected) {
      const existing = await db.syncQueue
        .where('resource_id')
        .equals(item.resource.resource_id)
        .filter((op) => op.type === 'download' && ['pending', 'in_progress', 'paused'].includes(op.status))
        .first();

      if (!existing) {
        await addSyncOperation({
          type: 'download',
          resource_id: item.resource.resource_id,
          priority: item.score * 100,
          status: 'pending',
        });
        await updateDownloadState(item.resource.resource_id, {
          status: 'queued',
          progress: 0,
          version: item.selectedVersion.version_label,
          interrupted: false,
        });
      }
    }
  }

  async sync(): Promise<void> {
    if (this.running || this.isOffline()) return;
    this.running = true;

    try {
      await this.processProgressQueue();
      const pending = await getPendingSyncOperations();
      const downloads = pending
        .filter((op) => op.type === 'download')
        .sort((a, b) => b.priority - a.priority);

      let budgetExhausted = false;

      for (const operation of downloads) {
        if (this.isOffline()) {
          this.emit({ type: 'paused', message: 'Connection lost. Pending downloads are saved.' });
          break;
        }
        if (budgetExhausted) break;

        try {
          const result = await this.processDownload(operation.id, operation.resource_id);
          if (result === 'budget_exhausted') {
            budgetExhausted = true;
          }
        } catch (error) {
          await updateSyncOperation(operation.id, {
            status: 'failed',
            retry_count: operation.retry_count + 1,
            last_attempt: new Date().toISOString(),
          });
          this.emit({
            type: 'error',
            resourceId: operation.resource_id,
            message: error instanceof Error ? error.message : 'Download failed; it will retry later',
          });
        }
      }

      if (!this.isOffline() && !budgetExhausted) {
        this.emit({ type: 'completed', message: 'Synchronization complete' });
      }
    } catch (error) {
      this.emit({
        type: 'error',
        message: error instanceof Error ? error.message : 'Synchronization could not complete',
      });
    } finally {
      this.running = false;
    }
  }

  private async getRemainingBudget(): Promise<number> {
    const settings = await getSettings();
    const { totalDownloaded } = await getDataUsage();
    return Math.max(0, settings.data_budget_bytes - totalDownloaded);
  }

  private async processDownload(operationId: string, resourceId: string | undefined): Promise<'completed' | 'budget_exhausted' | 'paused'> {
    if (!resourceId) return 'completed';
    const resource = await db.resources.get(resourceId);
    if (!resource) throw new Error('Resource is unavailable locally');

    const existingState = await db.downloads.get(resourceId);
    const startProgress = existingState?.progress ?? 0;
    let progress = startProgress;

    // Hard budget check before starting: if the resource can't fit, block it.
    const remainingBudget = await this.getRemainingBudget();
    const version = resource.versions.find((item) => item.version_label === existingState?.version)
      ?? resource.versions[0];
    const resourceSize = version.size_bytes;

    // Update the download state with the actual version size
    await updateDownloadState(resourceId, { version_size_bytes: resourceSize });

    if (resourceSize > remainingBudget) {
      await updateDownloadState(resourceId, {
        status: 'blocked',
        progress,
        interrupted: false,
      });
      await updateSyncOperation(operationId, { status: 'blocked', progress });
      this.emit({
        type: 'budget_exhausted',
        resourceId,
        progress,
        message: 'Data budget exhausted. Increase your budget to resume downloads.',
      });
      return 'budget_exhausted';
    }

    await updateSyncOperation(operationId, {
      status: 'in_progress',
      last_attempt: new Date().toISOString(),
    });
    await updateDownloadState(resourceId, {
      status: 'downloading',
      started_at: existingState?.started_at ?? new Date().toISOString(),
      interrupted: false,
    });
    this.emit({ type: 'started', resourceId, progress });

    // Simulates chunked transfer; the same state shape supports real range requests later.
    while (progress < 100) {
      if (this.connection === 'offline') {
        await updateDownloadState(resourceId, {
          status: 'paused',
          progress,
          interrupted: true,
        });
        await updateSyncOperation(operationId, { status: 'paused', progress });
        this.emit({ type: 'paused', resourceId, progress, message: 'Download paused' });
        return 'paused';
      }

      // Check remaining budget during download.
      const currentRemaining = await this.getRemainingBudget();
      if (currentRemaining <= 0) {
        await updateDownloadState(resourceId, {
          status: 'paused',
          progress,
          interrupted: true,
        });
        await updateSyncOperation(operationId, { status: 'paused', progress });
        this.emit({
          type: 'budget_exhausted',
          resourceId,
          progress,
          message: 'Data budget exhausted. Download paused. Increase your budget to resume.',
        });
        return 'budget_exhausted';
      }

      await new Promise<void>((resolve) => setTimeout(resolve, this.connection === 'weak' ? 260 : 120));
      progress = Math.min(100, progress + (this.connection === 'weak' ? 8 : 16));
      await updateDownloadState(resourceId, { progress, status: 'downloading' });
      await updateSyncOperation(operationId, { progress });
      this.emit({ type: 'progress', resourceId, progress });
    }

    const lesson = getLessonForVersion(resource, version.quality);
    const quizQuestions = getQuizForVersion(resource, version.quality);
    await markResourceDownloaded(resourceId, version.version_label, version.size_bytes, resource.content, lesson, quizQuestions);
    await updateSyncOperation(operationId, { status: 'completed', progress: 100 });
    this.emit({ type: 'completed', resourceId, progress: 100, message: 'Resource available offline' });
    return 'completed';
  }

  private async processProgressQueue(): Promise<void> {
    if (this.isOffline()) return;
    const pending = (await getPendingSyncOperations()).filter((op) => op.type === 'progress');
    for (const operation of pending) {
      if (this.isOffline()) return;
      await updateSyncOperation(operation.id, {
        status: 'in_progress',
        last_attempt: new Date().toISOString(),
      });
      await new Promise<void>((resolve) => setTimeout(resolve, 250));
      const payload = operation.payload as { progress_id?: string } | undefined;
      if (payload?.progress_id) {
        await markProgressSynced(payload.progress_id);
      }
      await updateSyncOperation(operation.id, { status: 'completed', progress: 100 });
      this.emit({ type: 'completed', message: 'Learning progress synchronized' });
    }
  }

  async syncPendingProgress(): Promise<void> {
    await this.processProgressQueue();
  }

  private isOffline(): boolean {
    return this.connection === 'offline';
  }

  get isRunning(): boolean {
    return this.running;
  }
}

export const syncManager = new SyncManager();
