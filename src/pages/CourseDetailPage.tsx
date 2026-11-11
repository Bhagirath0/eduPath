import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { courseService } from '@/services';
import type { Course, EnrollmentStatus } from '@/types';
import { DOMAIN_COLORS } from '@/utils';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: 'badge badge-green',
  Intermediate: 'badge badge-yellow',
  Advanced: 'badge badge-red',
};

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    courseService
      .getCourseBySlug(slug)
      .then(async (c) => {
        setCourse(c);
        if (c) {
          // Pre-expand first module
          if (c.modules && c.modules.length > 0) {
            setExpandedModules({ [c.modules[0].id]: true });
          }
          const status = await courseService.getEnrollmentStatus(c.id);
          setEnrollment(status);
        }
      })
      .catch((err) => console.error('Failed to load course details:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    try {
      await courseService.enrollInCourse(course.id);
      setEnrolledSuccess(true);
    } catch (err) {
      console.error('Enrollment error:', err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="container-content py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
        </div>
      </PublicLayout>
    );
  }

  if (!course) {
    return (
      <PublicLayout>
        <div className="container-content py-24 text-center">
          <AlertCircle className="w-12 h-12 text-status-error mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Course Not Found</h2>
          <p className="text-text-secondary mb-6">
            The course you are looking for does not exist or has not been published yet.
          </p>
          <Link to="/courses">
            <Button variant="primary">Return to All Courses</Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const isEnrolled = enrollment !== null || enrolledSuccess;
  const domainColor = DOMAIN_COLORS[course.domain] ?? '#6B7280';
  const skills = course.skillsCovered || course.skills || [];
  const whatYouWillLearn = course.whatYouWillLearn || course.learningObjectives || [];
  const firstModule = course.modules?.[0];
  const firstModuleSlug = firstModule?.slug || firstModule?.id || 'module-1';

  return (
    <PublicLayout>
      {/* Course Header Banner */}
      <div className="bg-surface-secondary border-b border-border py-12 md:py-16">
        <div className="container-content">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge badge-blue">{course.domain}</span>
            <span className={DIFFICULTY_BADGE[course.difficulty] ?? 'badge badge-gray'}>
              {course.difficulty}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 max-w-4xl">
            {course.title}
          </h1>

          <p className="text-text-secondary text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
            {course.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-blue" />
              <span>{course.durationWeeks} weeks ({course.estimatedHours} total hours)</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-blue" />
              <span>{course.modules?.length ?? 0} structured modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-blue" />
              <span>Evaluated completion certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container-content py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                About This Course
              </h2>
              <p className="text-text-secondary leading-relaxed text-base">
                {course.description}
              </p>
            </section>

            {/* What you will learn */}
            {whatYouWillLearn.length > 0 && (
              <section className="bg-surface-secondary rounded-xl border border-border p-6 sm:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  What You Will Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Covered */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                  Skills Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-surface-secondary border border-border text-text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Curriculum Accordion */}
            <section>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                <h2 className="text-xl font-bold text-text-primary">
                  Course Curriculum
                </h2>
                <span className="text-xs text-text-muted">
                  {course.modules?.length ?? 0} modules · Click to view lessons
                </span>
              </div>

              <div className="space-y-3">
                {course.modules?.map((mod, index) => {
                  const isExpanded = !!expandedModules[mod.id];
                  return (
                    <div
                      key={mod.id}
                      className="rounded-xl border border-border bg-surface-primary overflow-hidden transition-all shadow-card"
                    >
                      {/* Module Header Button */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-md bg-surface-secondary text-text-secondary text-xs font-mono font-semibold flex items-center justify-center shrink-0 border border-border">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="font-semibold text-sm text-text-primary truncate">
                              {mod.title}
                            </h3>
                            {mod.description && (
                              <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                                {mod.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-text-muted">
                            {mod.lessons?.length ?? 0} lessons
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Module Lessons List */}
                      {isExpanded && (
                        <div className="px-5 pb-4 pt-1 border-t border-border/60 bg-surface-secondary/30 space-y-2">
                          {mod.lessons?.map((les, lIdx) => (
                            <div
                              key={les.id}
                              className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-primary border border-border text-xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[11px] text-text-muted">
                                  {index + 1}.{lIdx + 1}
                                </span>
                                <span className="font-medium text-text-primary">
                                  {les.title}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-surface-secondary text-[10px] uppercase font-mono text-text-muted border border-border">
                                  {les.contentType}
                                </span>
                              </div>
                              {les.estimatedMinutes && (
                                <span className="text-text-muted font-mono text-[11px]">
                                  {les.estimatedMinutes}m
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Prerequisites */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                Prerequisites
              </h2>
              <ul className="space-y-2">
                {course.prerequisites?.map((prereq, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Enrollment Box */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-surface-primary rounded-xl border border-border shadow-card p-6 overflow-hidden relative">
              <div className="h-1.5 absolute top-0 inset-x-0" style={{ backgroundColor: domainColor }} />

              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                  Course Track
                </span>
                <h3 className="font-bold text-xl text-text-primary mt-1 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded bg-status-successLight text-status-success font-medium">
                    Free Access
                  </span>
                  <span className="text-xs text-text-secondary">Self-paced with evaluation</span>
                </div>
              </div>

              {/* Course specs list */}
              <div className="space-y-3 pb-6 border-b border-border text-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Difficulty:</span>
                  <span className="font-medium text-text-primary">{course.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Estimated Duration:</span>
                  <span className="font-medium text-text-primary">{course.durationWeeks} weeks</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Commitment:</span>
                  <span className="font-medium text-text-primary">~{course.estimatedHours} hours</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Curriculum:</span>
                  <span className="font-medium text-text-primary">{course.modules?.length ?? 0} modules</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Certificate:</span>
                  <span className="font-medium text-text-primary">Upon verified project</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 space-y-3">
                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-brand-blueLight/70 border border-brand-blue/20 text-xs text-brand-blue font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>You are enrolled in this course</span>
                    </div>
                    <Link to={`/learn/${course.slug}/${firstModuleSlug}`}>
                      <Button variant="primary" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    fullWidth
                    loading={enrolling}
                    onClick={handleEnroll}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Enroll in Course
                  </Button>
                )}

                <p className="text-[11px] text-text-muted text-center leading-relaxed">
                  Note: In development mode, mock data adapter is active. Submissions and enrollment are not permanently stored in backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default CourseDetailPage;
