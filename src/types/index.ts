// ─────────────────────────────────────────────────────────────────
// PLATFORM TYPES
// All shared TypeScript interfaces for the edu-platform.
// Backend developer should align their API responses to these shapes
// (or we update these to match — never hardcode data in components).
// ─────────────────────────────────────────────────────────────────

// ── Enums / Union types ───────────────────────────────────────────

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Domain =
  | 'Java Development'
  | 'Python Development'
  | 'Web Development'
  | 'AI & Machine Learning'
  | 'Data Analytics'
  | 'Cybersecurity';

export type ContentType =
  | 'text'
  | 'pdf'
  | 'handwritten-notes'
  | 'code-example'
  | 'image'
  | 'video'
  | 'practice-questions'
  | 'assignment';

export type SubmissionStatus =
  | 'not-started'
  | 'in-progress'
  | 'submitted'
  | 'under-review'
  | 'completed'
  | 'revision-required';

export type ApplicationStatus =
  | 'not-applied'
  | 'applied'
  | 'under-review'
  | 'accepted'
  | 'rejected';

export type CertificateVerificationResult =
  | 'valid'
  | 'invalid'
  | 'not-found'
  | 'revoked';

// ── Course / Module / Lesson ──────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  contentType: ContentType;
  content?: string;          // text or markdown body
  attachments?: Attachment[];
  codeExample?: CodeExample;
  practiceQuestions?: PracticeQuestion[];
  estimatedMinutes?: number;
  order: number;
}

export interface Module {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  order: number;
  completionStatus?: SubmissionStatus; // from API when user is logged in
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  domain: Domain;
  tagline: string;
  description: string;
  whatYouWillLearn: string[];
  learningObjectives?: string[];
  skillsCovered: string[];
  skills?: string[];
  prerequisites: string[];
  difficulty: Difficulty;
  durationWeeks: number;
  estimatedHours: number;
  estimatedHoursPerWeek?: number;
  modules: Module[];
  thumbnail?: string;
  published: boolean;
  enrolledCount?: number;   // shown only when backend provides it
  createdAt?: string;
  updatedAt?: string;
}

// ── Internship ───────────────────────────────────────────────────

export interface InternshipWeek {
  week: number;
  title: string;
  tasks: string[];
}

export interface Internship {
  id: string;
  title: string;
  slug: string;
  domain: Domain;
  duration: string;
  difficulty: Difficulty;
  description: string;
  overview: string;
  learningObjectives: string[];
  skillsCovered: string[];
  eligibility: string[];
  weeklyStructure: InternshipWeek[];
  evaluationCriteria: string[];
  certificateEligible: boolean;
  applicationProcess: string[];
  published: boolean;
}

// ── Assignment / Project ─────────────────────────────────────────

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  moduleId?: string;
  moduleTitle?: string;
  instructions: string;
  difficulty: Difficulty;
  deadlineDays?: number;
  submissionStatus: SubmissionStatus;
  submittedAt?: string;
  feedback?: string;
}

export interface Project {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  submissionInstructions: string;
  evaluationCriteria: string[];
  submissionStatus: SubmissionStatus;
  submittedAt?: string;
  feedback?: string;
}

// ── Certificate ──────────────────────────────────────────────────

export interface Certificate {
  id: string;
  certificateNumber: string;
  title: string;
  studentName: string;
  courseOrInternshipTitle: string;
  issuedAt: string;
  type: 'course' | 'internship';
  downloadUrl?: string;    // from backend when available
}

export interface CertificateVerification {
  result: CertificateVerificationResult;
  certificate?: Certificate;
  message?: string;
}

// ── User / Student ───────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  appliedInternshipIds: string[];
}

export interface EnrollmentStatus {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  lastAccessedModuleId?: string;
  lastAccessedLessonId?: string;
  completedLessonIds: string[];
  completedModuleIds: string[];
}

// ── Dashboard ────────────────────────────────────────────────────

export interface DashboardOverview {
  enrolledCourses: number;
  completedModules: number;
  pendingAssignments: number;
  overallProgress: number;
  recentActivity: ActivityItem[];
  continuelearning?: ContinueLearning;
  continueLearning?: ContinueLearning;
}

export interface ActivityItem {
  id: string;
  type: 'lesson-completed' | 'assignment-submitted' | 'module-completed' | 'enrolled' | 'certificate-issued';
  title: string;
  text?: string;
  timestamp: string;
}

export interface ContinueLearning {
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  progressPercent: number;
  courseSlug: string;
  moduleSlug: string;
}

// ── Shared ───────────────────────────────────────────────────────

export interface Attachment {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'handwritten';
  url: string;              // served by backend — never expose protected paths directly
  downloadAllowed: boolean;
}

export interface CodeExample {
  language: string;
  code: string;
  output?: string;
  explanation?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex?: number;    // only provided by backend when answer is revealed
  explanation?: string;
}

// ── API Response wrappers ─────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

// ── Filter / Search ───────────────────────────────────────────────

export interface CourseFilters {
  domain?: Domain;
  difficulty?: Difficulty;
  durationMax?: number;
  search?: string;
}

export interface InternshipFilters {
  domain?: Domain;
  difficulty?: Difficulty;
  search?: string;
}

