// ─────────────────────────────────────────────────────────────────
// MOCK INTERNSHIP DATA — Development only
// ─────────────────────────────────────────────────────────────────

import type { Internship } from '@/types';

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-001',
    title: 'Web Development Internship',
    slug: 'web-development-internship',
    domain: 'Web Development',
    duration: '4 Weeks',
    difficulty: 'Beginner',
    description: 'Build real-world web projects using HTML, CSS, and JavaScript during this structured internship program.',
    overview:
      'This internship is designed for students who have completed the HTML/CSS and JavaScript courses. You will work on structured weekly tasks that simulate a real project environment, building a complete web application by the end of the program.',
    learningObjectives: [
      'Apply HTML, CSS, and JavaScript skills to real project tasks',
      'Build a complete multi-page web application',
      'Follow professional coding standards and project structure',
      'Write clean, documented code',
      'Submit weekly deliverables for evaluation',
    ],
    skillsCovered: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git', 'Project Structure'],
    eligibility: [
      'Completed HTML & CSS Fundamentals course',
      'Completed JavaScript Fundamentals course (or equivalent knowledge)',
      'Able to dedicate 10–12 hours per week',
    ],
    weeklyStructure: [
      {
        week: 1,
        title: 'Project Setup & Landing Page',
        tasks: ['Set up project structure', 'Build a responsive landing page', 'Push to GitHub repository'],
      },
      {
        week: 2,
        title: 'Multi-Page Navigation & Forms',
        tasks: ['Create additional pages', 'Build functional contact form', 'Implement mobile navigation'],
      },
      {
        week: 3,
        title: 'JavaScript Interactivity',
        tasks: ['Add dynamic content', 'Implement search/filter feature', 'Handle user interactions'],
      },
      {
        week: 4,
        title: 'Final Polish & Submission',
        tasks: ['Review and refactor code', 'Optimize for performance', 'Submit final project for evaluation'],
      },
    ],
    evaluationCriteria: [
      'Code quality and cleanliness',
      'Responsiveness across devices',
      'Project completion and functionality',
      'Weekly task submission',
      'Documentation quality',
    ],
    certificateEligible: true,
    applicationProcess: [
      'Complete required courses',
      'Submit application through the platform',
      'Wait for eligibility review',
      'Receive confirmation and onboarding instructions',
    ],
    published: true,
  },

  {
    id: 'intern-002',
    title: 'Java Development Internship',
    slug: 'java-development-internship',
    domain: 'Java Development',
    duration: '4 Weeks',
    difficulty: 'Intermediate',
    description: 'Apply your Java knowledge to real-world backend development tasks in a structured internship program.',
    overview:
      'Work through real Java development tasks including building console applications, implementing data structures, and writing object-oriented solutions to practical problems.',
    learningObjectives: [
      'Apply OOP concepts to real-world scenarios',
      'Build functional Java applications',
      'Practice problem-solving with DSA',
      'Write well-structured, documented Java code',
    ],
    skillsCovered: ['Java', 'OOP', 'Collections', 'File I/O', 'Problem Solving', 'Git'],
    eligibility: [
      'Completed Java Fundamentals & OOPs course',
      'Basic understanding of data structures (recommended)',
    ],
    weeklyStructure: [
      { week: 1, title: 'OOP Design Tasks', tasks: ['Design class hierarchies', 'Implement real-world OOP scenarios'] },
      { week: 2, title: 'Collections & File Handling', tasks: ['Build a data management system', 'Implement file-based persistence'] },
      { week: 3, title: 'DSA Problem Set', tasks: ['Solve 10 structured DSA problems', 'Analyse time complexity of solutions'] },
      { week: 4, title: 'Final Project', tasks: ['Build a complete Java console application', 'Submit with documentation'] },
    ],
    evaluationCriteria: ['Code quality', 'OOP design principles', 'Problem-solving approach', 'Task completion'],
    certificateEligible: true,
    applicationProcess: [
      'Complete Java Fundamentals course',
      'Apply through the platform',
      'Eligibility review',
      'Onboarding',
    ],
    published: true,
  },

  {
    id: 'intern-003',
    title: 'Python Development Internship',
    slug: 'python-development-internship',
    domain: 'Python Development',
    duration: '4 Weeks',
    difficulty: 'Beginner',
    description: 'Work on Python projects ranging from automation scripts to data processing tasks.',
    overview: 'A practical Python internship covering scripting, data handling, and building small utility applications.',
    learningObjectives: [
      'Write practical Python scripts for real tasks',
      'Work with files, APIs, and data',
      'Build small utility applications',
    ],
    skillsCovered: ['Python', 'File I/O', 'APIs', 'Pandas', 'Automation'],
    eligibility: ['Completed Python Programming Fundamentals course'],
    weeklyStructure: [
      { week: 1, title: 'Scripting & Automation', tasks: ['Write file automation scripts', 'Build a command-line tool'] },
      { week: 2, title: 'Data Processing', tasks: ['Process CSV data with Pandas', 'Generate summary reports'] },
      { week: 3, title: 'API Integration', tasks: ['Fetch data from a public API', 'Process and display results'] },
      { week: 4, title: 'Final Project', tasks: ['Build a complete Python utility', 'Document and submit'] },
    ],
    evaluationCriteria: ['Code quality', 'Task completion', 'Documentation', 'Problem-solving'],
    certificateEligible: true,
    applicationProcess: ['Complete Python course', 'Apply', 'Review', 'Onboarding'],
    published: true,
  },

  {
    id: 'intern-004',
    title: 'AI & Machine Learning Internship',
    slug: 'ai-ml-internship',
    domain: 'AI & Machine Learning',
    duration: '6 Weeks',
    difficulty: 'Intermediate',
    description: 'Explore AI/ML concepts through hands-on tasks using Python and scikit-learn.',
    overview:
      'This internship introduces students to the practical side of machine learning: data preprocessing, model training, evaluation, and interpretation.',
    learningObjectives: [
      'Preprocess real datasets for ML',
      'Train and evaluate ML models',
      'Interpret model results',
      'Document experiments clearly',
    ],
    skillsCovered: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Model Evaluation', 'Data Preprocessing'],
    eligibility: [
      'Python Programming Fundamentals',
      'Python for Data Analysis (recommended)',
      'Basic statistics knowledge',
    ],
    weeklyStructure: [
      { week: 1, title: 'Data Exploration', tasks: ['Explore and clean a real dataset', 'Generate EDA report'] },
      { week: 2, title: 'Feature Engineering', tasks: ['Handle missing values', 'Encode categorical features'] },
      { week: 3, title: 'Model Training', tasks: ['Train classification models', 'Compare algorithms'] },
      { week: 4, title: 'Model Evaluation', tasks: ['Evaluate with metrics', 'Visualize results'] },
      { week: 5, title: 'Improvement', tasks: ['Tune hyperparameters', 'Cross-validation'] },
      { week: 6, title: 'Final Report', tasks: ['Document full ML pipeline', 'Submit report and code'] },
    ],
    evaluationCriteria: ['Technical accuracy', 'Code quality', 'Documentation', 'Analytical thinking'],
    certificateEligible: true,
    applicationProcess: ['Complete prerequisites', 'Apply', 'Review', 'Onboarding'],
    published: true,
  },

  {
    id: 'intern-005',
    title: 'Data Analytics Internship',
    slug: 'data-analytics-internship',
    domain: 'Data Analytics',
    duration: '4 Weeks',
    difficulty: 'Beginner',
    description: 'Work with real datasets to extract insights and present findings using data visualization.',
    overview: 'A practical data analytics internship focused on exploring data, creating visualizations, and writing clear insights.',
    learningObjectives: [
      'Analyse datasets to extract meaningful insights',
      'Create professional visualizations',
      'Write data-driven reports',
    ],
    skillsCovered: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Storytelling'],
    eligibility: ['Python for Data Analysis course (or equivalent)'],
    weeklyStructure: [
      { week: 1, title: 'Dataset Exploration', tasks: ['Load and explore dataset', 'Identify key metrics'] },
      { week: 2, title: 'Data Cleaning', tasks: ['Handle missing values', 'Standardize data formats'] },
      { week: 3, title: 'Visualization', tasks: ['Create charts and graphs', 'Build a dashboard view'] },
      { week: 4, title: 'Final Report', tasks: ['Write insights report', 'Present findings'] },
    ],
    evaluationCriteria: ['Accuracy of insights', 'Visualization quality', 'Report clarity', 'Task completion'],
    certificateEligible: true,
    applicationProcess: ['Complete prerequisites', 'Apply', 'Review', 'Onboarding'],
    published: true,
  },

  {
    id: 'intern-006',
    title: 'Cybersecurity Fundamentals Internship',
    slug: 'cybersecurity-internship',
    domain: 'Cybersecurity',
    duration: '4 Weeks',
    difficulty: 'Beginner',
    description: 'Explore foundational cybersecurity concepts through structured learning tasks and security analysis exercises.',
    overview:
      'This internship introduces the fundamentals of cybersecurity: threat analysis, secure coding basics, and common vulnerabilities. All exercises are ethical and conducted in controlled environments.',
    learningObjectives: [
      'Understand common cybersecurity threats',
      'Identify vulnerabilities in simple systems',
      'Apply secure coding practices',
      'Write security analysis reports',
    ],
    skillsCovered: ['Cybersecurity Basics', 'Threat Analysis', 'Secure Coding', 'OWASP Top 10', 'Report Writing'],
    eligibility: ['Basic programming knowledge', 'Curiosity and commitment to ethical practices'],
    weeklyStructure: [
      { week: 1, title: 'Threat Landscape', tasks: ['Study common attack types', 'Analyse case studies'] },
      { week: 2, title: 'Vulnerabilities', tasks: ['Study OWASP Top 10', 'Identify issues in sample code'] },
      { week: 3, title: 'Secure Coding', tasks: ['Apply secure coding guidelines', 'Review and improve sample code'] },
      { week: 4, title: 'Final Report', tasks: ['Write a security analysis report', 'Submit for evaluation'] },
    ],
    evaluationCriteria: ['Understanding of concepts', 'Analytical quality', 'Report clarity', 'Task completion'],
    certificateEligible: true,
    applicationProcess: ['Apply through the platform', 'Eligibility review', 'Onboarding'],
    published: true,
  },
];

