import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { certificateService } from '@/services';
import type { Certificate } from '@/types';
import { formatDate } from '@/utils';
import { Award, ShieldCheck, Download, ExternalLink, Search, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    certificateService
      .getMyCertificates()
      .then((data) => setCertificates(data))
      .catch((err) => console.error('Failed to load certificates:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Certificates">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Certificates</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Official credentials issued upon completion of coursework and evaluated capstone projects.
            </p>
          </div>

          <Link to="/verify-certificate">
            <Button variant="secondary" size="sm" leftIcon={<Search className="w-4 h-4" />}>
              Public Certificate Verifier
            </Button>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="h-48 bg-white dark:bg-[#121620] rounded-xl border border-slate-200 dark:border-white/10 animate-pulse" />
        ) : certificates.length === 0 ? (
          <div className="bg-white dark:bg-[#121620] rounded-xl border border-slate-200 dark:border-white/10 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-card">
            <div className="w-16 h-16 rounded-full bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-brand-blue" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No Certificates Earned Yet
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Unlike platforms that grant participation certificates for clicking links, EduPath certificates are awarded after successful evaluation of your practical assignments and projects.
            </p>

            <div className="bg-slate-50 dark:bg-[#161a24] rounded-lg p-4 border border-slate-200 dark:border-white/10 text-left mb-6 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                How to become eligible:
              </div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-6 list-disc">
                <li>Complete 100% of modules in a structured course</li>
                <li>Submit all required module assignments</li>
                <li>Complete and submit the evaluated course project or internship tasks</li>
              </ul>
            </div>

            <Link to="/courses">
              <Button variant="primary">Continue Learning</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-[#121620] rounded-xl border border-slate-200 dark:border-white/10 p-6 shadow-card space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-brand-blue font-semibold">
                      {cert.type === 'course' ? 'Course Certificate' : 'Internship Credential'}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Issued on {formatDate(cert.issuedAt)}
                    </p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-status-success shrink-0" />
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#161a24] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Credential ID:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {cert.certificateNumber}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="secondary" size="sm" fullWidth leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download PDF
                  </Button>
                  <Link to={`/verify-certificate?id=${cert.certificateNumber}`} className="w-full">
                    <Button variant="primary" size="sm" fullWidth leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Verify
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CertificatesPage;
