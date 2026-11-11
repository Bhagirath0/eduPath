import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Internships', to: '/internships' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'About', to: '/#about' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="container-content flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-text-primary select-none">
          <span className="inline-block w-3 h-3 rounded-sm bg-brand-blue" aria-hidden="true" />
          EduPath
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                    isActive
                      ? 'text-brand-blue font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="secondary" href="/login" size="sm">
            Login
          </Button>
          <Button variant="primary" href="/courses" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors duration-150"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        style={{
          maxHeight: mobileOpen ? '480px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.25s ease',
        }}
        className="md:hidden border-t border-border bg-white"
      >
        <ul className="container-content flex flex-col py-3 gap-0.5">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                    isActive
                      ? 'text-brand-blue font-medium bg-surface-secondary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="container-content flex gap-2 pb-4">
          <Button variant="secondary" href="/login" size="sm" fullWidth onClick={closeMobile}>
            Login
          </Button>
          <Button variant="primary" href="/courses" size="sm" fullWidth onClick={closeMobile}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
