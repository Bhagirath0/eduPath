import {
  Zap,
  LayoutList,
  PenTool,
  FolderGit2,
  Briefcase,
  BadgeCheck,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Zap,
    title: 'Free to Start',
    desc: 'No fees for foundational courses. Access quality content without a paywall.',
  },
  {
    icon: LayoutList,
    title: 'Structured Curriculum',
    desc: 'Organized modules, not scattered content. Progress logically from basics to advanced.',
  },
  {
    icon: PenTool,
    title: 'Practical Assignments',
    desc: 'Apply what you learn immediately with exercises tied to each module.',
  },
  {
    icon: FolderGit2,
    title: 'Project-Based Learning',
    desc: 'Build real projects you can show in your portfolio and to employers.',
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    desc: 'Practical experience with real tasks, mentor evaluation, and recognition.',
  },
  {
    icon: BadgeCheck,
    title: 'Verifiable Certificates',
    desc: 'Certificates backed by actual completion — each has a unique ID and can be verified online.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-surface-secondary">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">WHY EDUPATH</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">
            Built for Real Learning
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-surface-primary rounded-card border border-border shadow-card p-6 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blueLight flex items-center justify-center">
                  <Icon size={22} className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {b.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
