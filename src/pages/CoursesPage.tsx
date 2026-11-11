import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { courseService } from '@/services';
import type { Course, Domain, Difficulty } from '@/types';
import { DOMAIN_COLORS } from '@/utils';
import { Search, Filter, BookOpen, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

const DOMAIN_OPTIONS: (Domain | 'All')[] = [
  'All',
  'Java Development',
  'Python Development',
  'Web Development',
  'AI & Machine Learning',
  'Data Analytics',
  'Cybersecurity',
];

const DIFFICULTY_OPTIONS: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const DIFFICULTY_BADGE: Record<Difficulty, string> = {
  Beginner: 'badge badge-green',
  Intermediate: 'badge badge-yellow',
  Advanced: 'badge badge-red',
};

const CoursesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state from URL or defaults
  const currentDomain = (searchParams.get('domain') as Domain | 'All') || 'All';
  const currentDifficulty = (searchParams.get('difficulty') as Difficulty | 'All') || 'All';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setLoading(true);
    courseService
      .getCourses()
      .then((data) => setCourses(data))
      .catch((err) => console.error('Failed to load courses:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDomainChange = (domain: string) => {
    const params = new URLSearchParams(searchParams);
    if (domain === 'All') {
      params.delete('domain');
    } else {
      params.set('domain', domain);
    }
    setSearchParams(params);
  };

  const handleDifficultyChange = (difficulty: string) => {
    const params = new URLSearchParams(searchParams);
    if (difficulty === 'All') {
      params.delete('difficulty');
    } else {
      params.set('difficulty', difficulty);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Domain filter
      if (currentDomain !== 'All' && course.domain !== currentDomain) return false;
      // Difficulty filter
      if (currentDifficulty !== 'All' && course.difficulty !== currentDifficulty) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesTagline = course.tagline.toLowerCase().includes(q);
        const matchesDomain = course.domain.toLowerCase().includes(q);
        const skills = course.skillsCovered || course.skills || [];
        const matchesSkills = skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTagline && !matchesDomain && !matchesSkills) return false;
      }
      return true;
    });
  }, [courses, currentDomain, currentDifficulty, searchQuery]);

  const hasActiveFilters = currentDomain !== 'All' || currentDifficulty !== 'All' || searchQuery.trim() !== '';

  return (
    <PublicLayout>
      <div className="bg-surface-secondary border-b border-border py-12 md:py-16">
        <div className="container-content">
          <span className="section-label">CURRICULUM</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2 mb-4">
            Structured Technical Courses
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl">
            Explore focused, step-by-step courses designed to take you from foundational syntax to building practical, production-ready software.
          </p>
        </div>
      </div>

      <div className="container-content py-10">
        {/* Search and Filters Bar */}
        <div className="bg-surface-primary rounded-xl border border-border p-4 mb-8 shadow-card flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search courses, topics, or skills…"
              className="w-full pl-10 pr-4 py-2 text-sm bg-surface-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
            />
          </div>

          {/* Quick Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Domain Selector */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-text-muted" />
              <select
                value={currentDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="text-xs bg-surface-secondary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-brand-blue"
              >
                {DOMAIN_OPTIONS.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain === 'All' ? 'All Domains' : domain}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <select
              value={currentDifficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="text-xs bg-surface-secondary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-brand-blue"
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff === 'All' ? 'All Levels' : diff}
                </option>
              ))}
            </select>

            {/* Clear button if active */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs text-brand-blue hover:text-brand-blueDark font-medium px-2 py-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-6 text-sm text-text-secondary">
          <p>
            Showing <strong className="text-text-primary">{filteredCourses.length}</strong> of{' '}
            {courses.length} courses
          </p>
          {currentDomain !== 'All' && (
            <span className="text-xs px-2.5 py-1 rounded bg-surface-secondary border border-border text-text-primary">
              Domain: {currentDomain}
            </span>
          )}
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 bg-surface-secondary rounded-xl animate-pulse border border-border"
              />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-surface-secondary rounded-xl border border-dashed border-border px-4">
            <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-text-primary mb-1">No courses match your filter</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing domain and difficulty filters.
            </p>
            <Button variant="secondary" onClick={clearFilters}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const domainColor = DOMAIN_COLORS[course.domain] ?? '#6B7280';
              const skills = course.skillsCovered || course.skills || [];

              return (
                <div
                  key={course.id}
                  className="group bg-surface-primary rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Top Domain accent bar */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: domainColor }} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="badge badge-blue">{course.domain}</span>
                      <span className={DIFFICULTY_BADGE[course.difficulty] ?? 'badge badge-gray'}>
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-text-primary group-hover:text-brand-blue transition-colors line-clamp-1 mb-2">
                      {course.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                      {course.tagline}
                    </p>

                    {/* Duration stats */}
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4 pb-4 border-b border-border">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {course.durationWeeks} weeks
                      </span>
                      <span>·</span>
                      <span>{course.estimatedHours} hours total</span>
                      <span>·</span>
                      <span>{course.modules?.length ?? 0} modules</span>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-secondary text-text-secondary border border-border"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] text-text-muted">
                          +{skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-auto">
                      <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => navigate(`/courses/${course.slug}`)}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default CoursesPage;
