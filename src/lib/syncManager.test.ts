import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { SAMPLE_RESOURCES } from '@/data/sampleResources';
import {
  db,
  addSyncOperation,
  getDownloadState,
  getPendingSyncOperations,
  getProgressForResource,
  initializeDB,
  saveProgress,
} from '@/lib/db';
import { prioritizeResources } from '@/lib/priorityEngine';
import { syncManager } from '@/lib/syncManager';

beforeEach(async () => {
  await Promise.all([
    db.resources.clear(),
    db.syncQueue.clear(),
    db.progress.clear(),
    db.settings.clear(),
    db.downloads.clear(),
  ]);
  await initializeDB();
  syncManager.setConnection('connected');
});

describe('local synchronization flow', () => {
  it('stores offline progress and leaves a pending progress operation', async () => {
    const resource = SAMPLE_RESOURCES[0];
    const progressId = await saveProgress({
      resource_id: resource.resource_id,
      resource_title: resource.title,
      status: 'completed',
      score: 8,
      total_questions: 10,
    });

    const saved = await getProgressForResource(resource.resource_id);
    const pending = await getPendingSyncOperations();

    expect(saved?.id).toBe(progressId);
    expect(saved?.synced).toBe(false);
    expect(pending.some((operation) => operation.type === 'progress')).toBe(true);
  });

  it('does not create duplicate download operations when a plan is queued twice', async () => {
    const resource = SAMPLE_RESOURCES[0];
    const selected = prioritizeResources([resource], await import('@/lib/db').then(({ getSettings }) => getSettings()), 'connected', 10 * 1024 * 1024, new Set());
    expect(selected).toHaveLength(1);
    const plan = { selected, totalSize: selected[0].selectedVersion.size_bytes, remainingBudget: 0 };

    await syncManager.queuePlan(plan);
    await syncManager.queuePlan(plan);

    const downloads = (await db.syncQueue.toArray()).filter((operation) => operation.type === 'download');
    expect(downloads).toHaveLength(1);
  });

  it('marks a failed operation for retry instead of losing it', async () => {
    await addSyncOperation({
      type: 'download',
      resource_id: 'missing-resource',
      priority: 10,
      status: 'pending',
    });

    await syncManager.sync();

    const failed = (await db.syncQueue.toArray()).find((operation) => operation.resource_id === 'missing-resource');
    expect(failed?.status).toBe('failed');
    expect(failed?.retry_count).toBe(1);
  });

  it('preserves interrupted download progress and resumes later', async () => {
    const resource = SAMPLE_RESOURCES[0];
    const settings = await import('@/lib/db').then(({ getSettings }) => getSettings());
    const selected = prioritizeResources([resource], settings, 'weak', 10 * 1024 * 1024, new Set());
    const plan = { selected, totalSize: selected[0].selectedVersion.size_bytes, remainingBudget: 0 };
    await syncManager.queuePlan(plan);

    const syncing = syncManager.sync();
    await new Promise<void>((resolve) => setTimeout(resolve, 650));
    syncManager.setConnection('offline');
    await syncing;

    const paused = await getDownloadState(resource.resource_id);
    expect(paused?.status).toBe('paused');
    expect(paused?.interrupted).toBe(true);
    expect(paused?.progress).toBeGreaterThan(0);
    expect(paused?.progress).toBeLessThan(100);

    syncManager.setConnection('connected');
    await syncManager.sync();
    const completed = await getDownloadState(resource.resource_id);
    expect(completed?.status).toBe('completed');
    expect(completed?.progress).toBe(100);
  }, 15000);
});
