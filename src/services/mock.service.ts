// ─────────────────────────────────────────────────────────────────
// MOCK SERVICE IMPLEMENTATION
//
// Simulates async API calls using local mock data.
// All delays mimic real network latency.
//
// TO SWITCH TO REAL API:
//   Replace imports in src/services/index.ts with the real service.
//   This file should not be used in production.
// ─────────────────────────────────────────────────────────────────

import { MOCK_COURSES } from '@/data/courses.mock';
import { MOCK_INTERNSHIPS } from '@/data/internships.mock';
import {
  MOCK_DASHBOARD,
  MOCK_ASSIGNMENTS,
  MOCK_PROJECTS,
  MOCK_CERTIFICATES,
  MOCK_USER,
  MOCK_ENROLLMENT_STATUSES,
} from '@/data/user.mock';

import type {
  CourseService, InternshipService,
  AssignmentService, ProjectService,
  CertificateService, UserService, AuthService,
} from './interfaces';
import type { CourseFilters, InternshipFilters } from '@/types';

// Simulate network delay
const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms));

// ── Course Service (Mock) ─────────────────────────────────────────

export const mockCourseService: CourseService = {
  async getCourses(filters?: CourseFilters) {
    await delay();
    let courses = MOCK_COURSES.filter((c) => c.published);
    if (filters?.domain) courses = courses.filter((c) => c.domain === filters.domain);
    if (filters?.difficulty) courses = courses.filter((c) => c.difficulty === filters.difficulty);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      courses = courses.filter(
        (c) => c.title.toLowerCase().includes(q) || c.domain.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
      );
    }
    if (filters?.durationMax) courses = courses.filter((c) => c.durationWeeks <= filters.durationMax!);
    return courses;
  },

  async getCourseBySlug(slug: string) {
    await delay(300);
    return MOCK_COURSES.find((c) => c.slug === slug && c.published) ?? null;
  },

  async getEnrollmentStatus(courseId: string) {
    await delay(200);
    // Mock: user is enrolled in course-001 and course-005
    return MOCK_ENROLLMENT_STATUSES.find((e) => e.courseId === courseId) ?? null;
  },

  async enrollInCourse(_courseId: string) {
    await delay(600);
    // Mock: enrollment not persisted — this is a development stub
    console.info('[MOCK] enrollInCourse called — no data is persisted in mock mode.');
    return { data: { enrolled: true }, success: true, message: 'Enrolled (mock — not persisted)' };
  },

  async markLessonComplete(_courseId: string, _lessonId: string) {
    await delay(300);
    console.info('[MOCK] markLessonComplete — not persisted in mock mode.');
    return { data: undefined, success: true };
  },
};

// ── Internship Service (Mock) ─────────────────────────────────────

export const mockInternshipService: InternshipService = {
  async getInternships(filters?: InternshipFilters) {
    await delay();
    let internships = MOCK_INTERNSHIPS.filter((i) => i.published);
    if (filters?.domain) internships = internships.filter((i) => i.domain === filters.domain);
    if (filters?.difficulty) internships = internships.filter((i) => i.difficulty === filters.difficulty);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      internships = internships.filter(
        (i) => i.title.toLowerCase().includes(q) || i.domain.toLowerCase().includes(q)
      );
    }
    return internships;
  },

  async getInternshipBySlug(slug: string) {
    await delay(300);
    return MOCK_INTERNSHIPS.find((i) => i.slug === slug && i.published) ?? null;
  },

  async applyForInternship(_id: string) {
    await delay(600);
    console.info('[MOCK] applyForInternship — not persisted in mock mode.');
    return { data: { applied: true }, success: true, message: 'Application submitted (mock — not persisted)' };
  },
};

// ── Assignment Service (Mock) ─────────────────────────────────────

export const mockAssignmentService: AssignmentService = {
  async getMyAssignments() {
    await delay();
    return MOCK_ASSIGNMENTS;
  },

  async submitAssignment(_id: string, _submission: FormData) {
    await delay(800);
    console.info('[MOCK] submitAssignment — not persisted in mock mode.');
    return { data: undefined, success: true, message: 'Submission received (mock — not persisted)' };
  },
};

// ── Project Service (Mock) ────────────────────────────────────────

export const mockProjectService: ProjectService = {
  async getMyProjects() {
    await delay();
    return MOCK_PROJECTS;
  },

  async submitProject(_id: string, _submission: FormData) {
    await delay(800);
    console.info('[MOCK] submitProject — not persisted in mock mode.');
    return { data: undefined, success: true, message: 'Submission received (mock — not persisted)' };
  },
};

// ── Certificate Service (Mock) ────────────────────────────────────

export const mockCertificateService: CertificateService = {
  async getMyCertificates() {
    await delay();
    return MOCK_CERTIFICATES; // empty until backend issues real certificates
  },

  async verifyCertificate(certificateNumber: string) {
    await delay(500);
    const cert = MOCK_CERTIFICATES.find((c) => c.certificateNumber === certificateNumber);
    if (cert) return { result: 'valid', certificate: cert };
    return { result: 'not-found', message: 'No certificate found with this ID.' };
  },
};

// ── User Service (Mock) ───────────────────────────────────────────

export const mockUserService: UserService = {
  async getProfile() {
    await delay(300);
    return MOCK_USER;
  },

  async getDashboardOverview() {
    await delay(400);
    return MOCK_DASHBOARD;
  },
};

// ── Auth Service (Mock) ───────────────────────────────────────────
// IMPORTANT: This does NOT create a real session.
// It is a UI-only stub so the dashboard and protected pages can be previewed.
// Your backend developer must implement real authentication.

export const mockAuthService: AuthService = {
  isAuthenticated() {
    // In mock mode, treat user as logged in for preview purposes.
    // Real implementation: check JWT, session cookie, etc.
    return true;
  },
  login() {
    // Real implementation: redirect to /auth/login or OAuth provider
    console.info('[MOCK] login() called — backend auth not implemented yet.');
    window.location.href = '/login';
  },
  logout() {
    // Real implementation: invalidate session, clear tokens
    console.info('[MOCK] logout() called — backend auth not implemented yet.');
    window.location.href = '/';
  },
};

