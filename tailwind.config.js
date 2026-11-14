/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Design Tokens ──────────────────────────────────────────
        // Change these in one place to retheme the entire platform.
        brand: {
          blue:     '#2F63FF',
          blueDark: '#1E4FCC',
          blueLight:'#EEF2FF',
        },
        surface: {
          primary:   '#0b0d11',
          secondary: '#12151d',
          tertiary:  '#1a1e29',
        },
        text: {
          primary:   '#f8fafc',
          secondary: '#94a3b8',
          muted:     '#64748b',
          inverse:   '#111111',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          strong:  'rgba(255, 255, 255, 0.2)',
        },
        dark: {
          DEFAULT: '#111111',
          800:     '#1A1A1A',
          700:     '#262626',
          600:     '#333333',
        },
        status: {
          success:     '#16A34A',
          successLight:'#DCFCE7',
          warning:     '#D97706',
          warningLight:'#FEF3C7',
          error:       '#DC2626',
          errorLight:  '#FEE2E2',
          info:        '#2563EB',
          infoLight:   '#DBEAFE',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg':  ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1200px',
        'narrow':  '800px',
        'wide':    '1400px',
      },
      boxShadow: {
        'card':  '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.06)',
        'modal': '0 20px 60px -10px rgba(0,0,0,0.15)',
        'nav':   '0 1px 0 0 #E5E7EB',
      },
      borderRadius: {
        'card': '12px',
        'pill': '999px',
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease forwards',
        'slide-up':      'slideUp 0.4s ease forwards',
        'slide-in-left': 'slideInLeft 0.3s ease forwards',
        'progress':      'progress 1s ease forwards',
      },
      keyframes: {
        fadeIn:      { from: { opacity: '0' },                   to: { opacity: '1' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        progress:    { from: { width: '0%' }, to: { width: 'var(--progress-width)' } },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

