import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseService } from '@/services';
import type { Course, Module, Lesson, EnrollmentStatus } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  FileCode2,
  HelpCircle,
  FileDown,
  ArrowLeft,
  Check,
  Menu,
  X,
} from 'lucide-react';
import CodeBlock from '@/components/ui/CodeBlock';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';

const LearningPage: React.FC = () => {
  const { courseSlug, moduleSlug } = useParams<{ courseSlug: string; moduleSlug: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [, setEnrollment] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!courseSlug) return;
    setLoading(true);
    courseService
      .getCourseBySlug(courseSlug)
      .then(async (c) => {
        setCourse(c);
        if (c) {
          const status = await courseService.getEnrollmentStatus(c.id);
          setEnrollment(status);
          if (status?.completedLessonIds) {
            setCompletedLessons(new Set(status.completedLessonIds));
          }
        }
      })
      .catch((err) => console.error('Failed to load course for learning:', err))
      .finally(() => setLoading(false));
  }, [courseSlug]);

  // Find active module
  const currentModule: Module | undefined = useMemo(() => {
    if (!course?.modules) return undefined;
    // Match either by slug or id
    return (
      course.modules.find((m) => (m.slug || m.id) === moduleSlug) ||
      course.modules.find((m) => m.id === moduleSlug) ||
      course.modules[0]
    );
  }, [course, moduleSlug]);

  // Find all lessons flattened for prev/next
  const allLessons = useMemo(() => {
    if (!course?.modules) return [];
    return course.modules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleSlug: m.slug || m.id }))
    );
  }, [course]);

  // Active lesson
  const currentLesson: Lesson | undefined = useMemo(() => {
    if (!currentModule?.lessons || currentModule.lessons.length === 0) return undefined;
    if (selectedLessonId) {
      const found = allLessons.find((l) => l.id === selectedLessonId);
      if (found) return found;
    }
    return currentModule.lessons[0];
  }, [currentModule, selectedLessonId, allLessons]);

  // Current lesson index in allLessons
  const currentIndex = useMemo(() => {
    if (!currentLesson) return -1;
    return allLessons.findIndex((l) => l.id === currentLesson.id);
  }, [allLessons, currentLesson]);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleSelectLesson = (lessonId: string, modSlug: string) => {
    setSelectedLessonId(lessonId);
    setSidebarOpen(false);
    if (modSlug !== moduleSlug) {
      navigate(`/learn/${courseSlug}/${modSlug}`, { replace: true });
    }
  };

  const handleMarkComplete = async () => {
    if (!course || !currentLesson) return;
    try {
      await courseService.markLessonComplete(course.id, currentLesson.id);
      setCompletedLessons((prev) => new Set([...prev, currentLesson.id]));
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-surface-primary p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <Link to="/courses">
          <Button variant="primary">Return to Courses</Button>
        </Link>
      </div>
    );
  }

  const isCurrentCompleted = currentLesson ? completedLessons.has(currentLesson.id) : false;
  const totalLessonsCount = allLessons.length;
  const completedCount = completedLessons.size;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0d11] flex flex-col text-slate-900 dark:text-white transition-colors duration-200">
      {/* Top Header Bar */}
      <header className="h-14 bg-white dark:bg-[#121620] border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden"
            aria-label="Toggle curriculum"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Overview</span>
          </Link>

          <span className="text-slate-300 dark:text-white/20 text-xs hidden sm:inline">|</span>

          <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
            {course.title}
          </span>
        </div>

        {/* Progress pill & Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-blue transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{progressPercent}%</span>
          </div>

          <ThemeToggle />

          <Link
            to="/dashboard"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Curriculum Sidebar */}
        <aside
          className={`fixed lg:static top-14 bottom-0 left-0 z-30 w-72 sm:w-80 bg-slate-50 dark:bg-[#12151d] border-r border-slate-200 dark:border-white/10 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#121620]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Course Curriculum
            </h2>
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{course.title}</p>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {completedCount} of {totalLessonsCount} lessons completed
            </div>
          </div>

          {/* Module list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {course.modules?.map((mod, mIdx) => {
              return (
                <div key={mod.id} className="bg-white dark:bg-[#121620] rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden">
                  <div className="p-3 bg-slate-50 dark:bg-[#161a24] font-semibold text-xs text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <span className="truncate">
                      {mIdx + 1}. {mod.title}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-mono">
                      {mod.lessons?.length ?? 0}
                    </span>
                  </div>

                  <div className="p-1 space-y-0.5">
                    {mod.lessons?.map((les) => {
                      const isSelected = currentLesson?.id === les.id;
                      const isDone = completedLessons.has(les.id);

                      return (
                        <button
                          key={les.id}
                          onClick={() => handleSelectLesson(les.id, mod.slug || mod.id)}
                          className={`w-full text-left px-2.5 py-2 rounded-md text-xs flex items-center justify-between gap-2 transition-colors ${
                            isSelected
                              ? 'bg-brand-blue/15 text-brand-blue dark:text-blue-400 font-semibold'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-60" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>

                          {les.contentType === 'code-example' && (
                            <FileCode2 className="w-3 h-3 text-slate-400 shrink-0" />
                          )}
                          {les.contentType === 'practice-questions' && (
                            <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center: Lesson Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto w-full">
          {currentLesson ? (
            <div className="space-y-8">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                <span>{currentModule?.title}</span>
                <span>/</span>
                <span className="text-slate-900 dark:text-white font-medium">{currentLesson.title}</span>
              </div>

              {/* Lesson Title Header */}
              <div className="border-b border-slate-200 dark:border-white/10 pb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
                    {currentLesson.contentType}
                  </span>
                  {currentLesson.estimatedMinutes && (
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      · ~{currentLesson.estimatedMinutes} min read
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {currentLesson.title}
                </h1>
              </div>

              {/* Lesson Body Content Based on Type */}
              <div className="space-y-6 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {/* Standard text body */}
                {currentLesson.content ? (
                  <div className="prose-content whitespace-pre-line">
                    {currentLesson.content}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      Welcome to this lesson on <strong>{currentLesson.title}</strong>. In this module, we focus on understanding fundamental concepts from first principles before writing practical code.
                    </p>
                    <p className="text-text-secondary">
                      Carefully read through the concepts, review the structured code samples, and ensure you understand how each component behaves before proceeding to the practice exercises.
                    </p>
                  </div>
                )}

                {/* Code Example block if present */}
                {currentLesson.codeExample && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-sm text-text-primary mb-2 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-brand-blue" />
                      Code Demonstration ({currentLesson.codeExample.language})
                    </h3>
                    <CodeBlock
                      code={currentLesson.codeExample.code}
                      language={currentLesson.codeExample.language}
                      output={currentLesson.codeExample.output}
                      explanation={currentLesson.codeExample.explanation}
                    />
                  </div>
                )}

                {/* Practice Questions if present */}
                {currentLesson.practiceQuestions && currentLesson.practiceQuestions.length > 0 && (
                  <div className="mt-8 space-y-6 bg-slate-50 dark:bg-[#121620] rounded-xl p-6 border border-slate-200 dark:border-white/10">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-blue" />
                      Check Your Understanding
                    </h3>

                    {currentLesson.practiceQuestions.map((q, qIdx) => (
                      <div key={q.id} className="bg-white dark:bg-[#161a24] rounded-lg p-5 border border-slate-200 dark:border-white/10 space-y-3">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">
                          {qIdx + 1}. {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = selectedAnswers[q.id] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() =>
                                  setSelectedAnswers((prev) => ({ ...prev, [q.id]: oIdx }))
                                }
                                className={`w-full text-left p-2.5 rounded-lg text-xs border transition-colors flex items-center gap-2.5 ${
                                  isSelected
                                    ? 'border-brand-blue bg-brand-blue/15 text-brand-blue dark:text-blue-400 font-medium'
                                    : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#121620] text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                                }`}
                              >
                                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {selectedAnswers[q.id] !== undefined && (
                          <div className="pt-2">
                            <button
                              onClick={() =>
                                setShowAnswer((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                              }
                              className="text-xs text-brand-blue font-medium hover:underline"
                            >
                              {showAnswer[q.id] ? 'Hide Explanation' : 'Check Explanation'}
                            </button>
                            {showAnswer[q.id] && (
                              <div className="mt-2 p-3 rounded-lg bg-surface-secondary text-xs text-text-secondary border border-border">
                                {q.explanation || 'Great job checking the concept! Review lesson notes for deeper context.'}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* PDF Viewer Stub if content is PDF */}
                {currentLesson.contentType === 'pdf' && (
                  <div className="mt-6 p-8 rounded-xl border border-dashed border-border bg-surface-secondary text-center space-y-3">
                    <FileText className="w-12 h-12 text-brand-blue mx-auto opacity-70" />
                    <h4 className="font-semibold text-sm text-text-primary">
                      Embedded PDF Notes
                    </h4>
                    <p className="text-xs text-text-secondary max-w-md mx-auto">
                      PDF viewer interface is initialized. Documents will be streamed securely once connected to backend file storage.
                    </p>
                    <Button variant="secondary" size="sm">
                      <FileDown className="w-3.5 h-3.5 mr-1.5" />
                      Download Notes (Mock)
                    </Button>
                  </div>
                )}
              </div>

              {/* Completion & Next/Prev Controls */}
              <div className="pt-10 border-t border-border mt-12 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-secondary rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2">
                    {isCurrentCompleted ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-status-success font-medium">
                        <Check className="w-4 h-4" /> Lesson Completed
                      </span>
                    ) : (
                      <span className="text-xs text-text-secondary">
                        Done studying this lesson? Mark it complete to track progress.
                      </span>
                    )}
                  </div>

                  <Button
                    variant={isCurrentCompleted ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={handleMarkComplete}
                  >
                    {isCurrentCompleted ? 'Marked Complete' : 'Mark as Complete'}
                  </Button>
                </div>

                {/* Prev / Next buttons */}
                <div className="flex items-center justify-between gap-4">
                  {prevLesson ? (
                    <button
                      onClick={() => handleSelectLesson(prevLesson.id, prevLesson.moduleSlug)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary py-2 px-3 rounded-lg border border-border bg-surface-primary hover:bg-surface-secondary"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <div className="text-left hidden sm:block">
                        <div className="text-[10px] text-text-muted uppercase">Previous</div>
                        <div className="truncate max-w-[150px]">{prevLesson.title}</div>
                      </div>
                      <span className="sm:hidden">Previous</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextLesson ? (
                    <button
                      onClick={() => handleSelectLesson(nextLesson.id, nextLesson.moduleSlug)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-brand-blue hover:text-brand-blueDark py-2 px-3 rounded-lg border border-brand-blue/30 bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/30 ml-auto"
                    >
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-brand-blue/80 uppercase">Next</div>
                        <div className="truncate max-w-[150px] font-semibold">{nextLesson.title}</div>
                      </div>
                      <span className="sm:hidden">Next Lesson</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 py-2 px-4 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 ml-auto"
                    >
                      <span>Course Completed · Go to Dashboard</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-text-muted">
              Select a lesson from the curriculum to begin studying.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LearningPage;
