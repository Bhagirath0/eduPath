import React from 'react';

type ProgressBarSize = 'sm' | 'md';
type ProgressBarColor = 'blue' | 'green' | 'yellow';

interface ProgressBarProps {
  percent: number;
  size?: ProgressBarSize;
  label?: string;
  showPercent?: boolean;
  color?: ProgressBarColor;
  className?: string;
}

const heightMap: Record<ProgressBarSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

const colorMap: Record<ProgressBarColor, string> = {
  blue: 'bg-brand-blue',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  size = 'md',
  label,
  showPercent = false,
  color = 'blue',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <span className="text-xs font-medium text-text-secondary">{label}</span>
          )}
          {showPercent && (
            <span className="text-xs font-semibold text-text-primary ml-auto">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full rounded-full bg-slate-200 dark:bg-surface-secondary overflow-hidden ${heightMap[size]}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${heightMap[size]} ${colorMap[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
