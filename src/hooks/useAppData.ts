import { useEffect, useState } from 'react';
import type {
  AppSettings,
  ConnectionStatus,
  DownloadState,
  LearningProgress,
  Resource,
  SyncOperation,
} from '@/types';
import * as db from '@/lib/db';
import { connectivityManager } from '@/lib/connectivityManager';
import { findVersion, prioritizeResources } from '@/lib/priorityEngine';
import { syncManager, type SyncEvent as ManagerSyncEvent } from '@/lib/syncManager';

export function useAppData() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [downloads, setDownloads] = useState<DownloadState[]>([]);
  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [syncQueue, setSyncQueue] = useState<SyncOperation[]>([]);
  const [connection, setConnection] = useState<ConnectionStatus>('connected');
  const [syncEvent, setSyncEvent] = useState<ManagerSyncEvent>({ type: 'idle' });
  const [isReady, setIsReady] = useState(false);
  const [actualUsage, setActualUsage] = useState(0);

  const refresh = async () => {
    const [nextResources, nextSettings, nextDownloads, nextProgress, nextQueue, usageResult] = await Promise.all([
      db.getAllResources(),
      db.getSettings(),
      db.getAllDownloadStates(),
      db.getAllProgress(),
      db.getAllSyncOperations(),
      db.getDataUsage(),
    ]);
    setResources(nextResources);
    setSettings(nextSettings);
    setDownloads(nextDownloads);
    setProgress(nextProgress);
    setSyncQueue(nextQueue);
    setActualUsage(usageResult.totalDownloaded);
  };

  useEffect(() => {
    let mounted = true;
    void db.initializeDB().then(async () => {
      if (!mounted) return;
      await refresh();
      setIsReady(true);
    }).catch((error) => {
      console.error('Database initialization failed:', error);
      if (mounted) setIsReady(true);
    });

    const unsubscribeConnection = connectivityManager.subscribe((status) => {
      setConnection(status);
      syncManager.setConnection(status);
    });
    const unsubscribeSync = syncManager.subscribe((event) => {
      setSyncEvent(event);
      void refresh();
    });

    return () => {
      mounted = false;
      unsubscribeConnection();
      unsubscribeSync();
    };
  }, []);

  const updateSettings = async (patch: Partial<AppSettings>) => {
    await db.updateSettings(patch);
    if (patch.simulation_mode !== undefined) {
      connectivityManager.setSimulationMode(patch.simulation_mode);
    }
    if (patch.simulated_connection !== undefined) {
      connectivityManager.setSimulatedStatus(patch.simulated_connection);
    }
    await refresh();
  };

  const sync = async () => {
    const plan = await syncManager.createPlan();
    await syncManager.queuePlan(plan);
    await syncManager.sync();
    await refresh();
  };

  const downloadResource = async (resource: Resource) => {
    const currentSettings = settings ?? await db.getSettings();
    const { totalDownloaded } = await db.getDataUsage();
    const downloadedIds = new Set(
      downloads.filter((download) => download.status === 'completed').map((download) => download.resource_id)
    );
    const selected = prioritizeResources(
      [resource],
      currentSettings,
      connection,
      Math.max(0, currentSettings.data_budget_bytes - totalDownloaded),
      downloadedIds
    );
    if (selected[0]) {
      await syncManager.queuePlan({
        selected,
        totalSize: selected[0].selectedVersion.size_bytes,
        remainingBudget: Math.max(0, currentSettings.data_budget_bytes - totalDownloaded - selected[0].selectedVersion.size_bytes),
      });
      await syncManager.sync();
      await refresh();
    }
  };

  const downloadResourceVersion = async (resource: Resource, versionLabel: string) => {
    const currentSettings = settings ?? await db.getSettings();
    const { totalDownloaded } = await db.getDataUsage();
    const remainingBudget = Math.max(0, currentSettings.data_budget_bytes - totalDownloaded);
    const version = findVersion(resource, versionLabel);
    if (!version) return;
    if (version.size_bytes > remainingBudget) return;
    const downloadedIds = new Set(
      downloads.filter((download) => download.status === 'completed').map((download) => download.resource_id)
    );
    await db.updateDownloadState(resource.resource_id, {
      status: 'queued',
      progress: 0,
      version: versionLabel,
      version_size_bytes: version.size_bytes,
      interrupted: false,
    });
    await db.addSyncOperation({
      type: 'download',
      resource_id: resource.resource_id,
      priority: 100,
      status: 'pending',
    });
    await syncManager.sync();
    await refresh();
  };

  const saveLearningProgress = async (item: Omit<LearningProgress, 'id' | 'created_at' | 'updated_at' | 'synced'>) => {
    await db.saveProgress(item);
    await refresh();
  };

  const getLocalContent = async (resourceId: string) => {
    return db.getLocalContent(resourceId);
  };

  const resetLocalData = async () => {
    await db.resetLocalData();
    setSyncEvent({ type: 'idle' });
    await refresh();
    connectivityManager.setSimulatedStatus('connected');
  };

  return {
    resources,
    settings,
    downloads,
    progress,
    syncQueue,
    connection,
    syncEvent,
    isReady,
    actualUsage,
    refresh,
    updateSettings,
    sync,
    downloadResource,
    downloadResourceVersion,
    saveLearningProgress,
    getLocalContent,
    resetLocalData,
  };
}
