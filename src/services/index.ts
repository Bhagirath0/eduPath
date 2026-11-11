// ─────────────────────────────────────────────────────────────────
// SERVICE REGISTRY — The single import point for all services.
//
// HOW TO CONNECT REAL BACKEND:
//   1. Create src/services/real.service.ts implementing all interfaces
//   2. Set VITE_USE_REAL_API=true in your .env
//   3. This file will automatically switch to the real implementation
//
// UI components import from here — never from mock.service.ts directly.
// ─────────────────────────────────────────────────────────────────

import {
  mockCourseService,
  mockInternshipService,
  mockAssignmentService,
  mockProjectService,
  mockCertificateService,
  mockUserService,
  mockAuthService,
} from './mock.service';

// When VITE_USE_REAL_API=true, import real services here instead.
// const isReal = import.meta.env.VITE_USE_REAL_API === 'true';

export const courseService = mockCourseService;
export const internshipService = mockInternshipService;
export const assignmentService = mockAssignmentService;
export const projectService = mockProjectService;
export const certificateService = mockCertificateService;
export const userService = mockUserService;
export const authService = mockAuthService;

