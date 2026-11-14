import { Link } from 'react-router-dom';
import {
  Code2,
  Terminal,
  Globe,
  Brain,
  BarChart3,
  Shield,
  ArrowRight,
} from 'lucide-react';

const DOMAINS = [
  {
    name: 'Java',
    icon: Code2,
    description: 'Object-oriented programming with Java',
    courses: 2,
    color: '#F97316',
    bg: '#FFF7ED',
    param: 'Java',
  },
  {
    name: 'Python',
    icon: Terminal,
    description: 'Scripting, automation, and backend development',
    courses: 2,
    color: '#3B82F6',
    bg: '#EFF6FF',
    param: 'Python',
  },
  {
    name: 'Web Development',
    icon: Globe,
    description: 'HTML, CSS, JavaScript, and modern frameworks',
    courses: 2,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    param: 'Web+Development',
  },
  {
    name: 'AI / ML',
    icon: Brain,
    description: 'Machine learning and data-driven solutions',
    courses: 2,
    color: '#10B981',
    bg: '#ECFDF5',
    param: 'AI+%2F+ML',
  },
  {
    name: 'Data Analytics',
    icon: BarChart3,
    description: 'Data analysis, visualization, and insights',
    courses: 2,
    color: '#06B6D4',
    bg: '#ECFEFF',
    param: 'Data+Analytics',
  },
  {
    name: 'Cybersecurity',
    icon: Shield,
    description: 'Security fundamentals and ethical hacking basics',
    courses: 2,
    color: '#EF4444',
    bg: '#FEF2F2',
    param: 'Cybersecurity',
  },
];

export default function LearningDomains() {
  return (
    <section className="section-padding bg-surface-secondary">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">LEARNING PATHS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">
            Six Domains, One Platform
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <Link
                key={domain.name}
                to={`/courses?domain=${domain.param}`}
                className="group bg-[#121620] rounded-card border border-white/10 hover:border-brand-blue/50 hover:bg-[#161b27] hover:scale-[1.02] transition-all duration-200 p-6 flex flex-col gap-4"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: `${domain.color}20` }}
                >
                  <Icon size={22} style={{ color: domain.color }} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-snug">
                    {domain.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {domain.courses} courses
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
