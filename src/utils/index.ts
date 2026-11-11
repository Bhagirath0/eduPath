import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Difficulty, SubmissionStatus, Domain } from '@/types';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format ISO date to readable string */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
}

/** Relative time (e.g. "2 days ago") */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

/** Get badge variant from difficulty */
export function difficultyBadge(d: Difficulty): { badge: string; className: string } {
  if (d === 'Beginner') return { badge: 'badge badge-green', className: 'badge badge-green' };
  if (d === 'Intermediate') return { badge: 'badge badge-yellow', className: 'badge badge-yellow' };
  return { badge: 'badge badge-red', className: 'badge badge-red' };
}

/** Get badge variant from submission status */
export function statusBadge(s: SubmissionStatus): { label: string; className: string } {
  const map: Record<SubmissionStatus, { label: string; className: string }> = {
    'not-started':      { label: 'Not Started',      className: 'badge badge-gray' },
    'in-progress':      { label: 'In Progress',       className: 'badge badge-blue' },
    'submitted':        { label: 'Submitted',          className: 'badge badge-yellow' },
    'under-review':     { label: 'Under Review',       className: 'badge badge-yellow' },
    'completed':        { label: 'Completed',          className: 'badge badge-green' },
    'revision-required':{ label: 'Revision Required',  className: 'badge badge-red' },
  };
  return map[s];
}

/** Domain icon color mapping */
export const DOMAIN_COLORS: Record<Domain, string> = {
  'Java Development':      'text-orange-600 bg-orange-50',
  'Python Development':    'text-blue-600 bg-blue-50',
  'Web Development':       'text-purple-600 bg-purple-50',
  'AI & Machine Learning': 'text-green-600 bg-green-50',
  'Data Analytics':        'text-cyan-600 bg-cyan-50',
  'Cybersecurity':         'text-red-600 bg-red-50',
};

/** Truncate text */
export function truncate(text: string, maxLen = 120): string {
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '…' : text;
}

/** Scroll to element smoothly */
export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Pad number for step indicators */
export function padStep(n: number): string {
  return String(n).padStart(2, '0');
}

