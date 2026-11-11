import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'brand' | 'white' | 'gray';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const colorMap: Record<SpinnerColor, string> = {
  brand: 'text-brand-blue',
  white: 'text-white',
  gray: 'text-gray-400',
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'brand',
  className = '',
}) => {
  const px = sizeMap[size];

  return (
    <svg
      className={`animate-spin ${colorMap[color]} ${className}`}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading"
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

export default Spinner;
