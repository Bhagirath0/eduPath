import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className={`inline-flex items-center p-1 rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300/80 dark:border-white/15 backdrop-blur-md transition-all shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Switch to Light Mode"
        aria-pressed={!isDark}
        title="Light Mode"
        className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${
          !isDark
            ? 'bg-white text-amber-600 shadow-sm font-semibold scale-105'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Switch to Dark Mode"
        aria-pressed={isDark}
        title="Dark Mode"
        className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${
          isDark
            ? 'bg-brand-blue text-white shadow-sm font-semibold scale-105'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ThemeToggle;
