export type ContentType = 'text' | 'pdf' | 'image' | 'quiz' | 'practice';
export type Importance = 'critical' | 'high' | 'medium' | 'low';
export type Urgency = 'immediate' | 'soon' | 'normal' | 'flexible';
export type PrerequisiteLevel = 'foundational' | 'intermediate' | 'advanced';
export type ConnectionStatus = 'offline' | 'weak' | 'intermittent' | 'connected';
export type DownloadStatus = 'none' | 'queued' | 'downloading' | 'paused' | 'completed' | 'failed' | 'blocked';
export type SyncOpType = 'download' | 'progress' | 'progress_update';
export type SyncOpStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'paused' | 'blocked';

export interface ResourceVersion {
  id: string;
  version_label: string;
  size_bytes: number;
  quality: 'full' | 'light' | 'text';
  description: string;
}

export interface Resource {
  resource_id: string;
  title: string;
  subject: string;
  description: string;
  content_type: ContentType;
  size_bytes: number;
  estimated_download_size: number;
  importance: Importance;
  urgency: Urgency;
  prerequisite_level: PrerequisiteLevel;
  estimated_usage: number;
  available_offline: boolean;
  downloaded: boolean;
  last_updated: string;
  versions: ResourceVersion[];
  content: string;
  lesson?: LessonContent;
  lesson_versions?: { full: LessonContent; light: LessonContent; text: LessonContent };
  quiz_questions?: QuizQuestion[];
  quiz_question_versions?: { full: QuizQuestion[]; light: QuizQuestion[]; text: QuizQuestion[] };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface LessonSection {
  heading: string;
  body: string;
}

export interface LessonExample {
  title: string;
  steps: string[];
}

export interface LessonContent {
  introduction: string;
  objectives: string[];
  sections: LessonSection[];
  examples: LessonExample[];
  key_takeaways: string[];
  practice_questions: QuizQuestion[];
}

export interface SyncOperation {
  id: string;
  type: SyncOpType;
  resource_id?: string;
  payload?: unknown;
  priority: number;
  status: SyncOpStatus;
  created_at: string;
  retry_count: number;
  last_attempt: string | null;
  progress: number;
}

export interface LearningProgress {
  id: string;
  resource_id: string;
  resource_title: string;
  status: 'in_progress' | 'completed';
  score?: number;
  total_questions?: number;
  answers?: number[];
  created_at: string;
  updated_at: string;
  synced: boolean;
}

export interface AppSettings {
  key: string;
  data_budget_bytes: number;
  preferred_subjects: string[];
  auto_sync: boolean;
  simulation_mode: boolean;
  simulated_connection: ConnectionStatus;
}

export interface DownloadState {
  resource_id: string;
  status: DownloadStatus;
  progress: number;
  downloaded_bytes: number;
  version: string;
  version_size_bytes: number;
  started_at: string | null;
  completed_at: string | null;
  interrupted: boolean;
}

export interface LocalContent {
  resource_id: string;
  content: string;
  lesson?: LessonContent;
  quiz_questions?: QuizQuestion[];
  version: string;
  version_size_bytes: number;
  stored_at: string;
}
