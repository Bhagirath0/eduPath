// ─────────────────────────────────────────────────────────────────
// MOCK DASHBOARD / USER DATA — Development only
// ─────────────────────────────────────────────────────────────────

import type {
  UserProfile, EnrollmentStatus,
  DashboardOverview, Assignment, Project, Certificate,
} from '@/types';

export const MOCK_USER: UserProfile = {
  id: 'user-dev-001',
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  joinedAt: '2024-10-01T10:00:00Z',
  enrolledCourseIds: ['course-001', 'course-005'],
  completedCourseIds: [],
  appliedInternshipIds: [],
};

export const MOCK_ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  {
    courseId: 'course-001',
    enrolledAt: '2024-10-05T10:00:00Z',
    progressPercent: 35,
    lastAccessedModuleId: 'mod-001-2',
    lastAccessedLessonId: 'les-001-2-1',
    completedLessonIds: ['les-001-1-1', 'les-001-1-2', 'les-001-1-3', 'les-001-2-1'],
    completedModuleIds: ['mod-001-1'],
  },
  {
    courseId: 'course-005',
    enrolledAt: '2024-10-15T10:00:00Z',
    progressPercent: 10,
    lastAccessedModuleId: 'mod-005-1',
    lastAccessedLessonId: 'les-005-1-1',
    completedLessonIds: ['les-005-1-1'],
    completedModuleIds: [],
  },
];

export const MOCK_DASHBOARD: DashboardOverview = {
  enrolledCourses: 2,
  completedModules: 1,
  pendingAssignments: 2,
  overallProgress: 22,
  recentActivity: [
    { id: 'act-1', type: 'lesson-completed', title: 'Completed: Primitive Data Types', timestamp: '2024-11-10T14:30:00Z' },
    { id: 'act-2', type: 'enrolled', title: 'Enrolled in: HTML & CSS Fundamentals', timestamp: '2024-10-15T10:00:00Z' },
    { id: 'act-3', type: 'module-completed', title: 'Completed Module: Introduction to Java', timestamp: '2024-10-12T16:00:00Z' },
    { id: 'act-4', type: 'enrolled', title: 'Enrolled in: Java Fundamentals & OOPs', timestamp: '2024-10-05T10:00:00Z' },
  ],
  continuelearning: {
    courseId: 'course-001',
    courseTitle: 'Java Fundamentals & OOPs',
    moduleId: 'mod-001-2',
    moduleTitle: 'Variables, Data Types & Operators',
    lessonId: 'les-001-2-1',
    lessonTitle: 'Primitive Data Types',
    progressPercent: 35,
    courseSlug: 'java-fundamentals-oops',
    moduleSlug: 'variables-data-types-operators',
  },
};

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asgn-001',
    title: 'OOP Design — Library System',
    courseId: 'course-001',
    courseTitle: 'Java Fundamentals & OOPs',
    moduleId: 'mod-001-4',
    moduleTitle: 'Object-Oriented Programming',
    instructions:
      'Design a Library Management System using OOP principles. Create classes for Book, Member, and Library. Implement methods for borrowing and returning books. Submit your .java source files.',
    difficulty: 'Beginner',
    deadlineDays: 7,
    submissionStatus: 'not-started',
  },
  {
    id: 'asgn-002',
    title: 'Responsive Landing Page',
    courseId: 'course-005',
    courseTitle: 'HTML & CSS Fundamentals',
    moduleId: 'mod-005-2',
    moduleTitle: 'CSS Fundamentals',
    instructions:
      'Build a fully responsive landing page for a fictional product. Must work on mobile, tablet, and desktop. Use Flexbox or Grid for layout. Submit your HTML and CSS files.',
    difficulty: 'Beginner',
    deadlineDays: 10,
    submissionStatus: 'in-progress',
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Java Console Banking Application',
    courseId: 'course-001',
    courseTitle: 'Java Fundamentals & OOPs',
    description:
      'Build a command-line banking application that allows users to create accounts, deposit, withdraw, and check balances. Apply OOP principles throughout.',
    requirements: [
      'At least 3 classes with clear OOP design',
      'Working deposit and withdrawal logic',
      'Input validation and error handling',
      'Clean, documented code',
    ],
    deliverables: ['Complete Java source files', 'README with instructions', 'Sample output screenshots'],
    submissionInstructions: 'Upload a ZIP file containing all source files and documentation. File size limit: 50 MB.',
    evaluationCriteria: ['OOP design quality', 'Code cleanliness', 'Feature completeness', 'Documentation'],
    submissionStatus: 'not-started',
  },
];

export const MOCK_CERTIFICATES: Certificate[] = [];
// No certificates issued yet — backend will populate this when real evaluations are done.
// Do not add fake certificates here.

