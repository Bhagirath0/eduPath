import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`divide-y divide-slate-200 dark:divide-white/10 border border-slate-200 dark:border-white/10 rounded-card overflow-hidden ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <div key={item.id} className="bg-white dark:bg-[#161a24]">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {/* Smooth max-height transition via inline style */}
            <div
              style={{
                maxHeight: isOpen ? '600px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.25s ease',
              }}
            >
              <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
