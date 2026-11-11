import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { internshipService } from '@/services';
import type { Internship } from '@/types';
import { DOMAIN_COLORS } from '@/utils';
import {
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckSquare,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: 'badge badge-green',
  Intermediate: 'badge badge-yellow',
  Advanced: 'badge badge-red',
};

const InternshipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    internshipService
      .getInternshipBySlug(slug)
      .then((data) => setInternship(data))
      .catch((err) => console.error('Failed to load internship details:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleApply = async () => {
    if (!internship) return;
    setApplying(true);
    try {
      await internshipService.applyForInternship(internship.id);
      setApplied(true);
    } catch (err) {
      console.error('Failed to apply:', err);
    } finally {
      setApplying(false);
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

  if (!internship) {
    return (
      <PublicLayout>
        <div className="container-content py-24 text-center">
          <AlertCircle className="w-12 h-12 text-status-error mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Internship Not Found</h2>
          <p className="text-text-secondary mb-6">
            The internship program you are looking for does not exist or has closed.
          </p>
          <Link to="/internships">
            <Button variant="primary">Return to Internships</Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const domainColor = DOMAIN_COLORS[internship.domain] ?? '#6B7280';

  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-surface-secondary border-b border-border py-12 md:py-16">
        <div className="container-content">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge badge-blue">{internship.domain}</span>
            <span className={DIFFICULTY_BADGE[internship.difficulty] ?? 'badge badge-gray'}>
              {internship.difficulty}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 max-w-4xl">
            {internship.title}
          </h1>

          <p className="text-text-secondary text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
            {internship.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-blue" />
              <span>{internship.duration} Structured Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span>{internship.weeklyStructure?.length ?? 4} Weekly Milestones</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-blue" />
              <span>Evaluated Internship Certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-content py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                Program Overview
              </h2>
              <p className="text-text-secondary leading-relaxed text-base">
                {internship.overview}
              </p>
            </section>

            {/* Learning Objectives */}
            <section className="bg-surface-secondary rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                What You Will Achieve & Deliver
              </h2>
              <div className="space-y-3">
                {internship.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Weekly Structure */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                Weekly Milestone Structure
              </h2>
              <div className="space-y-4">
                {internship.weeklyStructure.map((week) => (
                  <div
                    key={week.week}
                    className="p-5 rounded-xl border border-border bg-surface-primary shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-brand-blueLight text-brand-blue text-xs font-mono font-semibold">
                        Week {week.week}
                      </span>
                      <h3 className="font-bold text-base text-text-primary">{week.title}</h3>
                    </div>
                    <ul className="space-y-2 pl-2">
                      {week.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckSquare className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Evaluation Criteria */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                Evaluation Criteria
              </h2>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                Certificates are issued only to interns who satisfy our objective evaluation benchmarks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {internship.evaluationCriteria.map((crit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-surface-secondary border border-border text-xs text-text-primary flex items-start gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                    <span className="font-medium">{crit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Process */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border">
                Application & Onboarding Process
              </h2>
              <div className="space-y-3">
                {internship.applicationProcess.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="w-6 h-6 rounded-full bg-surface-secondary border border-border text-xs font-mono font-semibold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Apply Sticky Box */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-surface-primary rounded-xl border border-border shadow-card p-6 overflow-hidden relative">
              <div className="h-1.5 absolute top-0 inset-x-0" style={{ backgroundColor: domainColor }} />

              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                  Internship Opportunity
                </span>
                <h3 className="font-bold text-xl text-text-primary mt-1 mb-2">
                  {internship.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-status-successLight text-status-success text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Free Application
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-3 pb-6 border-b border-border text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Domain:</span>
                  <span className="font-medium text-text-primary">{internship.domain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Duration:</span>
                  <span className="font-medium text-text-primary">{internship.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Difficulty:</span>
                  <span className="font-medium text-text-primary">{internship.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Certificate:</span>
                  <span className="font-medium text-text-primary">Based on milestone completion</span>
                </div>
              </div>

              {/* Eligibility */}
              <div className="py-4 border-b border-border">
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2.5">
                  Eligibility Requirements
                </h4>
                <ul className="space-y-1.5">
                  {internship.eligibility.map((el, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                      <span className="text-brand-blue font-bold">✓</span>
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Action */}
              <div className="pt-6 space-y-3">
                {applied ? (
                  <div className="p-3.5 rounded-lg bg-status-successLight border border-status-success/30 text-xs text-status-success font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Application received! (Mock mode — not persisted)</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    fullWidth
                    loading={applying}
                    onClick={handleApply}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Apply for Internship
                  </Button>
                )}

                <p className="text-[11px] text-text-muted text-center leading-relaxed">
                  We review prerequisite completion and notify eligible students with onboarding instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default InternshipDetailPage;
