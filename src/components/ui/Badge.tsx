import React from 'react';

type BadgeVariant = 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'dark';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'gray', children, className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()}>
      {children}
    </span>
  );
};

export default Badge;
