// ─────────────────────────────────────────────────────────────────
// MOCK COURSE DATA
// Development-only. Completely isolated from UI components.
// Replace by connecting real API in src/services/index.ts
// ─────────────────────────────────────────────────────────────────

import type { Course } from '@/types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-001',
    title: 'Java Fundamentals & OOPs',
    slug: 'java-fundamentals-oops',
    domain: 'Java Development',
    tagline: 'Build a strong foundation in Java programming and object-oriented design.',
    description:
      'This course takes you from zero to confident in Java programming. You will learn core syntax, object-oriented principles, and how to write clean, structured Java code. By the end, you will be equipped to build real-world Java applications and tackle DSA challenges.',
    whatYouWillLearn: [
      'Understand Java syntax and program structure',
      'Apply object-oriented programming principles',
      'Work with Java collections and generics',
      'Handle exceptions and file I/O',
      'Write clean, readable, maintainable code',
      'Understand the Java runtime and JVM basics',
    ],
    skillsCovered: ['Java', 'OOP', 'Collections', 'Exception Handling', 'File I/O', 'Generics'],
    prerequisites: ['Basic computer literacy', 'No prior programming experience required'],
    difficulty: 'Beginner',
    durationWeeks: 8,
    estimatedHours: 40,
    published: true,
    modules: [
      {
        id: 'mod-001-1',
        title: 'Introduction to Java',
        description: 'Overview of Java, JVM, JDK, and your first program.',
        order: 1,
        lessons: [
          { id: 'les-001-1-1', title: 'What is Java?', contentType: 'text', order: 1, estimatedMinutes: 10 },
          { id: 'les-001-1-2', title: 'Setting Up Your Environment', contentType: 'text', order: 2, estimatedMinutes: 15 },
          { id: 'les-001-1-3', title: 'Your First Java Program', contentType: 'code-example', order: 3, estimatedMinutes: 20,
            codeExample: {
              language: 'java',
              code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
              output: 'Hello, World!',
              explanation: 'Every Java program starts with a class. The main method is the entry point. System.out.println prints text to the console.',
            },
          },
        ],
      },
      {
        id: 'mod-001-2',
        title: 'Variables, Data Types & Operators',
        description: 'Understanding primitive types, variables, and Java operators.',
        order: 2,
        lessons: [
          { id: 'les-001-2-1', title: 'Primitive Data Types', contentType: 'text', order: 1, estimatedMinutes: 20 },
          { id: 'les-001-2-2', title: 'Variables and Constants', contentType: 'text', order: 2, estimatedMinutes: 15 },
          { id: 'les-001-2-3', title: 'Operators and Expressions', contentType: 'code-example', order: 3, estimatedMinutes: 25 },
        ],
      },
      {
        id: 'mod-001-3',
        title: 'Control Flow',
        description: 'if/else, switch, loops and control statements.',
        order: 3,
        lessons: [
          { id: 'les-001-3-1', title: 'Conditional Statements', contentType: 'text', order: 1, estimatedMinutes: 20 },
          { id: 'les-001-3-2', title: 'Loops in Java', contentType: 'code-example', order: 2, estimatedMinutes: 30 },
          { id: 'les-001-3-3', title: 'Practice Questions', contentType: 'practice-questions', order: 3, estimatedMinutes: 20 },
        ],
      },
      {
        id: 'mod-001-4',
        title: 'Object-Oriented Programming',
        description: 'Classes, objects, inheritance, polymorphism, encapsulation, abstraction.',
        order: 4,
        lessons: [
          { id: 'les-001-4-1', title: 'Classes and Objects', contentType: 'text', order: 1, estimatedMinutes: 25 },
          { id: 'les-001-4-2', title: 'Inheritance', contentType: 'text', order: 2, estimatedMinutes: 25 },
          { id: 'les-001-4-3', title: 'Polymorphism', contentType: 'text', order: 3, estimatedMinutes: 20 },
          { id: 'les-001-4-4', title: 'Encapsulation & Abstraction', contentType: 'text', order: 4, estimatedMinutes: 20 },
        ],
      },
    ],
  },

  {
    id: 'course-002',
    title: 'Java DSA Fundamentals',
    slug: 'java-dsa-fundamentals',
    domain: 'Java Development',
    tagline: 'Master data structures and algorithms using Java.',
    description:
      'Take your Java knowledge further by learning essential data structures and algorithmic thinking. This course covers arrays, linked lists, stacks, queues, trees, and sorting algorithms — all implemented in Java.',
    whatYouWillLearn: [
      'Implement core data structures from scratch in Java',
      'Analyse time and space complexity of algorithms',
      'Solve standard DSA problems confidently',
      'Understand recursion and divide-and-conquer',
      'Work with trees, graphs, and hash tables',
    ],
    skillsCovered: ['Java', 'Data Structures', 'Algorithms', 'Recursion', 'Big O Notation', 'Problem Solving'],
    prerequisites: ['Java Fundamentals & OOPs (or equivalent knowledge)'],
    difficulty: 'Intermediate',
    durationWeeks: 10,
    estimatedHours: 50,
    published: true,
    modules: [
      {
        id: 'mod-002-1',
        title: 'Arrays and Strings',
        description: 'Deep dive into array operations, 2D arrays, and string manipulation.',
        order: 1,
        lessons: [
          { id: 'les-002-1-1', title: 'Array Fundamentals', contentType: 'text', order: 1, estimatedMinutes: 20 },
          { id: 'les-002-1-2', title: 'Array Operations & Complexity', contentType: 'code-example', order: 2, estimatedMinutes: 30 },
          { id: 'les-002-1-3', title: 'String Problems', contentType: 'practice-questions', order: 3, estimatedMinutes: 25 },
        ],
      },
      {
        id: 'mod-002-2',
        title: 'Linked Lists',
        description: 'Singly, doubly, and circular linked lists with real implementations.',
        order: 2,
        lessons: [
          { id: 'les-002-2-1', title: 'Singly Linked List', contentType: 'code-example', order: 1, estimatedMinutes: 30 },
          { id: 'les-002-2-2', title: 'Doubly Linked List', contentType: 'code-example', order: 2, estimatedMinutes: 25 },
        ],
      },
    ],
  },

  {
    id: 'course-003',
    title: 'Python Programming Fundamentals',
    slug: 'python-programming-fundamentals',
    domain: 'Python Development',
    tagline: 'Start your programming journey with one of the world\'s most versatile languages.',
    description:
      'Python is the language of choice for beginners and professionals alike. This course covers everything from basic syntax to functions, modules, and file handling — giving you a solid foundation for data science, automation, and web development.',
    whatYouWillLearn: [
      'Write clean Python code with confidence',
      'Understand Python\'s data structures',
      'Work with functions, modules, and packages',
      'Handle files and exceptions',
      'Use list comprehensions and generators',
      'Write object-oriented Python',
    ],
    skillsCovered: ['Python', 'OOP', 'File I/O', 'Modules', 'Error Handling', 'List Comprehension'],
    prerequisites: ['No prior experience required'],
    difficulty: 'Beginner',
    durationWeeks: 7,
    estimatedHours: 35,
    published: true,
    modules: [
      {
        id: 'mod-003-1',
        title: 'Python Basics',
        description: 'Syntax, variables, data types, and your first Python script.',
        order: 1,
        lessons: [
          { id: 'les-003-1-1', title: 'Introduction to Python', contentType: 'text', order: 1, estimatedMinutes: 10 },
          { id: 'les-003-1-2', title: 'Variables and Data Types', contentType: 'text', order: 2, estimatedMinutes: 20 },
          {
            id: 'les-003-1-3', title: 'Your First Python Script', contentType: 'code-example', order: 3, estimatedMinutes: 15,
            codeExample: {
              language: 'python',
              code: `# Hello, World in Python\nname = "Learner"\nprint(f"Hello, {name}! Welcome to Python.")`,
              output: 'Hello, Learner! Welcome to Python.',
              explanation: 'Python uses f-strings for string interpolation. No semicolons needed — indentation is everything.',
            },
          },
        ],
      },
      {
        id: 'mod-003-2',
        title: 'Control Flow & Functions',
        description: 'Conditionals, loops, and writing reusable functions.',
        order: 2,
        lessons: [
          { id: 'les-003-2-1', title: 'If / Elif / Else', contentType: 'text', order: 1, estimatedMinutes: 20 },
          { id: 'les-003-2-2', title: 'Loops', contentType: 'code-example', order: 2, estimatedMinutes: 25 },
          { id: 'les-003-2-3', title: 'Functions', contentType: 'text', order: 3, estimatedMinutes: 25 },
        ],
      },
    ],
  },

  {
    id: 'course-004',
    title: 'Python for Data Analysis',
    slug: 'python-for-data-analysis',
    domain: 'Python Development',
    tagline: 'Use Python\'s ecosystem to explore, clean, and visualize real-world data.',
    description:
      'Go beyond basic Python and learn how to work with data professionally. Using NumPy, Pandas, and Matplotlib, you will explore datasets, clean messy data, and create meaningful visualizations.',
    whatYouWillLearn: [
      'Use NumPy for numerical computation',
      'Manipulate data with Pandas DataFrames',
      'Clean and preprocess real datasets',
      'Create visualizations with Matplotlib and Seaborn',
      'Perform exploratory data analysis',
    ],
    skillsCovered: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA', 'Data Cleaning'],
    prerequisites: ['Python Programming Fundamentals (or equivalent)'],
    difficulty: 'Intermediate',
    durationWeeks: 8,
    estimatedHours: 45,
    published: true,
    modules: [
      {
        id: 'mod-004-1',
        title: 'NumPy Essentials',
        description: 'Arrays, broadcasting, and mathematical operations.',
        order: 1,
        lessons: [
          { id: 'les-004-1-1', title: 'Introduction to NumPy', contentType: 'text', order: 1, estimatedMinutes: 20 },
          { id: 'les-004-1-2', title: 'Array Operations', contentType: 'code-example', order: 2, estimatedMinutes: 30 },
        ],
      },
      {
        id: 'mod-004-2',
        title: 'Pandas for Data Manipulation',
        description: 'Series, DataFrames, cleaning, and grouping.',
        order: 2,
        lessons: [
          { id: 'les-004-2-1', title: 'DataFrames Basics', contentType: 'text', order: 1, estimatedMinutes: 25 },
          { id: 'les-004-2-2', title: 'Data Cleaning', contentType: 'code-example', order: 2, estimatedMinutes: 35 },
        ],
      },
    ],
  },

  {
    id: 'course-005',
    title: 'HTML & CSS Fundamentals',
    slug: 'html-css-fundamentals',
    domain: 'Web Development',
    tagline: 'Build your first web pages with clean, semantic HTML and modern CSS.',
    description:
      'Everything on the web starts with HTML and CSS. This course teaches you to build structured, well-styled web pages from scratch. You will work with semantic HTML, the CSS box model, Flexbox, Grid, and responsive design.',
    whatYouWillLearn: [
      'Write semantic, accessible HTML',
      'Style pages with modern CSS',
      'Build layouts with Flexbox and CSS Grid',
      'Create responsive designs for all screen sizes',
      'Understand CSS specificity and the cascade',
      'Build real-world page layouts as projects',
    ],
    skillsCovered: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive Design', 'Semantic HTML'],
    prerequisites: ['No prior experience required'],
    difficulty: 'Beginner',
    durationWeeks: 6,
    estimatedHours: 30,
    published: true,
    modules: [
      {
        id: 'mod-005-1',
        title: 'HTML Foundations',
        description: 'Document structure, elements, attributes, and semantic markup.',
        order: 1,
        lessons: [
          { id: 'les-005-1-1', title: 'HTML Document Structure', contentType: 'text', order: 1, estimatedMinutes: 20 },
          { id: 'les-005-1-2', title: 'Semantic HTML Elements', contentType: 'text', order: 2, estimatedMinutes: 25 },
          { id: 'les-005-1-3', title: 'Forms and Inputs', contentType: 'code-example', order: 3, estimatedMinutes: 30 },
        ],
      },
      {
        id: 'mod-005-2',
        title: 'CSS Fundamentals',
        description: 'Box model, selectors, specificity, and styling essentials.',
        order: 2,
        lessons: [
          { id: 'les-005-2-1', title: 'The CSS Box Model', contentType: 'text', order: 1, estimatedMinutes: 25 },
          { id: 'les-005-2-2', title: 'Selectors and Specificity', contentType: 'text', order: 2, estimatedMinutes: 20 },
          { id: 'les-005-2-3', title: 'Flexbox Layout', contentType: 'code-example', order: 3, estimatedMinutes: 35 },
        ],
      },
    ],
  },

  {
    id: 'course-006',
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    domain: 'Web Development',
    tagline: 'Learn the programming language of the web and make pages interactive.',
    description:
      'JavaScript powers every interactive website. This course covers JS from the ground up: variables, functions, the DOM, events, fetch API, and modern ES6+ features. By the end, you will build dynamic, interactive web applications.',
    whatYouWillLearn: [
      'Understand JavaScript syntax and core concepts',
      'Manipulate the DOM to build interactive UIs',
      'Handle events and user interactions',
      'Work with async JavaScript: Promises and async/await',
      'Fetch data from APIs',
      'Use modern ES6+ features',
    ],
    skillsCovered: ['JavaScript', 'DOM Manipulation', 'Events', 'Fetch API', 'ES6+', 'Async/Await'],
    prerequisites: ['HTML & CSS Fundamentals (recommended)'],
    difficulty: 'Beginner',
    durationWeeks: 8,
    estimatedHours: 40,
    published: true,
    modules: [
      {
        id: 'mod-006-1',
        title: 'JavaScript Basics',
        description: 'Variables, types, operators, and control flow in JS.',
        order: 1,
        lessons: [
          { id: 'les-006-1-1', title: 'Variables: let, const, var', contentType: 'code-example', order: 1, estimatedMinutes: 20 },
          { id: 'les-006-1-2', title: 'Data Types and Type Coercion', contentType: 'text', order: 2, estimatedMinutes: 25 },
          { id: 'les-006-1-3', title: 'Functions and Scope', contentType: 'text', order: 3, estimatedMinutes: 30 },
        ],
      },
      {
        id: 'mod-006-2',
        title: 'DOM Manipulation',
        description: 'Selecting, modifying, and creating DOM elements dynamically.',
        order: 2,
        lessons: [
          { id: 'les-006-2-1', title: 'Selecting Elements', contentType: 'code-example', order: 1, estimatedMinutes: 20 },
          { id: 'les-006-2-2', title: 'Events and Listeners', contentType: 'code-example', order: 2, estimatedMinutes: 25 },
        ],
      },
    ],
  },
];

