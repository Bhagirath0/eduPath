import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { certificateService } from '@/services';
import type { CertificateVerification } from '@/types';
import { formatDate } from '@/utils';
import {
  ShieldCheck,
  Search,
  AlertTriangle,
  XCircle,
  Award,
  Calendar,
  User,
  BookOpen,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const VerifyCertificatePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [certId, setCertId] = useState(initialId);
  const [verification, setVerification] = useState<CertificateVerification | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (idToVerify: string) => {
    const cleanId = idToVerify.trim();
    if (!cleanId) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await certificateService.verifyCertificate(cleanId);
      setVerification(res);
      // Sync URL
      setSearchParams({ id: cleanId });
    } catch (err) {
      console.error('Verification error:', err);
      setVerification({
        result: 'invalid',
        message: 'Could not connect to certificate verification service.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      handleVerify(initialId);
    }
  }, [initialId]);

  return (
    <PublicLayout>
      <div className="bg-surface-secondary border-b border-border py-12 md:py-16">
        <div className="container-content text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-brand-blueLight flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-brand-blue" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-3">
            Public Certificate Verification
          </h1>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Enter the unique credential identification number found on any EduPath certificate to verify its authenticity and award status.
          </p>
        </div>
      </div>

      <div className="container-content py-12 max-w-xl mx-auto">
        {/* Verification Form */}
        <div className="bg-surface-primary rounded-xl border border-border shadow-card p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify(certId);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="certId" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Certificate Identification ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="certId"
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g. EP-2024-JV-9821"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-secondary border border-border rounded-lg text-text-primary font-mono focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={!certId.trim()}
            >
              Verify Credential
            </Button>
          </form>

          <p className="text-[11px] text-text-muted text-center mt-4">
            Verification is performed against our centralized credential registry. Real-time verification requires backend server response.
          </p>
        </div>

        {/* Verification Results */}
        {searched && verification && (
          <div>
            {verification.result === 'valid' && verification.certificate ? (
              <div className="bg-surface-primary rounded-xl border-2 border-status-success/30 shadow-card p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-status-successLight flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-status-success" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-text-primary">
                      Valid & Verified Certificate
                    </h3>
                    <p className="text-xs text-status-success font-medium">
                      Official credential issued by EduPath
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="text-text-secondary flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-text-muted" />
                      Recipient Name:
                    </span>
                    <span className="font-bold text-text-primary">
                      {verification.certificate.studentName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="text-text-secondary flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-text-muted" />
                      Course / Program:
                    </span>
                    <span className="font-semibold text-text-primary">
                      {verification.certificate.courseOrInternshipTitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                    <span className="text-text-secondary flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-text-muted" />
                      Date of Issue:
                    </span>
                    <span className="font-mono text-text-primary">
                      {formatDate(verification.certificate.issuedAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-text-secondary flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-text-muted" />
                      Credential ID:
                    </span>
                    <span className="font-mono font-bold text-brand-blue">
                      {verification.certificate.certificateNumber}
                    </span>
                  </div>
                </div>
              </div>
            ) : verification.result === 'not-found' ? (
              <div className="bg-surface-primary rounded-xl border border-border shadow-card p-6 text-center space-y-3">
                <AlertTriangle className="w-10 h-10 text-status-warning mx-auto" />
                <h3 className="font-bold text-base text-text-primary">
                  Certificate Not Found
                </h3>
                <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                  No certificate matching credential ID <strong className="font-mono">{certId}</strong> was found in our verification registry. Please check for typos and re-enter.
                </p>
              </div>
            ) : verification.result === 'revoked' ? (
              <div className="bg-surface-primary rounded-xl border border-status-error/30 shadow-card p-6 text-center space-y-3">
                <XCircle className="w-10 h-10 text-status-error mx-auto" />
                <h3 className="font-bold text-base text-text-primary">
                  Certificate Revoked
                </h3>
                <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                  This credential was previously issued but has since been revoked by the administration.
                </p>
              </div>
            ) : (
              <div className="bg-surface-primary rounded-xl border border-border shadow-card p-6 text-center space-y-3">
                <XCircle className="w-10 h-10 text-text-muted mx-auto" />
                <h3 className="font-bold text-base text-text-primary">
                  Invalid Request
                </h3>
                <p className="text-xs text-text-secondary">
                  {verification.message || 'Please provide a valid certificate identifier.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default VerifyCertificatePage;
