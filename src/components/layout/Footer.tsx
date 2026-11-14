import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#0b0d11] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white select-none mb-4">
              <span className="inline-block w-3 h-3 rounded-sm bg-brand-blue" aria-hidden="true" />
              EduPath
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Practical technical education combining structured foundational learning, hands-on assignments, and project-based internships.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-500 font-mono">
              Designed for modern software development education.
            </div>
          </div>

          {/* Platform Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/verify-certificate" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Verify Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Domains Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">Learning Domains</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses?domain=Java+Development" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Java Development
                </Link>
              </li>
              <li>
                <Link to="/courses?domain=Python+Development" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Python Development
                </Link>
              </li>
              <li>
                <Link to="/courses?domain=Web+Development" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses?domain=AI+%26+Machine+Learning" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/courses?domain=Data+Analytics" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link to="/courses?domain=Cybersecurity" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Transparency Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-4">Platform Principles</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
              We focus on genuine competency. Foundational courses are accessible at no cost. Internships and certificates are awarded based on real project completion and evaluation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              Verified Project Evaluation
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EduPath. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 dark:hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-300 cursor-pointer transition-colors">Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
