import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  Briefcase,
  Award,
  ArrowRight,
  TrendingUp,
  ClipboardList,
  Star,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Spinner from '@/components/ui/Spinner';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import { userService } from '@/services';
import type { DashboardOverview } from '@/types';
import { timeAgo } from '@/utils';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function activityIcon(type: string) {
  switch (type) {
    case 'lesson': return <BookOpen className="w-4 h-4 text-brand-blue" />;
    case 'certificate': return <Award className="w-4 h-4 text-yellow-500" />;
    case 'enrolled': return <Briefcase className="w-4 h-4 text-purple-500" />;
    case 'module-completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
    default: return <Star className="w-4 h-4 text-text-muted" />;
  }
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: string;
}

function StatCard({ label, value, icon, accent = 'text-brand-blue' }: StatCardProps) {
  return (
    <div className="bg-surface-primary rounded-card border border-border shadow-card p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-brand-blueLight ${accent}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [profile, setProfile] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      userService.getDashboardOverview(),
      userService.getProfile(),
    ])
      .then(([ov, prof]) => {
        setOverview(ov);
        setProfile(prof);
      })
      .catch(() => setError('Failed to load dashboard data. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" color="brand" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  const firstName = profile?.name?.split(' ')[0] ?? 'there';
  const cl = overview?.continueLearning || overview?.continuelearning;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-text-secondary mt-1">Here's your learning overview.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Enrolled Courses"
            value={overview?.enrolledCourses ?? 0}
            icon={<BookOpen className="w-5 h-5" />}
            accent="text-brand-blue"
          />
          <StatCard
            label="Completed Modules"
            value={overview?.completedModules ?? 0}
            icon={<CheckCircle className="w-5 h-5" />}
            accent="text-green-600"
          />
          <StatCard
            label="Pending Assignments"
            value={overview?.pendingAssignments ?? 0}
            icon={<ClipboardList className="w-5 h-5" />}
            accent="text-yellow-600"
          />
          <StatCard
            label="Overall Progress"
            value={`${overview?.overallProgress ?? 0}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            accent="text-purple-600"
          />
        </div>

        {/* Continue Learning */}
        {cl && (
          <div className="bg-surface-primary rounded-card border border-border shadow-card p-6">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-blue mb-2">Continue Learning</p>
            <h2 className="text-xl font-bold text-text-primary mb-1">{cl.courseTitle}</h2>
            <p className="text-sm text-text-secondary mb-4">{cl.moduleTitle}</p>
            <ProgressBar
              percent={cl.progressPercent ?? 0}
              size="md"
              showPercent
              color="blue"
              label="Progress"
            />
            <div className="mt-5">
              <Link to={`/learn/${cl.courseSlug}/${cl.moduleSlug}`}>
                <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue Learning
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {overview?.recentActivity && overview.recentActivity.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">Recent Activity</h2>
            <div className="bg-surface-primary rounded-card border border-border shadow-card divide-y divide-border">
              {overview.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="p-2 rounded-lg bg-surface-secondary">
                    {activityIcon(activity.type)}
                  </div>
                  <p className="flex-1 text-sm text-text-primary">{activity.title || activity.text}</p>
                  <span className="text-xs text-text-muted whitespace-nowrap">{timeAgo(activity.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/courses">
              <Button variant="secondary" leftIcon={<BookOpen className="w-4 h-4" />}>
                Browse Courses
              </Button>
            </Link>
            <Link to="/dashboard/assignments">
              <Button variant="secondary" leftIcon={<ClipboardList className="w-4 h-4" />}>
                View Assignments
              </Button>
            </Link>
            <Link to="/internships">
              <Button variant="secondary" leftIcon={<Briefcase className="w-4 h-4" />}>
                Explore Internships
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
