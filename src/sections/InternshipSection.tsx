import { Link } from 'react-router-dom';
import { BookOpen, Star, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Project-Based Learning',
    desc: 'Complete real weekly tasks and build practical skills.',
  },
  {
    icon: Star,
    title: 'Mentor Evaluation',
    desc: 'Your work is reviewed and evaluated by domain mentors.',
  },
  {
    icon: Award,
    title: 'Certificate on Completion',
    desc: 'Earn a verifiable certificate after passing evaluation.',
  },
];

const DOMAINS = [
  'Web Dev',
  'Java',
  'Python',
  'AI/ML',
  'Data Analytics',
  'Cybersecurity',
];

export default function InternshipSection() {
  return (
    <section className="section-padding bg-dark-DEFAULT text-white">
      <div className="container-content">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <span className="section-label text-gray-400">INTERNSHIPS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Learn by Doing.{' '}
              <span className="text-brand-blue">Earn Recognition.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Apply for structured online internships after completing the
              prerequisite courses. Work on real tasks, get evaluated, and earn
              a certificate.
            </p>

            {/* Domain chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {DOMAINS.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 rounded-full border border-dark-800 text-gray-300 text-xs font-medium bg-dark-800"
                >
                  {d}
                </span>
              ))}
            </div>

            <Link
              to="/internships"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-white text-dark-DEFAULT font-semibold text-sm hover:bg-gray-100 transition-all duration-200"
            >
              Explore Internships
            </Link>
          </div>

          {/* Right feature cards */}
          <div className="flex flex-col gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-4 bg-dark-800 rounded-card p-5 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                    <p className="text-gray-400 text-sm">{f.desc}</p>
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
