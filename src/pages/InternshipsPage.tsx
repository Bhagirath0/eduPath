import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { internshipService } from '@/services';
import type { Internship, Domain, Difficulty } from '@/types';
import { DOMAIN_COLORS } from '@/utils';
import { Search, Filter, Briefcase, Clock, ArrowRight, ShieldCheck, RotateCcw } from 'lucide-react';
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

const InternshipsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  const currentDomain = (searchParams.get('domain') as Domain | 'All') || 'All';
  const currentDifficulty = (searchParams.get('difficulty') as Difficulty | 'All') || 'All';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setLoading(true);
    internshipService
      .getInternships()
      .then((data) => setInternships(data))
      .catch((err) => console.error('Failed to load internships:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDomainChange = (domain: string) => {
    const params = new URLSearchParams(searchParams);
    if (domain === 'All') params.delete('domain');
    else params.set('domain', domain);
    setSearchParams(params);
  };

  const handleDifficultyChange = (diff: string) => {
    const params = new URLSearchParams(searchParams);
    if (diff === 'All') params.delete('difficulty');
    else params.set('difficulty', diff);
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);
    else params.delete('q');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      if (currentDomain !== 'All' && item.domain !== currentDomain) return false;
      if (currentDifficulty !== 'All' && item.difficulty !== currentDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSkills = item.skillsCovered.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesSkills) return false;
      }
      return true;
    });
  }, [internships, currentDomain, currentDifficulty, searchQuery]);

  const hasActiveFilters = currentDomain !== 'All' || currentDifficulty !== 'All' || searchQuery.trim() !== '';

  return (
    <PublicLayout>
      <div className="bg-slate-50 dark:bg-[#12151d] border-b border-slate-200 dark:border-white/10 py-12 md:py-16 transition-colors duration-200">
        <div className="container-content">
          <span className="section-label">PRACTICAL EXPERIENCE</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2 mb-4">
            Structured Online Internships
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl">
            Work through real weekly task milestones, build full-fledged portfolio projects, and receive comprehensive project evaluation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Free Application
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Awarded based on milestone evaluation, not mere participation
            </span>
          </div>
        </div>
      </div>

      <div className="container-content py-10">
        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-[#121620] rounded-xl border border-slate-200 dark:border-white/10 p-4 mb-8 shadow-card flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search internships or technologies…"
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-[#161a24] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={currentDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-[#161a24] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue"
              >
                {DOMAIN_OPTIONS.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain === 'All' ? 'All Domains' : domain}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={currentDifficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-[#161a24] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue"
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff === 'All' ? 'All Levels' : diff}
                </option>
              ))}
            </select>

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

        {/* Results grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-surface-secondary rounded-xl animate-pulse border border-border" />
            ))}
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="text-center py-20 bg-surface-secondary rounded-xl border border-dashed border-border px-4">
            <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-text-primary mb-1">No internships found</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing the domain filter.
            </p>
            <Button variant="secondary" onClick={clearFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((intern) => {
              const domainColor = DOMAIN_COLORS[intern.domain] ?? '#6B7280';

              return (
                <div
                  key={intern.id}
                  className="group bg-white dark:bg-[#121620] rounded-xl border border-slate-200 dark:border-white/10 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden"
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: domainColor }} />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="badge badge-blue">{intern.domain}</span>
                      <span className={DIFFICULTY_BADGE[intern.difficulty] ?? 'badge badge-gray'}>
                        {intern.difficulty}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors line-clamp-1 mb-2">
                      {intern.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {intern.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-white/10">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {intern.duration}
                      </span>
                      <span>·</span>
                      <span>{intern.weeklyStructure?.length ?? 4} weekly milestones</span>
                      <span>·</span>
                      <span>Evaluated project</span>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {intern.skillsCovered.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-secondary text-text-secondary border border-border"
                        >
                          {skill}
                        </span>
                      ))}
                      {intern.skillsCovered.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] text-text-muted">
                          +{intern.skillsCovered.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => navigate(`/internships/${intern.slug}`)}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        View Details & Apply
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

export default InternshipsPage;
