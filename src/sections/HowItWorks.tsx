const STEPS = [
  {
    num: '01',
    title: 'Explore Courses',
    desc: 'Browse all available courses across six technical domains.',
  },
  {
    num: '02',
    title: 'Enroll in a Course',
    desc: 'Pick the course that matches your goals and get started.',
  },
  {
    num: '03',
    title: 'Learn Through Modules',
    desc: 'Work through structured modules at your own pace.',
  },
  {
    num: '04',
    title: 'Practice and Complete Assignments',
    desc: 'Apply concepts through hands-on assignments after each module.',
  },
  {
    num: '05',
    title: 'Build Projects',
    desc: 'Consolidate your learning by building real capstone projects.',
  },
  {
    num: '06',
    title: 'Apply for Internship Opportunities',
    desc: 'Eligible learners can apply for domain-specific internships.',
  },
  {
    num: '07',
    title: 'Complete Evaluation and Become Eligible for Certification',
    desc: 'Finish tasks, pass the evaluation, and earn your certificate.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-surface-primary transition-colors duration-200">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">THE PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 tracking-tight">
            Your Learning Journey
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isLeft
                        ? 'md:text-right md:pr-10'
                        : 'md:text-left md:pl-10'
                    }`}
                  >
                    <h3 className="font-semibold text-text-primary text-base md:text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm">{step.desc}</p>
                  </div>

                  {/* Circle */}
                  <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full border-2 border-brand-blue bg-surface-primary flex items-center justify-center shadow-lg shadow-brand-blue/20">
                    <span className="text-brand-blue font-bold text-xs">
                      {step.num}
                    </span>
                  </div>

                  {/* Spacer (desktop) */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* NOTE */}
        <div className="mt-14 max-w-2xl mx-auto border border-border rounded-xl p-5 bg-surface-secondary text-sm text-text-secondary text-center">
          <span className="font-semibold text-text-primary">Note: </span>
          Completing a course does not automatically guarantee an internship
          certificate. Certificates are issued based on actual completion and
          evaluation.
        </div>
      </div>
    </section>
  );
}
