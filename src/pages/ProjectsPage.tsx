import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { projectService } from '@/services';
import type { Project, SubmissionStatus } from '@/types';
import { statusBadge } from '@/utils';
import {
  FolderGit2,
  CheckCircle2,
  Upload,
  BookOpen,
  ChevronDown,
  FileCheck,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    projectService
      .getMyProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = async (id: string) => {
    setSubmittingId(id);
    try {
      const fd = new FormData();
      await projectService.submitProject(id, fd);
      setSubmittedIds((prev) => new Set([...prev, id]));
    } catch (err) {
      console.error('Project submission error:', err);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <DashboardLayout title="Projects">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Capstone & Course Projects</h2>
          <p className="text-sm text-text-secondary mt-1">
            Build full-scale technical projects to demonstrate applied competence and qualify for evaluated certification.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 bg-surface-primary rounded-xl border border-border animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center bg-surface-primary rounded-xl border border-border">
            <FolderGit2 className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-60" />
            <h3 className="font-semibold text-text-primary mb-1">No active projects</h3>
            <p className="text-xs text-text-secondary">
              Enroll in a course and complete the foundational modules to unlock project milestones.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((proj) => {
              const isExpanded = expandedId === proj.id;
              const hasSubmitted = submittedIds.has(proj.id);
              const currentStatus: SubmissionStatus = hasSubmitted ? 'submitted' : proj.submissionStatus;
              const badge = statusBadge(currentStatus);

              return (
                <div
                  key={proj.id}
                  className="bg-surface-primary rounded-xl border border-border shadow-card overflow-hidden"
                >
                  {/* Top Summary */}
                  <div
                    onClick={() => toggleExpand(proj.id)}
                    className="p-6 cursor-pointer hover:bg-surface-secondary/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <div>
                        <span className="text-xs font-semibold text-brand-blue flex items-center gap-1.5 mb-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {proj.courseTitle}
                        </span>
                        <h3 className="font-bold text-lg text-text-primary">{proj.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={badge.className}>{badge.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-border bg-surface-secondary/30 space-y-6">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                          Project Requirements
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {proj.requirements.map((req, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-3 rounded-lg bg-surface-primary border border-border text-xs text-text-primary flex items-start gap-2"
                            >
                              <span className="text-brand-blue font-bold">✓</span>
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables & Evaluation */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-surface-primary border border-border">
                          <h4 className="text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
                            <FileCheck className="w-3.5 h-3.5 text-brand-blue" />
                            Deliverables
                          </h4>
                          <ul className="space-y-1.5 text-xs text-text-secondary">
                            {proj.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-lg bg-surface-primary border border-border">
                          <h4 className="text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                            Evaluation Benchmarks
                          </h4>
                          <ul className="space-y-1.5 text-xs text-text-secondary">
                            {proj.evaluationCriteria.map((ec, eIdx) => (
                              <li key={eIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                                <span>{ec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Submission Box */}
                      <div className="p-5 rounded-lg bg-surface-primary border border-border space-y-3">
                        <h4 className="text-xs font-semibold text-text-primary flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5 text-brand-blue" />
                          Project Submission Portal
                        </h4>

                        {hasSubmitted ? (
                          <div className="p-3 rounded-lg bg-status-successLight text-xs text-status-success font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Project uploaded for review! (Mock submission — received by development adapter)</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="border border-dashed border-border rounded-lg p-6 text-center">
                              <p className="text-xs text-text-secondary mb-1">
                                Upload your GitHub repository link or ZIP archive containing source files
                              </p>
                              <p className="text-[11px] text-text-muted">{proj.submissionInstructions}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                              <span className="text-[11px] text-text-muted">
                                Mock Mode: Evaluator feedback is simulated locally until backend API is connected.
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                loading={submittingId === proj.id}
                                onClick={() => handleSubmit(proj.id)}
                              >
                                Submit Capstone Project
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
