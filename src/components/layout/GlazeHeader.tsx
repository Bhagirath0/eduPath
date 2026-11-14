import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';

const GlazeHeader: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed z-30 pointer-events-none flex items-start justify-between transition-all duration-300"
      style={{
        top: 'max(12px, calc(24 * var(--u)))',
        left: 'max(12px, calc(90 * var(--u)))',
        right: 'max(12px, calc(90 * var(--u)))',
      }}
    >
      {/* Left Pill */}
      <div
        className="pointer-events-auto flex items-center justify-between overflow-hidden shadow-lg backdrop-blur-[16px] transition-all"
        style={{
          height: 'max(46px, calc(64 * var(--u)))',
          borderRadius: 'max(12px, calc(16 * var(--u)))',
          backgroundColor: 'var(--pill-bg)',
          paddingLeft: 'max(14px, calc(22 * var(--u)))',
          paddingRight: 'max(14px, calc(22 * var(--u)))',
          width: isCompact
            ? 'max(128px, calc(250 * var(--u)))'
            : 'max(128px, min(100%, calc(708 * var(--u))))',
          transition: 'width 0.6s cubic-bezier(0.7, 0, 0.2, 1), background-color 0.2s',
          border: '1px solid var(--pill-border)',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 select-none shrink-0 group"
          aria-label="EduPath home"
        >
          <span
            className="font-kaushan leading-none transition-transform group-hover:scale-105"
            style={{
              fontSize: 'max(20px, calc(31 * var(--u)))',
              transform: 'skewX(-6deg)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            EduPath
          </span>
          <span
            className="rounded-full bg-brand-blue shrink-0 shadow-[0_0_8px_rgba(47,99,255,0.8)]"
            style={{
              width: 'max(3px, calc(4 * var(--u)))',
              height: 'max(3px, calc(4 * var(--u)))',
              marginLeft: 'calc(3 * var(--u))',
              marginBottom: '2px',
            }}
          />
        </Link>

        {/* Nav Links */}
        <nav
          className="hidden md:flex items-center transition-opacity duration-300"
          style={{
            marginLeft: 'calc(44 * var(--u))',
            gap: 'calc(24 * var(--u))',
            opacity: isCompact ? 0 : 1,
            pointerEvents: isCompact ? 'none' : 'auto',
          }}
        >
          {[
            { label: 'Courses', to: '/courses' },
            { label: 'Internships', to: '/internships' },
            { label: 'How It Works', to: '/#how-it-works' },
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Verify', to: '/verify-certificate' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="font-inter-tight transition-colors text-sm whitespace-nowrap opacity-85 hover:opacity-100"
              style={{
                fontSize: 'calc(17 * var(--u))',
                color: 'var(--text-secondary)',
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* More Button on far right */}
        <button
          type="button"
          aria-label="More navigation options"
          className="flex items-center justify-center shrink-0 transition-colors ml-auto opacity-75 hover:opacity-100"
          style={{
            width: 'max(22px, calc(30 * var(--u)))',
            height: 'max(22px, calc(30 * var(--u)))',
            color: 'var(--text-secondary)',
          }}
        >
          <svg
            viewBox="0 0 4 16"
            className="w-auto"
            style={{
              height: 'max(12px, calc(16 * var(--u)))',
              fill: 'currentColor',
            }}
          >
            <circle cx="2" cy="2" r="2" />
            <circle cx="2" cy="14" r="2" />
          </svg>
        </button>
      </div>

      {/* Right Pill */}
      <div
        className="pointer-events-auto flex items-center shadow-lg backdrop-blur-[16px] shrink-0"
        style={{
          height: 'max(46px, calc(60 * var(--u)))',
          marginTop: 'calc(2 * var(--u))',
          borderRadius: 'max(12px, calc(16 * var(--u)))',
          backgroundColor: 'var(--pill-bg)',
          paddingLeft: 'max(10px, calc(16 * var(--u)))',
          paddingRight: 'max(8px, calc(13 * var(--u)))',
          gap: 'max(8px, calc(14 * var(--u)))',
          border: '1px solid var(--pill-border)',
        }}
      >
        {/* Dark / Light Mode Switch */}
        <ThemeToggle />

        <Link
          to="/login"
          className="font-inter-tight transition-colors font-medium opacity-90 hover:opacity-100"
          style={{
            fontSize: 'max(13px, calc(17 * var(--u)))',
            color: 'var(--text-primary)',
          }}
        >
          Login
        </Link>

        <Link
          to="/internships"
          className="font-inter-tight font-medium text-white bg-brand-blue hover:bg-brand-blueDark transition-colors flex items-center justify-center shadow-sm"
          style={{
            borderRadius: 'max(8px, calc(9 * var(--u)))',
            padding: 'max(6px, calc(8 * var(--u))) max(12px, calc(16 * var(--u)))',
            fontSize: 'max(13px, calc(16 * var(--u)))',
          }}
        >
          Explore Internships
        </Link>
      </div>
    </header>
  );
};

export default GlazeHeader;
