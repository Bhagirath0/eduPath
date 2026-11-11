import React from 'react';
import Button from './Button';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      {Icon && (
        <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-surface-secondary text-text-secondary">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}

      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      )}

      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
