// ─────────────────────────────────────────────────────────────────
// API SERVICE INTERFACE
//
// This file defines the CONTRACTS for all API calls.
// The UI only ever calls these functions — never fetch() directly.
//
// HOW TO CONNECT YOUR REAL BACKEND:
//   1. Set VITE_API_BASE_URL in your .env file
//   2. Replace each function in services/api.real.ts
//   3. Update src/services/index.ts to import from api.real.ts
//
// All mock data lives in src/data/ — completely isolated from UI.
// ─────────────────────────────────────────────────────────────────

import type {
  Course, CourseFilters,
  Internship, InternshipFilters,
  Assignment, Project,
  Certificate, CertificateVerification,
  UserProfile, EnrollmentStatus, DashboardOverview,
  ApiResponse,
} from '@/types';

// ── Courses ───────────────────────────────────────────────────────

export interface CourseService {
  getCourses(filters?: CourseFilters): Promise<Course[]>;
  getCourseBySlug(slug: string): Promise<Course | null>;
  getEnrollmentStatus(courseId: string): Promise<EnrollmentStatus | null>;
  enrollInCourse(courseId: string): Promise<ApiResponse<{ enrolled: boolean }>>;
  markLessonComplete(courseId: string, lessonId: string): Promise<ApiResponse<void>>;
}

// ── Internships ───────────────────────────────────────────────────

export interface InternshipService {
  getInternships(filters?: InternshipFilters): Promise<Internship[]>;
  getInternshipBySlug(slug: string): Promise<Internship | null>;
  applyForInternship(internshipId: string): Promise<ApiResponse<{ applied: boolean }>>;
}

// ── Assignments / Projects ────────────────────────────────────────

export interface AssignmentService {
  getMyAssignments(): Promise<Assignment[]>;
  submitAssignment(assignmentId: string, submission: FormData): Promise<ApiResponse<void>>;
}

export interface ProjectService {
  getMyProjects(): Promise<Project[]>;
  submitProject(projectId: string, submission: FormData): Promise<ApiResponse<void>>;
}

// ── Certificates ──────────────────────────────────────────────────

export interface CertificateService {
  getMyCertificates(): Promise<Certificate[]>;
  verifyCertificate(certificateNumber: string): Promise<CertificateVerification>;
}

// ── User / Dashboard ─────────────────────────────────────────────

export interface UserService {
  getProfile(): Promise<UserProfile | null>;
  getDashboardOverview(): Promise<DashboardOverview>;
}

// ── Auth (interface only — backend owns implementation) ───────────

export interface AuthService {
  /** Returns true if user has a valid session. Never invent a session locally. */
  isAuthenticated(): boolean;
  /** Redirects to login page; actual session handled by backend. */
  login(): void;
  /** Clears local session hints and redirects. */
  logout(): void;
}

