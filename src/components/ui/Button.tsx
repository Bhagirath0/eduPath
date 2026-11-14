import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-blue text-white hover:bg-brand-blueDark focus:ring-brand-blue/30',
  secondary:
    'border border-border bg-surface-primary text-text-primary hover:bg-surface-secondary focus:ring-brand-blue/30',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-secondary focus:ring-brand-blue/30',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  href,
  type = 'button',
  children,
  className = '',
}) => {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 select-none';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass =
    disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
};

export default Button;
