import React from 'react';

type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: CardPadding;
  onClick?: () => void;
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
}) => {
  const base =
    'bg-surface-primary rounded-card border border-border shadow-card';
  const hoverClass = hover
    ? 'hover:shadow-card-hover transition-shadow duration-200 cursor-pointer'
    : '';

  const classes = [base, paddingClasses[padding], hoverClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
