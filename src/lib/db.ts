import Dexie, { type Table } from 'dexie';
import type {
  Resource,
  SyncOperation,
  LearningProgress,
  AppSettings,
  DownloadState,
  LocalContent,
} from '@/types';

export class AppDB extends Dexie {
  resources!: Table<Resource, string>;
  syncQueue!: Table<SyncOperation, string>;
  progress!: Table<LearningProgress, string>;
  settings!: Table<AppSettings, string>;
  downloads!: Table<DownloadState, string>;
  localContent!: Table<LocalContent, string>;

  constructor() {
    // A fresh database name avoids an unsafe primary-key migration
    // from v1 (settings: '++id') to v2 (settings: 'key'). IndexedDB
    // cannot change a keyPath in-place; it must delete and recreate the
    // store, which can fail or hang on some browsers. Using a new name
    // lets a fresh install initialize cleanly without any migration.
    super('OfflineLearningDBv2');
    this.version(1).stores({
      resources: 'resource_id, subject, downloaded, importance, urgency',
      syncQueue: 'id, resource_id, type, status, priority, created_at',
      progress: 'id, resource_id, synced, updated_at',
      settings: 'key',
      downloads: 'resource_id, status',
      localContent: 'resource_id',
    });
  }
}

export const db = new AppDB();

const DEFAULT_SETTINGS: AppSettings = {
  key: 'default',
  data_budget_bytes: 10 * 1024 * 1024,
  preferred_subjects: ['Mathematics', 'Computer Science'],
  auto_sync: true,
  simulation_mode: true,
  simulated_connection: 'connected',
};

export async function initializeDB() {
  const existingSettings = await db.settings.get('default');
  if (!existingSettings) {
    await db.settings.put({ ...DEFAULT_SETTINGS });
  }

  const existingResources = await db.resources.count();
  if (existingResources === 0) {
    const { SAMPLE_RESOURCES } = await import('@/data/sampleResources');
    await db.resources.bulkAdd(
      SAMPLE_RESOURCES.map((r) => ({ ...r }))
    );
  }
}

export async function getSettings(): Promise<AppSettings> {
  const settings = await db.settings.get('default');
  return settings ?? DEFAULT_SETTINGS;
}

export async function updateSettings(patch: Partial<AppSettings>): Promise<void> {
  const current = await getSettings();
  await db.settings.put({ ...current, ...patch, key: 'default' });
}

export async function getAllResources(): Promise<Resource[]> {
  return db.resources.toArray();
}

export async function getResource(id: string): Promise<Resource | undefined> {
  return db.resources.get(id);
}

export async function markResourceDownloaded(
  resourceId: string,
  versionLabel: string,
  versionSizeBytes: number,
  content: string,
  lesson?: import('@/types').LessonContent,
  quizQuestions?: import('@/types').QuizQuestion[],
): Promise<void> {
  await db.resources.update(resourceId, {
    downloaded: true,
    available_offline: true,
  });
  await db.downloads.put({
    resource_id: resourceId,
    status: 'completed',
    progress: 100,
    downloaded_bytes: versionSizeBytes,
    version: versionLabel,
    version_size_bytes: versionSizeBytes,
    started_at: null,
    completed_at: new Date().toISOString(),
    interrupted: false,
  });
  await db.localContent.put({
    resource_id: resourceId,
    content,
    lesson,
    quiz_questions: quizQuestions,
    version: versionLabel,
    version_size_bytes: versionSizeBytes,
    stored_at: new Date().toISOString(),
  });
}

export async function getLocalContent(resourceId: string): Promise<LocalContent | undefined> {
  return db.localContent.get(resourceId);
}

export async function updateDownloadState(
  resourceId: string,
  patch: Partial<DownloadState>
): Promise<void> {
  const existing = await db.downloads.get(resourceId);
  if (existing) {
    await db.downloads.update(resourceId, patch);
  } else {
    await db.downloads.put({
      resource_id: resourceId,
      status: 'none',
      progress: 0,
      downloaded_bytes: 0,
      version: 'full',
      version_size_bytes: 0,
      started_at: null,
      completed_at: null,
      interrupted: false,
      ...patch,
    });
  }
}

export async function getDownloadState(
  resourceId: string
): Promise<DownloadState | undefined> {
  return db.downloads.get(resourceId);
}

export async function getAllDownloadStates(): Promise<DownloadState[]> {
  return db.downloads.toArray();
}

export async function addSyncOperation(op: Omit<SyncOperation, 'id' | 'created_at' | 'retry_count' | 'last_attempt' | 'progress'>): Promise<string> {
  const id = crypto.randomUUID();
  await db.syncQueue.add({
    ...op,
    id,
    created_at: new Date().toISOString(),
    retry_count: 0,
    last_attempt: null,
    progress: 0,
  });
  return id;
}

export async function updateSyncOperation(
  id: string,
  patch: Partial<SyncOperation>
): Promise<void> {
  await db.syncQueue.update(id, patch);
}

export async function getPendingSyncOperations(): Promise<SyncOperation[]> {
  return db.syncQueue.where('status').anyOf(['pending', 'failed', 'paused', 'blocked']).toArray();
}

export async function getAllSyncOperations(): Promise<SyncOperation[]> {
  return db.syncQueue.toArray();
}

export async function saveProgress(progress: Omit<LearningProgress, 'id' | 'created_at' | 'updated_at' | 'synced'>): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.progress.add({
    ...progress,
    id,
    created_at: now,
    updated_at: now,
    synced: false,
  });
  await addSyncOperation({
    type: 'progress',
    resource_id: progress.resource_id,
    payload: { progress_id: id, ...progress },
    priority: 50,
    status: 'pending',
  });
  return id;
}

export async function getAllProgress(): Promise<LearningProgress[]> {
  return db.progress.toArray();
}

export async function getProgressForResource(resourceId: string): Promise<LearningProgress | undefined> {
  return db.progress.where('resource_id').equals(resourceId).first();
}

export async function markProgressSynced(progressId: string): Promise<void> {
  await db.progress.update(progressId, { synced: true });
}

export async function deleteResource(resourceId: string): Promise<void> {
  await db.resources.update(resourceId, {
    downloaded: false,
    available_offline: false,
  });
  await db.downloads.delete(resourceId);
  await db.localContent.delete(resourceId);
}

export async function getDataUsage(): Promise<{ totalDownloaded: number }> {
  const downloads = await db.downloads.where('status').equals('completed').toArray();
  let total = 0;
  for (const dl of downloads) {
    total += dl.version_size_bytes || 0;
  }
  return { totalDownloaded: total };
}

export async function resetLocalData(): Promise<void> {
  await db.transaction('rw', [db.downloads, db.localContent, db.progress, db.syncQueue, db.resources], async () => {
    await db.downloads.clear();
    await db.localContent.clear();
    await db.progress.clear();
    await db.syncQueue.clear();
    const allResources = await db.resources.toArray();
    await Promise.all(allResources.map((r) =>
      db.resources.update(r.resource_id, { downloaded: false, available_offline: false })
    ));
  });
  // Reset connection simulation to connected state
  await updateSettings({ simulated_connection: 'connected', simulation_mode: true });
}
