import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  FileCheck2,
  FolderGit2,
  Award,
  Search,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navItems = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Explore Courses', to: '/courses', icon: BookOpen },
  { label: 'Internships', to: '/internships', icon: Briefcase },
  { label: 'Assignments', to: '/dashboard/assignments', icon: FileCheck2 },
  { label: 'Projects', to: '/dashboard/projects', icon: FolderGit2 },
  { label: 'Certificates', to: '/dashboard/certificates', icon: Award },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-secondary flex text-text-primary">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-primary border-r border-border flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-text-primary">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-blue" />
            EduPath
            <span className="text-xs px-2 py-0.5 rounded bg-brand-blueLight text-brand-blue font-medium ml-1">
              Student
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-text-secondary hover:bg-surface-secondary lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-text-muted">
            Learning Portal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-blueLight text-brand-blue'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-text-muted">
            Public Tools
          </div>
          <NavLink
            to="/verify-certificate"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
          >
            <Search className="w-4 h-4" />
            <span>Verify Certificate</span>
          </NavLink>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-border bg-surface-primary">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-secondary">
            <div className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center font-semibold text-sm">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-text-primary">Rahul Sharma</p>
              <p className="text-xs text-text-secondary truncate">rahul@example.com</p>
            </div>
            <button
              onClick={() => navigate('/')}
              title="Return to site"
              className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-surface-primary/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-text-secondary hover:bg-surface-secondary lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-text-primary">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/courses"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-surface-secondary text-text-primary hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
              Browse Courses
            </Link>
            <Link
              to="/"
              className="text-xs font-medium text-text-secondary hover:text-text-primary px-2 py-1"
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
