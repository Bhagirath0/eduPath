import React from 'react';
import GlazeHeader from './GlazeHeader';
import Footer from './Footer';
import { useScrollTop } from '@/hooks/useScrollTop';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  useScrollTop();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0d11] text-slate-900 dark:text-white selection:bg-brand-blue/30 selection:text-white relative transition-colors duration-200">
      <GlazeHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
