import type { ConnectionStatus } from '@/types';

type Listener = (status: ConnectionStatus) => void;

/**
 * ConnectivityManager monitors the browser's online/offline state and
 * supports a simulation mode that overrides real connectivity for demo purposes.
 *
 * In simulation mode, the manager reports the simulated status regardless of
 * the actual browser connection. When not simulating, it uses navigator.onLine
 * and the Network Information API (if available) to distinguish between
 * 'connected' and 'weak' connections.
 */
class ConnectivityManager {
  private listeners: Set<Listener> = new Set();
  private simulationMode = true;
  private simulatedStatus: ConnectionStatus = 'connected';
  private intermittentTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        if (!this.simulationMode) this.notify(this.getRealStatus());
      });
      window.addEventListener('offline', () => {
        if (!this.simulationMode) this.notify('offline');
      });
    }
  }

  setSimulationMode(enabled: boolean) {
    this.simulationMode = enabled;
    if (!enabled) {
      this.stopIntermittent();
      this.notify(this.getRealStatus());
    } else {
      this.notify(this.simulatedStatus);
    }
  }

  setSimulatedStatus(status: ConnectionStatus) {
    this.simulatedStatus = status;
    this.stopIntermittent();

    if (status === 'intermittent') {
      this.startIntermittent();
    }

    if (this.simulationMode) {
      this.notify(status);
    }
  }

  private startIntermittent() {
    this.stopIntermittent();
    let toggle = true;
    this.intermittentTimer = setInterval(() => {
      const status: ConnectionStatus = toggle ? 'connected' : 'offline';
      toggle = !toggle;
      if (this.simulationMode) {
        this.notify(status);
      }
    }, 4000);
  }

  private stopIntermittent() {
    if (this.intermittentTimer) {
      clearInterval(this.intermittentTimer);
      this.intermittentTimer = null;
    }
  }

  private getRealStatus(): ConnectionStatus {
    if (typeof navigator === 'undefined') return 'connected';
    if (!navigator.onLine) return 'offline';

    // Network Information API (experimental) — used if available.
    const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
    if (conn?.effectiveType) {
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'weak';
    }
    return 'connected';
  }

  getStatus(): ConnectionStatus {
    if (this.simulationMode) {
      return this.simulatedStatus;
    }
    return this.getRealStatus();
  }

  isOnline(): boolean {
    const status = this.getStatus();
    return status === 'connected' || status === 'weak' || status === 'intermittent';
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => this.listeners.delete(listener);
  }

  private notify(status: ConnectionStatus) {
    this.listeners.forEach((l) => l(status));
  }
}

export const connectivityManager = new ConnectivityManager();
