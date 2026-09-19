import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  ListChecks,
  Target,
  X,
} from 'lucide-react';
import type { LessonContent, LocalContent, Resource, LearningProgress } from '@/types';

interface LessonViewerProps {
  resource: Resource;
  localContent: LocalContent;
  progress?: LearningProgress;
  onBack: () => void;
  onSaveProgress: (item: { resource_id: string; resource_title: string; status: 'in_progress' | 'completed'; score?: number; total_questions?: number; answers?: number[] }) => void;
}

export function LessonViewer({ resource, localContent, progress, onBack, onSaveProgress }: LessonViewerProps) {
  const lesson: LessonContent | undefined = localContent.lesson ?? resource.lesson;
  const [answers, setAnswers] = useState<number[]>(progress?.answers ?? []);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(progress?.status === 'completed');

  useEffect(() => {
    setAnswers(progress?.answers ?? []);
    setCompleted(progress?.status === 'completed');
  }, [progress]);

  if (!lesson) {
    return (
      <div className="viewer-shell">
        <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
        <div className="viewer-empty">
          <BookOpen size={28} />
          <h2>Lesson content unavailable</h2>
          <p>This resource does not have structured lesson content stored locally.</p>
        </div>
      </div>
    );
  }

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      const idx = lesson.practice_questions.findIndex((q) => q.id === questionId);
      if (idx >= 0) next[idx] = optionIndex;
      return next;
    });
  };

  const submitAnswer = (questionId: string) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const allAnswered = lesson.practice_questions.every((_, i) => answers[i] !== undefined);
  const correctCount = lesson.practice_questions.filter((q, i) => answers[i] === q.correct_answer).length;
  const score = Math.round((correctCount / lesson.practice_questions.length) * 100);

  const handleComplete = () => {
    onSaveProgress({
      resource_id: resource.resource_id,
      resource_title: resource.title,
      status: 'completed',
      score,
      total_questions: lesson.practice_questions.length,
      answers,
    });
    setCompleted(true);
  };

  return (
    <div className="viewer-shell">
      <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back to library</button>

      <div className="viewer-layout">
        <article className="viewer-main panel">
          <div className={`viewer-hero ${resource.subject.toLowerCase().replace(/\s/g, '-')}`}>
            <span className="hero-subject">{resource.subject}</span>
            <span className="hero-type">{resource.content_type}</span>
          </div>

          <div className="viewer-content">
            <div className="eyebrow">Lesson</div>
            <h1>{resource.title}</h1>
            <p className="viewer-intro">{lesson.introduction}</p>

            <section className="viewer-section">
              <div className="section-heading"><Target size={18} /> <h2>Learning objectives</h2></div>
              <ul className="objective-list">
                {lesson.objectives.map((obj, i) => (
                  <li key={i}><Check size={15} className="obj-check" /> {obj}</li>
                ))}
              </ul>
            </section>

            {lesson.sections.map((section, i) => (
              <section className="viewer-section" key={i}>
                <h2 className="section-title">{section.heading}</h2>
                <p className="section-body">{section.body}</p>
              </section>
            ))}

            {lesson.examples.length > 0 && (
              <section className="viewer-section">
                <div className="section-heading"><Lightbulb size={18} /> <h2>Worked examples</h2></div>
                {lesson.examples.map((example, i) => (
                  <div className="example-card" key={i}>
                    <div className="example-header">{example.title}</div>
                    <ol className="example-steps">
                      {example.steps.map((step, j) => (
                        <li key={j}><code>{step}</code></li>
                      ))}
                    </ol>
                  </div>
                ))}
              </section>
            )}

            <section className="viewer-section">
              <div className="section-heading"><ListChecks size={18} /> <h2>Key takeaways</h2></div>
              <ul className="takeaway-list">
                {lesson.key_takeaways.map((takeaway, i) => (
                  <li key={i}><CheckCircle2 size={16} className="takeaway-check" /> {takeaway}</li>
                ))}
              </ul>
            </section>

            <section className="viewer-section">
              <div className="section-heading"><BookOpen size={18} /> <h2>Practice questions</h2></div>
              <div className="quiz-container">
                {lesson.practice_questions.map((question, qi) => {
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
                    <strong>{correctCount} / {lesson.practice_questions.length}</strong>
                    <span>correct ({score}%)</span>
                  </div>
                  <button
                    className="primary-button"
                    onClick={handleComplete}
                    disabled={completed}
                  >
                    {completed ? <><CheckCircle2 size={16} /> Completed</> : <><Check size={16} /> Mark lesson complete</>}
                  </button>
                </div>
              )}
            </section>
          </div>
        </article>

        <aside className="viewer-sidebar">
          <div className="panel">
            <div className="eyebrow">Progress</div>
            <div className="progress-status">
              {completed ? (
                <div className="progress-done"><CheckCircle2 size={20} /> <span>Lesson completed</span></div>
              ) : (
                <div className="progress-pending"><BookOpen size={20} /> <span>In progress</span></div>
              )}
              {progress?.score !== undefined && (
                <div className="progress-score">Score: {progress.score}%</div>
              )}
            </div>
          </div>
          <div className="panel">
            <div className="eyebrow">Lesson outline</div>
            <nav className="outline-nav">
              <a href="#objectives"><ChevronRight size={14} /> Objectives</a>
              {lesson.sections.map((section, i) => (
                <a key={i} href={`#section-${i}`}><ChevronRight size={14} /> {section.heading}</a>
              ))}
              <a href="#takeaways"><ChevronRight size={14} /> Key takeaways</a>
              <a href="#practice"><ChevronRight size={14} /> Practice</a>
            </nav>
          </div>
          <div className="panel">
            <div className="eyebrow">Resource info</div>
            <div className="profile-list">
              <div className="profile-item"><span>Subject</span><strong>{resource.subject}</strong></div>
              <div className="profile-item"><span>Size</span><strong>{(resource.estimated_download_size / 1024).toFixed(0)} KB</strong></div>
              <div className="profile-item"><span>Priority</span><strong className={resource.importance === 'critical' ? 'coral' : ''}>{resource.importance}</strong></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
