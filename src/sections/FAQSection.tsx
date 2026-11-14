import React from 'react';
import Accordion from '@/components/ui/Accordion';

const faqItems = [
  {
    id: 'faq-1',
    title: 'Are the foundational courses free to access?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        Yes. All foundational technical courses across Java, Python, Web Development, and other domains are free to access. We believe everyone deserves high-quality structured learning without financial barriers. Optional premium services or specialized tracks may be introduced later, but foundational education remains free.
      </p>
    ),
  },
  {
    id: 'faq-2',
    title: 'Do I need prior programming experience before starting?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        Our beginner courses (like Java Fundamentals, Python Programming, and HTML & CSS) require zero prior programming experience. Each beginner course starts from first principles. Intermediate courses clearly specify prerequisite modules so you always know what to learn first.
      </p>
    ),
  },
  {
    id: 'faq-3',
    title: 'How do the online internships work?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        After completing the required prerequisite courses, students become eligible to apply for domain-specific online internships. Internships are structured into weekly project milestones with specific deliverables. You will work on real application code, submit weekly tasks, and receive constructive evaluation.
      </p>
    ),
  },
  {
    id: 'faq-4',
    title: 'Is a certificate guaranteed just by enrolling in a course or internship?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        No. Certificates are issued strictly upon verified completion of all modules, practical assignments, and evaluated projects. We hold our credentials to high academic standards so that employers know an EduPath certificate represents genuine practical competency.
      </p>
    ),
  },
  {
    id: 'faq-5',
    title: 'Do you offer job placement or hiring guarantees?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        No. We do not make false promises or placement guarantees. Our mission is to give you rigorous, industry-relevant skills and tangible portfolio projects that stand out in real technical interviews. Genuine capability speaks for itself.
      </p>
    ),
  },
  {
    id: 'faq-6',
    title: 'How does third-party certificate verification work?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        Every EduPath certificate comes with a unique Certificate Identification Number (e.g. EP-2024-JV-9821). Any recruiter, company, or institution can visit our public verification page, enter the ID, and instantly verify the recipient name, course, completion date, and credential status directly against our database.
      </p>
    ),
  },
  {
    id: 'faq-7',
    title: 'Can I study on mobile and tablet devices?',
    content: (
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        Yes. The entire platform is built with a responsive mobile-first architecture. You can read lesson materials, study code explanations, and track your progress from your smartphone or tablet, though we recommend a laptop or desktop for writing code during assignments and projects.
      </p>
    ),
  },
];

const FAQSection: React.FC = () => {
  return (
    <section className="section-padding bg-slate-50 dark:bg-[#12151d] border-t border-slate-200 dark:border-white/10 transition-colors duration-200" id="faq">
      <div className="container-content max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-label">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
            Clear, honest answers about our learning tracks, internships, evaluation model, and certification.
          </p>
        </div>

        <div className="bg-white dark:bg-[#161a24] rounded-xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-card">
          <Accordion items={faqItems} allowMultiple />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
