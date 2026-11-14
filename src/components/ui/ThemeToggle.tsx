import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Currently Dark Mode (Click for Light Mode)' : 'Currently Light Mode (Click for Dark Mode)'}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full p-2 transition-all duration-200 border ${
        isDark
          ? 'bg-white/10 hover:bg-white/20 text-blue-400 border-white/20 shadow-inner'
          : 'bg-black/5 hover:bg-black/10 text-amber-600 border-black/10 shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <Moon className="w-4 h-4 fill-blue-400/20 text-blue-400 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  );
};

export default ThemeToggle;
