import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import Button from '@/components/ui/Button';
import { ArrowLeft, BookOpen } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="container-content py-24 sm:py-32 text-center max-w-xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-blue">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mt-3 mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary text-base leading-relaxed mb-8">
          The page you are looking for might have been moved, removed, or does not exist on our learning platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="secondary" leftIcon={<BookOpen className="w-4 h-4" />}>
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default NotFoundPage;
