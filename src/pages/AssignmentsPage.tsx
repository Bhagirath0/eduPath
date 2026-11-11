import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { assignmentService } from '@/services';
import type { Assignment, SubmissionStatus } from '@/types';
import { statusBadge } from '@/utils';
import {
  FileCheck2,
  Clock,
  BookOpen,
  Upload,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const STATUS_FILTERS: (SubmissionStatus | 'all')[] = [
  'all',
  'not-started',
  'in-progress',
  'submitted',
  'completed',
];

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: 'badge badge-green',
  Intermediate: 'badge badge-yellow',
  Advanced: 'badge badge-red',
};

const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<SubmissionStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    assignmentService
      .getMyAssignments()
      .then((data) => setAssignments(data))
      .catch((err) => console.error('Failed to load assignments:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = assignments.filter((item) => {
    if (selectedStatus === 'all') return true;
    return item.submissionStatus === selectedStatus;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = async (id: string) => {
    setSubmittingId(id);
    try {
      const fd = new FormData();
      await assignmentService.submitAssignment(id, fd);
      setSubmittedIds((prev) => new Set([...prev, id]));
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <DashboardLayout title="Assignments">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary">Course Assignments</h2>
          <p className="text-sm text-text-secondary mt-1">
            Practical programming tasks designed to reinforce concepts from each module.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === st
                  ? 'bg-brand-blue text-white'
                  : 'bg-surface-primary border border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              {st === 'all' ? 'All Assignments' : st.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-surface-primary rounded-xl border border-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-surface-primary rounded-xl border border-border">
            <FileCheck2 className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-60" />
            <h3 className="font-semibold text-text-primary mb-1">No assignments found</h3>
            <p className="text-xs text-text-secondary">
              There are no assignments matching the selected status.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((asgn) => {
              const isExpanded = expandedId === asgn.id;
              const hasSubmitted = submittedIds.has(asgn.id);
              const currentStatus: SubmissionStatus = hasSubmitted ? 'submitted' : asgn.submissionStatus;
              const badge = statusBadge(currentStatus);

              return (
                <div
                  key={asgn.id}
                  className="bg-surface-primary rounded-xl border border-border shadow-card overflow-hidden transition-all"
                >
                  <div
                    onClick={() => toggleExpand(asgn.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-surface-secondary/40 transition-colors"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-brand-blue flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {asgn.courseTitle}
                        </span>
                        {asgn.moduleTitle && (
                          <span className="text-xs text-text-muted">· {asgn.moduleTitle}</span>
                        )}
                        <span className={DIFFICULTY_BADGE[asgn.difficulty] ?? 'badge badge-gray'}>
                          {asgn.difficulty}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-text-primary">{asgn.title}</h3>

                      {asgn.deadlineDays && (
                        <p className="text-xs text-text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Recommended deadline: {asgn.deadlineDays} days after module completion
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={badge.className}>{badge.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded instructions & submission */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-border bg-surface-secondary/30 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                          Instructions & Problem Statement
                        </h4>
                        <div className="p-4 rounded-lg bg-surface-primary border border-border text-xs text-text-secondary leading-relaxed">
                          {asgn.instructions}
                        </div>
                      </div>

                      {/* Mock submission form */}
                      <div className="p-4 rounded-lg bg-surface-primary border border-border space-y-3">
                        <h4 className="text-xs font-semibold text-text-primary flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5 text-brand-blue" />
                          Assignment Submission
                        </h4>

                        {hasSubmitted ? (
                          <div className="p-3 rounded-lg bg-status-successLight text-xs text-status-success font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Submitted successfully! (Mock submission — received by development adapter)</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="border border-dashed border-border rounded-lg p-4 text-center">
                              <p className="text-xs text-text-secondary mb-1">
                                Drag and drop your source code or archive file here
                              </p>
                              <p className="text-[11px] text-text-muted">Supported: .zip, .java, .py, .html</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-text-muted">
                                Mock Mode: Files are processed locally without permanent storage.
                              </span>
                              <Button
                                variant="primary"
                                size="sm"
                                loading={submittingId === asgn.id}
                                onClick={() => handleSubmit(asgn.id)}
                              >
                                Submit Assignment
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

export default AssignmentsPage;
