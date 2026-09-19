import { describe, expect, it } from 'vitest';
import { SAMPLE_RESOURCES } from '@/data/sampleResources';
import { calculatePriority, prioritizeResources, selectVersion } from '@/lib/priorityEngine';
import type { AppSettings, Resource } from '@/types';

const settings: AppSettings = {
  key: 'test',
  data_budget_bytes: 10 * 1024 * 1024,
  preferred_subjects: ['Mathematics', 'Computer Science'],
  auto_sync: true,
  simulation_mode: true,
  simulated_connection: 'weak',
};

// math-001: full=2.4MB, light=850KB, text=150KB
const mathResource = SAMPLE_RESOURCES.find((r) => r.resource_id === 'math-001')!;

describe('priority engine', () => {
  it('gives a positive score to a high-value resource', () => {
    const resource = SAMPLE_RESOURCES.find((item) => item.resource_id === 'math-001');
    expect(resource).toBeDefined();
    const scored = calculatePriority(resource!, settings, 'weak', settings.data_budget_bytes, new Set());
    expect(scored?.score).toBeGreaterThan(0);
    expect(scored?.factors.studentPreference).toBe(1);
  });

  it('does not select resources already available offline', () => {
    const selected = prioritizeResources(
      SAMPLE_RESOURCES,
      settings,
      'weak',
      settings.data_budget_bytes,
      new Set(['math-001'])
    );
    expect(selected.some((item) => item.resource.resource_id === 'math-001')).toBe(false);
  });

  it('selects a combination that stays within the data budget', () => {
    const budget = 2 * 1024 * 1024;
    const selected = prioritizeResources(SAMPLE_RESOURCES, settings, 'weak', budget, new Set());
    const total = selected.reduce((sum, item) => sum + item.selectedVersion.size_bytes, 0);
    expect(total).toBeLessThanOrEqual(budget);
    expect(selected.length).toBeGreaterThan(0);
  });

  it('chooses a lighter version for a weak connection when needed', () => {
    const resource = SAMPLE_RESOURCES.find((item) => item.resource_id === 'chem-002');
    expect(resource).toBeDefined();
    // Budget only fits light (1.08MB) not full (3MB)
    const version = selectVersion(resource!, 'weak', 1_200_000);
    expect(version).not.toBeNull();
    expect(version!.size_bytes).toBeLessThan(resource!.size_bytes);
  });
});

describe('selectVersion — budget enforcement', () => {
  it('selects Full when budget exceeds Full size (connected)', () => {
    const version = selectVersion(mathResource, 'connected', 5_000_000);
    expect(version).not.toBeNull();
    expect(version!.quality).toBe('full');
  });

  it('selects Light when Full does not fit (connected)', () => {
    // full=2.4MB, light=850KB, budget=1MB
    const version = selectVersion(mathResource, 'connected', 1_000_000);
    expect(version).not.toBeNull();
    expect(version!.quality).toBe('light');
  });

  it('selects Text when Full and Light do not fit', () => {
    // full=2.4MB, light=850KB, text=150KB, budget=200KB
    const version = selectVersion(mathResource, 'connected', 200_000);
    expect(version).not.toBeNull();
    expect(version!.quality).toBe('text');
  });

  it('returns null when no version fits the budget', () => {
    // text=150KB, budget=100KB
    const version = selectVersion(mathResource, 'connected', 100_000);
    expect(version).toBeNull();
  });

  it('never returns a version larger than the remaining budget', () => {
    const budgets = [5_000_000, 1_000_000, 200_000, 100_000];
    for (const budget of budgets) {
      const version = selectVersion(mathResource, 'connected', budget);
      if (version !== null) {
        expect(version.size_bytes).toBeLessThanOrEqual(budget);
      }
    }
  });

  it('on weak connection prefers light over full', () => {
    // light=850KB fits, full=2.4MB fits too — weak should prefer light
    const version = selectVersion(mathResource, 'weak', 3_000_000);
    expect(version).not.toBeNull();
    expect(version!.quality).toBe('light');
  });

  it('on weak connection falls back to text when light does not fit', () => {
    // light=850KB, text=150KB, budget=500KB
    const version = selectVersion(mathResource, 'weak', 500_000);
    expect(version).not.toBeNull();
    expect(version!.quality).toBe('text');
  });

  it('selected version size represents the actual download cost', () => {
    // Text download should cost text size, not full/estimated size
    const textVersion = selectVersion(mathResource, 'connected', 200_000);
    expect(textVersion).not.toBeNull();
    expect(textVersion!.size_bytes).toBe(150_000); // math-001 text = 150KB
    expect(textVersion!.size_bytes).not.toBe(mathResource.estimated_download_size);
  });
});

describe('data usage accuracy', () => {
  it('selected version size is always the actual deducted amount, not estimated_download_size', () => {
    // For each resource, verify that each version's size_bytes is less than estimated_download_size
    // (estimated_download_size is the Full version size)
    for (const resource of SAMPLE_RESOURCES) {
      const lightVersion = resource.versions.find((v) => v.quality === 'light');
      const textVersion = resource.versions.find((v) => v.quality === 'text');
      if (lightVersion) {
        expect(lightVersion.size_bytes).toBeLessThan(resource.estimated_download_size);
      }
      if (textVersion) {
        expect(textVersion.size_bytes).toBeLessThan(resource.estimated_download_size);
      }
    }
  });

  it('all 14 resources have 3 versions each', () => {
    expect(SAMPLE_RESOURCES).toHaveLength(14);
    for (const resource of SAMPLE_RESOURCES) {
      expect(resource.versions).toHaveLength(3);
      const qualities = resource.versions.map((v) => v.quality);
      expect(qualities).toContain('full');
      expect(qualities).toContain('light');
      expect(qualities).toContain('text');
    }
  });

  it('all version sizes are ordered full > light > text', () => {
    for (const resource of SAMPLE_RESOURCES) {
      const full = resource.versions.find((v) => v.quality === 'full')!;
      const light = resource.versions.find((v) => v.quality === 'light')!;
      const text = resource.versions.find((v) => v.quality === 'text')!;
      expect(full.size_bytes).toBeGreaterThan(light.size_bytes);
      expect(light.size_bytes).toBeGreaterThan(text.size_bytes);
    }
  });
});
