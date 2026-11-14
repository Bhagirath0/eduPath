import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, BookOpen, Award, Github } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('Web Development');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setMode('signup');
    }
  }, [searchParams]);

  const handleDemoLogin = () => {
    setLoading(true);
    setError(null);
    setEmail('rahul@example.com');
    setPassword('••••••••••••');
    setTimeout(() => {
      setLoading(false);
      setSuccess('Logged in as Rahul Sharma. Redirecting to Dashboard…');
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setError('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'signup') {
        setSuccess('Account created successfully! Welcome to EduPath.');
      } else {
        setSuccess('Authentication successful! Welcome back.');
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    }, 800);
  };

  return (
    <PublicLayout>
      <div className="relative min-h-[calc(100vh-70px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-primary transition-colors duration-200">
        {/* Subtle background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Branding & Features (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-2xl bg-surface-secondary border border-border shadow-card space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-semibold text-brand-blue uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Empowering Engineers
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-text-primary leading-snug">
                Learn Practical Skills.
                <br />
                <span className="text-brand-blue">Build Real Careers.</span>
              </h2>

              <p className="text-text-secondary text-sm leading-relaxed">
                Log in to continue your course assignments, submit real capstone projects, and track your milestone evaluations.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Structured Foundational Tracks</h4>
                  <p className="text-xs text-text-muted">Master Java, Python, Web Dev, and Machine Learning step-by-step.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Evaluated Online Internships</h4>
                  <p className="text-xs text-text-muted">Weekly deliverable milestones with real constructive mentor feedback.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Verifiable Credentials</h4>
                  <p className="text-xs text-text-muted">Tamper-proof certificate IDs that companies can verify online in seconds.</p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="pt-4 border-t border-border text-xs text-text-secondary flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <span>Free to start &middot; No credit card required</span>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-7 bg-surface-primary rounded-2xl border border-border shadow-card p-6 sm:p-10">
            {/* Header Tabs */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-border">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                  {mode === 'login' ? 'Welcome Back' : 'Create Free Account'}
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  {mode === 'login'
                    ? 'Enter your credentials to access your student portal'
                    : 'Join EduPath to start learning and building projects'}
                </p>
              </div>

              {/* Segmented Switcher */}
              <div className="inline-flex items-center p-1 rounded-xl bg-surface-secondary border border-border">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-surface-primary text-text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'signup'
                      ? 'bg-surface-primary text-text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Quick Demo Login Pill (Helps user/reviewer easily test student portal) */}
            {mode === 'login' && (
              <div className="mb-6 p-3.5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2 w-2 rounded-full bg-brand-blue" />
                  <span className="text-xs font-medium text-text-primary">
                    Preview Student Portal instantly:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-semibold transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <span>Quick Demo Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Notifications */}
            {error && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Password <span className="text-red-500">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link has been dispatched to your email (Demo).')}
                      className="text-xs text-brand-blue hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-surface-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Primary Interest Domain
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Java Development">Java Development</option>
                    <option value="Python Development">Python Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              )}

              {/* Checkbox Options */}
              <div className="pt-1">
                {mode === 'login' ? (
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-border text-brand-blue focus:ring-brand-blue"
                    />
                    <span className="text-xs text-text-secondary">Remember this device for 30 days</span>
                  </label>
                ) : (
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      className="rounded border-border text-brand-blue focus:ring-brand-blue mt-0.5"
                    />
                    <span className="text-xs text-text-secondary leading-snug">
                      I agree to the{' '}
                      <span className="text-brand-blue hover:underline">Terms of Service</span> and{' '}
                      <span className="text-brand-blue hover:underline">Privacy Policy</span>.
                    </span>
                  </label>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.01] flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social Authentication Dividers */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-primary px-3 text-text-muted">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border bg-surface-secondary hover:bg-surface-tertiary text-text-primary text-xs font-semibold transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border bg-surface-secondary hover:bg-surface-tertiary text-text-primary text-xs font-semibold transition-all duration-200 shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
            </div>

            {/* Switch Mode Prompt */}
            <div className="mt-6 text-center text-xs text-text-secondary">
              {mode === 'login' ? (
                <p>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(null); }}
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    Sign up for free
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(null); }}
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    Log in here
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
