import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Keychain3D from '@/components/hero/Keychain3D';

interface HeroSectionProps {
  on3dReady: () => void;
  playEntrance: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ on3dReady, playEntrance }) => {
  const headlineInnerRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!playEntrance || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (headlineInnerRef.current) gsap.set(headlineInnerRef.current, { yPercent: 0 });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 0, opacity: 1 });
      if (buttonRef.current) gsap.set(buttonRef.current, { y: 0, opacity: 1 });
      return;
    }

    // Headline entrance: yPercent 105 -> 0, duration 1.2s, delay 0.35s, expo.out
    if (headlineInnerRef.current) {
      gsap.fromTo(
        headlineInnerRef.current,
        { yPercent: 105 },
        { yPercent: 0, duration: 1.2, delay: 0.35, ease: 'expo.out' }
      );
    }

    // Subtitle & Button entrance: y +24px, opacity 0 -> 1, duration 1.0s, delay 0.55s (0.1s stagger)
    const targets = [subtitleRef.current, buttonRef.current].filter(Boolean);
    if (targets.length > 0) {
      gsap.fromTo(
        targets,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, delay: 0.55, stagger: 0.1, ease: 'expo.out' }
      );
    }
  }, [playEntrance]);

  return (
    <section
      className="hero-scope relative w-full overflow-hidden select-none"
      style={{
        height: '100vh',
        minHeight: '560px',
        background: 'var(--hero-grad)',
      }}
    >
      {/* 3D Keychain simulation canvas */}
      <Keychain3D onReady={on3dReady} playEntrance={playEntrance} />

      {/* Hero Bottom Content Bar */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex flex-col md:flex-row items-start md:items-end justify-between"
        style={{
          paddingLeft: 'max(20px, calc(90 * var(--u)))',
          paddingRight: 'max(20px, calc(90 * var(--u)))',
          paddingBottom: 'max(32px, calc(64 * var(--u)))',
          gap: 'calc(40 * var(--u))',
        }}
      >
        {/* Left: Headline in mask */}
        <div className="overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <h1 className="leading-none tracking-tight text-text-primary font-inter-tight font-medium">
            <span
              ref={headlineInnerRef}
              className="inline-block transform"
              style={{
                fontSize: 'max(48px, calc(128 * var(--u)))',
                lineHeight: 0.94,
                letterSpacing: '-0.03em',
                willChange: 'transform',
              }}
            >
              LEARN SKILLS.
              <br />
              BUILD PROJECTS.
            </span>
          </h1>
        </div>

        {/* Right: Subtitle & CTA Column */}
        <div
          className="flex flex-col items-start"
          style={{
            paddingBottom: 'max(6px, calc(10 * var(--u)))',
          }}
        >
          <div
            ref={subtitleRef}
            className="font-inter-tight text-text-secondary leading-tight"
            style={{
              fontSize: 'max(16px, calc(23.5 * var(--u)))',
              letterSpacing: '0.01em',
              lineHeight: 1.15,
            }}
          >
            Practical technical courses, hands-on assignments,
            <br />
            and structured online internships across India.
          </div>

          <div className="flex items-center gap-3 mt-4 pointer-events-auto">
            <Link
              ref={buttonRef}
              to="/internships"
              className="inline-flex items-center justify-center font-inter-tight font-medium text-white bg-brand-blue hover:bg-brand-blueDark transition-all duration-300 shadow-lg shadow-blue-500/20"
              style={{
                height: 'max(44px, calc(48 * var(--u)))',
                paddingLeft: 'max(20px, calc(29 * var(--u)))',
                paddingRight: 'max(20px, calc(29 * var(--u)))',
                borderRadius: 'max(11px, calc(13 * var(--u)))',
                fontSize: 'max(14px, calc(16 * var(--u)))',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Explore Internships
            </Link>

            <Link
              to="/courses"
              className="inline-flex items-center justify-center font-inter-tight font-medium text-text-primary border border-border bg-surface-primary/50 hover:bg-surface-secondary/80 backdrop-blur-sm transition-all duration-300 shadow-sm"
              style={{
                height: 'max(44px, calc(48 * var(--u)))',
                paddingLeft: 'max(18px, calc(24 * var(--u)))',
                paddingRight: 'max(18px, calc(24 * var(--u)))',
                borderRadius: 'max(11px, calc(13 * var(--u)))',
                fontSize: 'max(14px, calc(16 * var(--u)))',
              }}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
