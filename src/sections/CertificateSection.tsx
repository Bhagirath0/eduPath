import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

const CertificateSection: React.FC = () => {
  return (
    <section className="section-padding bg-white dark:bg-[#0b0d11] border-t border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-6">
            <span className="section-label">CREDENTIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Certificates Backed by Verified Completion
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
              We do not issue participation certificates just for clicking through videos. Each EduPath certificate is earned after completing structured assignments, building practical projects, and meeting rigorous evaluation criteria.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Unique Verifiable ID</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Every certificate includes a tamper-resistant verification ID that employers or colleges can verify publicly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Objective Evaluation</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Awarded after project submissions, code quality review, and module milestone evaluations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Shareable Digital Portfolio</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Export high-resolution PDF credentials and showcase your verified technical projects on LinkedIn.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/verify-certificate">
                <Button variant="primary">
                  Verify a Certificate
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="secondary">Browse Courses</Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl filter blur-xl opacity-70 -z-10" />

              {/* Certificate Card */}
              <div className="bg-slate-900 rounded-xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 relative overflow-hidden text-white">
                {/* Certificate top accent */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-blue via-indigo-500 to-brand-blue" />

                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-brand-blue" />
                    <span className="font-bold text-base text-white">EduPath</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    Sample Certificate
                  </span>
                </div>

                {/* Certificate Body */}
                <div className="text-center py-6">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-blue-400 mb-1">
                    Certificate of Competency
                  </p>
                  <p className="text-xs text-slate-400 mb-4">This certifies that</p>
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    Rahul Sharma
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed mb-4">
                    has successfully completed the coursework, practical assignments, and evaluated capstone project in
                  </p>
                  <div className="inline-block px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">
                    <span className="font-semibold text-sm text-slate-100">
                      Java Fundamentals & Object-Oriented Design
                    </span>
                  </div>
                </div>

                {/* Verification Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-left text-xs text-slate-400">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Credential ID</span>
                    <span className="font-mono font-medium text-slate-200">EP-2024-JV-9821</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Status</span>
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Float note */}
              <div className="mt-4 text-center">
                <span className="text-xs text-text-muted inline-flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Free PDF download with cryptographically signed verification URL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
