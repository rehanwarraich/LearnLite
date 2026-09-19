import type { Resource, AppSettings, ConnectionStatus, ResourceVersion } from '@/types';

export interface PriorityFactors {
  importance: number;
  urgency: number;
  prerequisite: number;
  studentPreference: number;
  usageLikelihood: number;
  sizePenalty: number;
}

export interface ScoredResource {
  resource: Resource;
  score: number;
  factors: PriorityFactors;
  selectedVersion: ResourceVersion;
}

const IMPORTANCE_WEIGHTS: Record<string, number> = {
  critical: 1.0,
  high: 0.75,
  medium: 0.5,
  low: 0.25,
};

const URGENCY_WEIGHTS: Record<string, number> = {
  immediate: 1.0,
  soon: 0.75,
  normal: 0.5,
  flexible: 0.25,
};

const PREREQUISITE_WEIGHTS: Record<string, number> = {
  foundational: 1.0,
  intermediate: 0.7,
  advanced: 0.4,
};

/**
 * Selects the most appropriate resource version based on connectivity and data budget.
 * Returns null when no version fits the remaining budget.
 *
 * - Connected: prefer full, then light, then text
 * - Weak/intermittent: prefer light, then text, then full
 * - Always respects the hard budget: never returns a version larger than remainingBudget
 */
export function selectVersion(
  resource: Resource,
  connection: ConnectionStatus,
  remainingBudget: number
): ResourceVersion | null {
  const versions = [...resource.versions].sort((a, b) => a.size_bytes - b.size_bytes);

  // No version fits the budget at all
  if (versions.length === 0 || versions[0].size_bytes > remainingBudget) {
    return null;
  }

  const fits = (v: ResourceVersion | undefined): v is ResourceVersion =>
    v !== undefined && v.size_bytes <= remainingBudget;

  if (connection === 'connected') {
    const full = versions.find((v) => v.quality === 'full');
    if (fits(full)) return full;
    const light = versions.find((v) => v.quality === 'light');
    if (fits(light)) return light;
    const text = versions.find((v) => v.quality === 'text');
    if (fits(text)) return text;
  }

  if (connection === 'weak' || connection === 'intermittent') {
    const light = versions.find((v) => v.quality === 'light');
    if (fits(light)) return light;
    const text = versions.find((v) => v.quality === 'text');
    if (fits(text)) return text;
    const full = versions.find((v) => v.quality === 'full');
    if (fits(full)) return full;
  }

  // Fallback: smallest version that fits
  for (const v of versions) {
    if (v.size_bytes <= remainingBudget) return v;
  }

  return null;
}

/**
 * Calculates the priority score for a single resource.
 *
 * Priority Score = importance × urgency × prerequisite value × student preference × usage likelihood − size penalty
 *
 * The size penalty grows with resource size relative to the data budget,
 * discouraging the selection of very large resources when the budget is tight.
 */
export function calculatePriority(
  resource: Resource,
  settings: AppSettings,
  connection: ConnectionStatus,
  remainingBudget: number,
  downloadedResourceIds: Set<string>
): ScoredResource | null {
  if (downloadedResourceIds.has(resource.resource_id)) return null;

  const version = selectVersion(resource, connection, remainingBudget);
  if (!version) return null;
  const size = version.size_bytes;

  if (size > remainingBudget) return null;

  const importance = IMPORTANCE_WEIGHTS[resource.importance] ?? 0.5;
  const urgency = URGENCY_WEIGHTS[resource.urgency] ?? 0.5;
  const prerequisite = PREREQUISITE_WEIGHTS[resource.prerequisite_level] ?? 0.5;

  const studentPreference = settings.preferred_subjects.includes(resource.subject)
    ? 1.0
    : 0.5;

  const usageLikelihood = resource.estimated_usage;

  // Size penalty: larger resources relative to budget get penalized more.
  // Normalized so that a resource using 100% of remaining budget gets a penalty of ~0.5.
  const budgetRatio = remainingBudget > 0 ? size / remainingBudget : 1;
  const sizePenalty = Math.min(budgetRatio * 0.5, 0.5);

  // Connection penalty: on weak connections, very large resources are further penalized.
  let connectionMultiplier = 1.0;
  if (connection === 'weak') connectionMultiplier = 0.85;
  if (connection === 'intermittent') connectionMultiplier = 0.7;

  const baseScore =
    importance * urgency * prerequisite * studentPreference * usageLikelihood;

  const score = (baseScore - sizePenalty) * connectionMultiplier;

  return {
    resource,
    score: Math.max(0, score),
    factors: {
      importance,
      urgency,
      prerequisite,
      studentPreference,
      usageLikelihood,
      sizePenalty,
    },
    selectedVersion: version,
  };
}

/**
 * Greedy knapsack-style selection: sorts by priority score descending and
 * greedily picks resources that fit within the remaining budget.
 *
 * This is a greedy approximation of the 0/1 knapsack problem. It is not optimal
 * but provides good results for the prototype and runs in O(n log n).
 *
 * The algorithm is structured so a more sophisticated optimization (e.g. dynamic
 * programming knapsack) can replace the selection step without changing the
 * scoring or version-selection logic.
 */
export function prioritizeResources(
  resources: Resource[],
  settings: AppSettings,
  connection: ConnectionStatus,
  dataBudgetBytes: number,
  downloadedResourceIds: Set<string>
): ScoredResource[] {
  const scored: ScoredResource[] = [];

  for (const resource of resources) {
    const scoredResource = calculatePriority(
      resource,
      settings,
      connection,
      dataBudgetBytes,
      downloadedResourceIds
    );
    if (scoredResource) {
      scored.push(scoredResource);
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const selected: ScoredResource[] = [];
  let remainingBudget = dataBudgetBytes;

  for (const item of scored) {
    const size = item.selectedVersion.size_bytes;
    if (size <= remainingBudget) {
      selected.push(item);
      remainingBudget -= size;
    }
  }

  return selected;
}

/**
 * Returns the full ranked list (not just selected) so the UI can show
 * what was selected vs. what was left behind.
 */
export function rankAllResources(
  resources: Resource[],
  settings: AppSettings,
  connection: ConnectionStatus,
  dataBudgetBytes: number,
  downloadedResourceIds: Set<string>
): { ranked: ScoredResource[]; selected: ScoredResource[]; totalSelectedSize: number } {
  const scored: ScoredResource[] = [];

  for (const resource of resources) {
    const scoredResource = calculatePriority(
      resource,
      settings,
      connection,
      dataBudgetBytes,
      downloadedResourceIds
    );
    if (scoredResource) {
      scored.push(scoredResource);
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const selected: ScoredResource[] = [];
  let remainingBudget = dataBudgetBytes;

  for (const item of scored) {
    const size = item.selectedVersion.size_bytes;
    if (size <= remainingBudget) {
      selected.push(item);
      remainingBudget -= size;
    }
  }

  const totalSelectedSize = selected.reduce(
    (sum, item) => sum + item.selectedVersion.size_bytes,
    0
  );

  return { ranked: scored, selected, totalSelectedSize };
}

/**
 * Returns the version with the given version_label, or null if not found.
 */
export function findVersion(
  resource: Resource,
  versionLabel: string
): ResourceVersion | null {
  return resource.versions.find((v) => v.version_label === versionLabel) ?? null;
}

/**
 * Returns the lesson content appropriate for the given version quality.
 * Falls back to the default lesson if version-specific content is not defined.
 */
export function getLessonForVersion(
  resource: Resource,
  quality: ResourceVersion['quality']
): import('@/types').LessonContent | undefined {
  if (resource.lesson_versions?.[quality]) {
    return resource.lesson_versions[quality];
  }
  return resource.lesson;
}

/**
 * Returns the quiz questions appropriate for the given version quality.
 * Falls back to the default quiz_questions if version-specific content is not defined.
 */
export function getQuizForVersion(
  resource: Resource,
  quality: ResourceVersion['quality']
): import('@/types').QuizQuestion[] | undefined {
  if (resource.quiz_question_versions?.[quality]) {
    return resource.quiz_question_versions[quality];
  }
  return resource.quiz_questions;
}
