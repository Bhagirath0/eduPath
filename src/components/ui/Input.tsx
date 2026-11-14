import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  id,
  name,
  className = '',
  autoComplete,
}) => {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const baseInput =
    'w-full border rounded-lg px-3 py-2.5 text-sm text-text-primary bg-surface-primary placeholder:text-text-muted transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-surface-secondary disabled:cursor-not-allowed';

  const normalBorder = 'border-border focus:border-brand-blue focus:ring-brand-blue/20';
  const errorBorder = 'border-red-400 focus:border-red-400 focus:ring-red-400/20 text-red-600 dark:text-red-400';

  const inputClasses = [
    baseInput,
    error ? errorBorder : normalBorder,
    leftIcon ? 'pl-9' : '',
    rightIcon ? 'pr-9' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-text-secondary flex items-center pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
        />

        {rightIcon && (
          <span className="absolute right-3 text-text-secondary flex items-center pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-0.5">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-text-secondary mt-0.5">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
