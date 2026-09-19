import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  ListChecks,
  Trophy,
  X,
} from 'lucide-react';
import type { LocalContent, QuizQuestion, Resource, LearningProgress } from '@/types';

interface QuizViewerProps {
  resource: Resource;
  localContent: LocalContent;
  progress?: LearningProgress;
  onBack: () => void;
  onSaveProgress: (item: { resource_id: string; resource_title: string; status: 'in_progress' | 'completed'; score?: number; total_questions?: number; answers?: number[] }) => void;
}

export function QuizViewer({ resource, localContent, progress, onBack, onSaveProgress }: QuizViewerProps) {
  const questions: QuizQuestion[] = localContent.quiz_questions ?? resource.quiz_questions ?? [];
  const [answers, setAnswers] = useState<number[]>(progress?.answers ?? []);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(progress?.status === 'completed');

  useEffect(() => {
    setAnswers(progress?.answers ?? []);
    setCompleted(progress?.status === 'completed');
  }, [progress]);

  if (questions.length === 0) {
    return (
      <div className="viewer-shell">
        <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
        <div className="viewer-empty">
          <ListChecks size={28} />
          <h2>Quiz content unavailable</h2>
          <p>This quiz does not have questions stored locally.</p>
        </div>
      </div>
    );
  }

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      const idx = questions.findIndex((q) => q.id === questionId);
      if (idx >= 0) next[idx] = optionIndex;
      return next;
    });
  };

  const submitAnswer = (questionId: string) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const allSubmitted = questions.every((q) => submitted[q.id]);
  const correctCount = questions.filter((q, i) => answers[i] === q.correct_answer).length;
  const score = Math.round((correctCount / questions.length) * 100);

  const handleFinish = () => {
    onSaveProgress({
      resource_id: resource.resource_id,
      resource_title: resource.title,
      status: 'completed',
      score,
      total_questions: questions.length,
      answers,
    });
    setCompleted(true);
  };

  return (
    <div className="viewer-shell">
      <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back to library</button>

      <div className="quiz-viewer-layout">
        <article className="viewer-main panel">
          <div className={`viewer-hero ${resource.subject.toLowerCase().replace(/\s/g, '-')}`}>
            <span className="hero-subject">{resource.subject}</span>
            <span className="hero-type">QUIZ</span>
          </div>

          <div className="viewer-content">
            <div className="eyebrow">Interactive quiz</div>
            <h1>{resource.title}</h1>
            <p className="viewer-intro">{resource.description}</p>

            {completed && (
              <div className="quiz-result-banner">
                <Trophy size={22} />
                <div>
                  <strong>Quiz completed!</strong>
                  <span>You scored {progress?.score ?? score}% ({correctCount} of {questions.length} correct)</span>
                </div>
              </div>
            )}

            <div className="quiz-container">
              {questions.map((question, qi) => {
                const selected = answers[qi];
                const isSubmitted = submitted[question.id];
                const isCorrect = selected === question.correct_answer;
                return (
                  <div className="quiz-question" key={question.id}>
                    <div className="quiz-prompt">
                      <span className="quiz-number">{qi + 1}</span>
                      <span>{question.question}</span>
                    </div>
                    <div className="quiz-options">
                      {question.options.map((option, oi) => {
                        const isSelected = selected === oi;
                        const showCorrect = isSubmitted && oi === question.correct_answer;
                        const showWrong = isSubmitted && isSelected && oi !== question.correct_answer;
                        return (
                          <button
                            key={oi}
                            className={`quiz-option ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                            onClick={() => !isSubmitted && selectAnswer(question.id, oi)}
                            disabled={isSubmitted}
                          >
                            <span className="option-letter">{String.fromCharCode(65 + oi)}</span>
                            <span>{option}</span>
                            {showCorrect && <Check size={16} className="option-icon" />}
                            {showWrong && <X size={16} className="option-icon" />}
                          </button>
                        );
                      })}
                    </div>
                    {isSubmitted && (
                      <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="feedback-status">
                          {isCorrect ? <CheckCircle2 size={16} /> : <X size={16} />}
                          <strong>{isCorrect ? 'Correct!' : 'Not quite'}</strong>
                        </div>
                        <p>{question.explanation}</p>
                      </div>
                    )}
                    {!isSubmitted && selected !== undefined && (
                      <button className="secondary-button quiz-submit" onClick={() => submitAnswer(question.id)}>
                        Check answer
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {allAnswered && (
              <div className="quiz-result">
                <div className="quiz-score">
                  <strong>{correctCount} / {questions.length}</strong>
                  <span>correct ({score}%)</span>
                </div>
                <button
                  className="primary-button"
                  onClick={handleFinish}
                  disabled={completed}
                >
                  {completed ? <><CheckCircle2 size={16} /> Completed</> : <><Check size={16} /> Finish quiz</>}
                </button>
              </div>
            )}
          </div>
        </article>

        <aside className="viewer-sidebar">
          <div className="panel">
            <div className="eyebrow">Quiz progress</div>
            <div className="quiz-progress-bar">
              <div className="quiz-progress-track">
                <i style={{ width: `${(Object.keys(submitted).length / questions.length) * 100}%` }} />
              </div>
              <span>{Object.keys(submitted).length} of {questions.length} answered</span>
            </div>
            {completed && (
              <div className="progress-done"><CheckCircle2 size={20} /> <span>Completed — {progress?.score ?? score}%</span></div>
            )}
          </div>
          <div className="panel">
            <div className="eyebrow">Questions</div>
            <nav className="outline-nav">
              {questions.map((q, i) => (
                <a key={q.id} href={`#q-${q.id}`}>
                  <ChevronRight size={14} />
                  <span className={submitted[q.id] ? 'answered' : ''}>Q{i + 1}</span>
                  {submitted[q.id] && answers[i] === q.correct_answer && <Check size={13} className="q-correct" />}
                </a>
              ))}
            </nav>
          </div>
          <div className="panel">
            <div className="eyebrow">Resource info</div>
            <div className="profile-list">
              <div className="profile-item"><span>Subject</span><strong>{resource.subject}</strong></div>
              <div className="profile-item"><span>Size</span><strong>{(resource.estimated_download_size / 1024).toFixed(0)} KB</strong></div>
              <div className="profile-item"><span>Questions</span><strong>{questions.length}</strong></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
