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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0d11] flex text-slate-900 dark:text-white transition-colors duration-200">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#121620] border-r border-slate-200 dark:border-white/10 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#121620]">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-blue" />
            EduPath
            <span className="text-xs px-2 py-0.5 rounded bg-brand-blue/15 text-brand-blue dark:text-blue-400 font-medium ml-1">
              Student
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
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
                      ? 'bg-brand-blue/15 text-brand-blue dark:text-blue-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
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

          <div className="pt-6 px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Public Tools
          </div>
          <NavLink
            to="/verify-certificate"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <Search className="w-4 h-4" />
            <span>Verify Certificate</span>
          </NavLink>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#121620]">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-[#161a24] border border-slate-200/60 dark:border-white/5">
            <div className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center font-semibold text-sm">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">Rahul Sharma</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">rahul@example.com</p>
            </div>
            <button
              onClick={() => navigate('/')}
              title="Return to site"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-[#121620]/95 backdrop-blur-sm border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 flex items-center justify-between transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/courses"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
              Browse Courses
            </Link>
            <Link
              to="/"
              className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1"
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
