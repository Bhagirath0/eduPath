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
    <section className="section-padding bg-[#111418] text-white relative overflow-hidden border-t border-b border-white/10">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Online Internships
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Learn by Doing.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Earn Recognition.
              </span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Apply for structured online internships after completing foundational tracks. Work on realistic milestone deliverables, receive mentor reviews, and earn evaluated credentials.
            </p>

            {/* Domain chips */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                Available Internship Tracks:
              </p>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map((d) => (
                  <span
                    key={d}
                    className="px-3.5 py-1.5 rounded-lg border border-white/10 text-gray-200 text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors"
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#111418] font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-black/20 hover:scale-[1.02]"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-4 h-4 text-[#111418]" />
              </Link>

              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
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
                  className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-blue/40 hover:bg-white/[0.07] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">
                        0{idx + 1}
                      </span>
                      <h4 className="font-semibold text-white text-base">
                        {f.title}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
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
