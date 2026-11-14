import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

// ── Eager-loaded (critical path) ──────────────────────────────────
import HomePage from '@/pages/HomePage';

// ── Lazy-loaded pages ─────────────────────────────────────────────
const CoursesPage           = lazy(() => import('@/pages/CoursesPage'));
const CourseDetailPage      = lazy(() => import('@/pages/CourseDetailPage'));
const InternshipsPage       = lazy(() => import('@/pages/InternshipsPage'));
const InternshipDetailPage  = lazy(() => import('@/pages/InternshipDetailPage'));
const DashboardPage         = lazy(() => import('@/pages/DashboardPage'));
const LearningPage          = lazy(() => import('@/pages/LearningPage'));
const AssignmentsPage       = lazy(() => import('@/pages/AssignmentsPage'));
const ProjectsPage          = lazy(() => import('@/pages/ProjectsPage'));
const CertificatesPage      = lazy(() => import('@/pages/CertificatesPage'));
const VerifyCertificatePage = lazy(() => import('@/pages/VerifyCertificatePage'));
const NotFoundPage          = lazy(() => import('@/pages/NotFoundPage'));

// ── Page loading fallback ─────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-text-muted">Loading…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Public ─────────────────────────────────────────── */}
            <Route path="/"                      element={<HomePage />} />
            <Route path="/courses"               element={<CoursesPage />} />
            <Route path="/courses/:slug"         element={<CourseDetailPage />} />
            <Route path="/internships"           element={<InternshipsPage />} />
            <Route path="/internships/:slug"     element={<InternshipDetailPage />} />
            <Route path="/verify-certificate"    element={<VerifyCertificatePage />} />

            {/* ── Student Dashboard ───────────────────────────────── */}
            <Route path="/dashboard"             element={<DashboardPage />} />
            <Route path="/dashboard/assignments" element={<AssignmentsPage />} />
            <Route path="/dashboard/projects"    element={<ProjectsPage />} />
            <Route path="/dashboard/certificates"element={<CertificatesPage />} />

            {/* ── Learning Interface ──────────────────────────────── */}
            <Route path="/learn/:courseSlug/:moduleSlug" element={<LearningPage />} />

            {/* ── 404 ────────────────────────────────────────────── */}
            <Route path="*"                      element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

