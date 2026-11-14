import { Link } from 'react-router-dom';
import { BookOpen, Star, Award, ArrowRight, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Project-Based Learning',
    desc: 'Complete structured weekly task milestones and build real-world software.',
  },
  {
    icon: Star,
    title: 'Mentor Evaluation',
    desc: 'Your code submissions are reviewed with constructive feedback.',
  },
  {
    icon: Award,
    title: 'Certificate on Completion',
    desc: 'Earn a tamper-proof verifiable credential backed by actual evaluation.',
  },
];

const DOMAINS = [
  'Web Development',
  'Java Backend',
  'Python & Data',
  'AI / ML',
  'Data Analytics',
  'Cybersecurity',
];

export default function InternshipSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-[#111418] text-slate-900 dark:text-white relative overflow-hidden border-t border-b border-slate-200 dark:border-white/10 transition-colors duration-200">
      {/* Subtle ambient gradient in the background */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold uppercase tracking-wider text-brand-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              Online Internships
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Learn by Doing.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Earn Recognition.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Apply for structured online internships after completing foundational tracks. Work on realistic milestone deliverables, receive mentor reviews, and earn evaluated credentials.
            </p>

            {/* Domain chips */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-3">
                Available Internship Tracks:
              </p>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map((d) => (
                  <span
                    key={d}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-medium bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA & Note */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/internships"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blueDark transition-all duration-200 shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-status-success shrink-0" />
                Free application · Evaluated on merit
              </span>
            </div>
          </div>

          {/* Right column: Feature cards */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
            {FEATURES.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161a24] border border-slate-200 dark:border-white/10 hover:border-brand-blue/40 transition-all duration-300 group shadow-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                        0{idx + 1}
                      </span>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                        {f.title}
                      </h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
