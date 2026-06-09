import { SkillCategory, Project, GalleryItem } from './types';

export const PERSONAL_INFO = {
  name: 'Bilal Abdulkadir Muhammed',
  title: 'AI & Data Science Specialist',
  subTitle: 'IT Operations & Data Management Professional',
  institution: 'Jimma University alumnus',
  pathway: 'Kaplan Pre-Master’s → University of Westminster MA AI, Data & Communication',
  email: 'Bilalabdulkadir286@gmail.com',
  phone: '+251 94 132 2989',
  linkedin: 'linkedin.com/in/bilalabdulkadir',
  github: 'github.com/Bilalabdulkadir',
  twitter: 'x.com/imrbil27',
  instagram: 'instagram.com/bilal.tech27?igsh=emlvdmpweGY3eW1p',
  location: 'Addis Ababa, Ethiopia',
  quickBio: 'IT operations and data management professional with 4+ years of experience in technical support, database administration, and digital transformation in public and development sectors. Focused on bridging computational precision with executive decision-making and human-centered AI communication.',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Data & Analytics',
    icon: 'Database',
    skills: [
      { name: 'Power BI (with Copilot)', level: 82, label: 'Strong/Working' },
      { name: 'Python (Pandas & Data Science)', level: 68, label: 'Intermediate' },
      { name: 'Microsoft Fabric', level: 55, label: 'Active Learning' },
      { name: 'Advanced Excel', level: 88, label: 'Expert' },
      { name: 'Data Verification & Logging', level: 85, label: 'Strong' },
    ],
  },
  {
    title: 'AI & ML Workflows',
    icon: 'Cpu',
    skills: [
      { name: 'Generative AI Tools (Gemini/Copilot)', level: 80, label: 'Strong' },
      { name: 'Prompt Engineering & Automation', level: 72, label: 'Intermediate' },
      { name: 'Responsible AI & Data Privacy', level: 78, label: 'Intermediate' },
      { name: 'Critical AI & Communication Studies', level: 65, label: 'Active Reading' },
    ],
  },
  {
    title: 'IT Operations',
    icon: 'Settings',
    skills: [
      { name: 'Hardware & OS Support', level: 90, label: 'Highly Proficient' },
      { name: 'Network Configuration', level: 75, label: 'Intermediate' },
      { name: 'Preventive System Maintenance', level: 88, label: 'Strong' },
      { name: 'Technical Incident Documentation', level: 82, label: 'Strong' },
    ],
  },
  {
    title: 'Design & Communication',
    icon: 'MessageSquare',
    skills: [
      { name: 'Information Layout & Branding', level: 78, label: 'Intermediate' },
      { name: 'Technical translation (Eng to Users)', level: 85, label: 'Strong' },
      { name: 'Support & Collaboration', level: 88, label: 'Strong' },
      { name: 'Media Layout & Content Dev', level: 70, label: 'Working' },
    ],
  }
];

export const WORK_PROJECTS: Project[] = [
  {
    id: 'dera-digital-forms',
    title: 'Digital Forms Rollout',
    subtitle: 'Dera City Administration',
    timeline: 'Jan 2022 – Jan 2024',
    sector: 'Public Sector / Local Government',
    outcome: 'Eliminated manual transcription errors and digitized citizen profile registries',
    tags: ['E-Governance', 'Data Entry Verification', 'Process Design', 'Database Admin'],
    context: 'Spearheaded the practical migration of paper municipal registration files to new electronic forms, providing frontline software support for local civil servants.',
    bullets: [
      'Coordinated the registration and high-fidelity verification of over 10,000 resident records.',
      'Implemented robust real-time data cleansing routines that reduced database input inconsistencies by over 30%.',
      'Acted as a crucial hybrid translator, training non-technical administrative colleagues to navigate municipal schema platforms.',
    ],
  },
  {
    id: 'sdo-preventive-maintenance',
    title: 'Preventive Maintenance Engine',
    subtitle: 'Star Development Organization',
    timeline: 'May 2022 – Sep 2025',
    sector: 'Non-Governmental / Development NGO',
    outcome: 'Maintained 99.8% system up-time across complex multi-branch network connections',
    tags: ['Network Operations', 'Preventive Maintenance', 'Risk Mitigation', 'OS Provisioning'],
    context: 'Owned end-to-end technical support management for a regional NGO, overseeing hardware lifecycles, configuration rollouts, and field network security protocols.',
    bullets: [
      'Formulated a standardized software installation checklist that improved operational deployment speed for custom applications.',
      'Designed a unified knowledge-base ledger containing typical incidents and quick-resolve procedures, accelerating team onboarding.',
      'Administered regular, secure storage backups and routine patch evaluations across multi-user environments.',
    ],
  },
  {
    id: 'standards-ce-006',
    title: 'Standards Australia CE-006 Committee Contribution',
    subtitle: 'Expert Consultation Panel Representation',
    timeline: 'Dec 2015',
    sector: 'Global Compliance & Infrastructure Standards',
    outcome: 'Contributed critique and constructive input on asphalt durability metrics and spray surfacing guidance',
    tags: ['Technical Governance', 'Quality Assurance', 'International Compliance', 'Standards Connect'],
    context: 'Volunteered technical analytical review and feedback for structural asphalt formulations, collaborating via the official national standards collaboration portal.',
    bullets: [
      'Participated in testing guidelines evaluation and draft refinements.',
      'Collaborated remotely with international construction and laboratory experts to assess compliance metrics.',
      'Synthesized standard references on materials resilience, proving strong document analytical capacity.',
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'cert-python-data',
    title: 'Explore & Analyze Data with Python',
    badge: 'Microsoft Professional Learn Pathway',
    category: 'certification',
    issuer: 'Microsoft Learn',
    date: '2026',
    description: 'Practical validation covering Python statistical scripting, exploratory data frameworks, matplotlib distributions, and notebook-based algorithms.',
    visualType: 'code',
    accentColor: '#0078d4',
    metadata: [
      { label: 'Language', value: 'Python 3.10' },
      { label: 'Core Libraries', value: 'Pandas, NumPy, Matplotlib' },
      { label: 'Methodology', value: 'Exploratory Data Analysis (EDA)' }
    ],
    learnings: [
      'Mastered vector manipulation and database queries through Pandas dataframes.',
      'Designed high-fidelity scatter distribution plots, box plots, and density charts to reveal variance.',
      'Applied statistical regression modeling directly within Jupyter Notebook workflows.'
    ],
    skillsDemonstrated: ['Data Wrangling', 'Python Scripting', 'Statistical Plotting']
  },
  {
    id: 'cert-powerbi-copilot',
    title: 'Get Started with Copilot in Power BI',
    badge: 'Microsoft AI Analytics Certificate',
    category: 'certification',
    issuer: 'Microsoft Learn',
    date: '2026',
    description: 'Demonstrates prompt engineering inside Power BI Desktop, using native LLM models to write complex DAX expressions and auto-generate summary narratives.',
    visualType: 'dashboard',
    accentColor: '#f2c811',
    metadata: [
      { label: 'Platform', value: 'Power BI Service + Copilot' },
      { label: 'Core Skills', value: 'Prompting, DAX expressions' },
      { label: 'Focus', value: 'AI-assisted executive summaries' }
    ],
    learnings: [
      'Engineered structured system prompts to auto-generate responsive executive dashboard mockups.',
      'Synthesized multi-dimensional KPIs into conversational bullet points for immediate consumption.',
      'Discovered mechanisms to guard sensitive columns when interfacing with server-side API clients.'
    ],
    skillsDemonstrated: ['Prompt Design', 'Executive Narrative Generation', 'DAX Logic']
  },
  {
    id: 'cert-fabric-analytics',
    title: 'End-to-End Analytics in Microsoft Fabric',
    badge: 'Enterprise Platform Certificate',
    category: 'certification',
    issuer: 'Microsoft Learn',
    date: '2026',
    description: 'Covers OneLake unified storage, Lakehouse structure deployment, Delta table structures, and building unified enterprise analytics pipelines.',
    visualType: 'process',
    accentColor: '#8b5cf6',
    metadata: [
      { label: 'Pipeline Engine', value: 'OneLake & Apache Spark' },
      { label: 'Architecture', value: 'Medallion Schema (Bronze/Silver/Gold)' },
      { label: 'Integration', value: 'Direct Lake Power BI' }
    ],
    learnings: [
      'Understood deployment of SaaS semantic models directly connecting to a dynamic delta warehouse.',
      'Organized multi-source data feeds into centralized folder structures for multi-user visualization.',
      'Evaluated compliance protocols guarding corporate analytical repositories.'
    ],
    skillsDemonstrated: ['Cloud Lakehouse Design', 'Medallion Architecture', 'Pipeline Modeling']
  },
  {
    id: 'cert-gemini-google',
    title: 'Gemini in Google Drive',
    badge: 'Professional Productivity Certificate',
    category: 'certification',
    issuer: 'Udacity (with Accenture)',
    date: '2026',
    description: 'Accreditation covering corporate generative workflows, using server-side Gemini endpoints to draft briefs, structure project schemas, and analyze complex document logs.',
    visualType: 'code',
    accentColor: '#1a73e8',
    metadata: [
      { label: 'Sponsor', value: 'Accenture Partnership' },
      { label: 'Toolchain', value: 'Google Workspace Docs & Drive' },
      { label: 'Competency', value: 'Advanced office workspace automation' }
    ],
    learnings: [
      'Established high-speed summary filters for 100+ page administrative reports.',
      'Learned structured prompting parameters to extract actionable milestones from legal and academic proposals.',
      'Addressed hallucination boundaries, implementing procedural cross-referencing checks.'
    ],
    skillsDemonstrated: ['Document Automation', 'Generative Workflows', 'Quality Control']
  },
  {
    id: 'piece-bsc-computing',
    title: 'BSc in Computing Core Foundation',
    badge: 'Academic Milestone',
    category: 'academic',
    issuer: 'Jimma University',
    date: '2019',
    description: 'Comprehensive academic grounding in software development, algorithmic complexity, SQL entity structures, basic TCP/IP networking, and hardware systems.',
    visualType: 'credentials',
    accentColor: '#10b981',
    metadata: [
      { label: 'Campus', value: 'Jimma University, Ethiopia' },
      { label: 'Degree', value: 'BSc in Computing' },
      { label: 'Duration', value: '2014 – 2019' }
    ],
    learnings: [
      'Studied foundational components of database schemas, indexing, and relational queries.',
      'Gained deep familiarity with computer diagnostics, hardware architecture, and assembly procedures.',
      'Applied software lifecycle best practices from design to local diagnostic testing.'
    ],
    skillsDemonstrated: ['Relational Database SQL', 'Networking Fundamentals', 'Algorithm Analytics']
  }
];

export const EDUCATION_TIMELINE = [
  {
    period: '2014 – 2019',
    title: 'BSc in Computing',
    institution: 'Jimma University, Ethiopia',
    description: 'Built core qualitative and computational fundamentals. Focused coursework on system performance, networking architecture, and database concepts.',
  },
  {
    period: '2019 – 2022',
    title: 'Transition & Market Preparation',
    institution: 'Professional Support & Freelance Design',
    description: 'Worked on localized computer maintenance, IT consulting, and graphic design assignments while organizing upcoming academic applications.',
  },
  {
    period: '2022 – 2024',
    title: 'Database Registration Officer',
    institution: 'Dera City Administration, Ethiopia',
    description: 'Frontline service processing municipal profiles. Organized digital form rollouts, conducted intensive records verification, and resolved data defects.',
  },
  {
    period: '2022 – 2025',
    title: 'IT Service Support Professional',
    institution: 'Star Development Organization, Ethiopia',
    description: 'Headed hardware diagnostic management, OS scripting parameters, networking stability, and joint ledger guides for a regional development NGO.',
  },
  {
    period: '2025 – 2026',
    title: 'Intensive Self-Directed Certifications',
    institution: 'Microsoft Learn & Udacity/Accenture',
    description: 'Earned 6 tech credentials across advanced Power BI, Python modeling, Microsoft Fabric Data Lakehouses, and Gemini workspace integrations.',
  },
  {
    period: 'Sep 2026 – June 2027',
    title: 'Pre-Master’s in Law & Social Sciences',
    institution: 'Kaplan International College London',
    description: 'Rigorous preparation bridging tech expertise with social science perspectives, research methods, and critical legal writing.',
  },
  {
    period: 'Sep 2027 onwards',
    title: 'MA AI, Data and Communication',
    institution: 'University of Westminster, London',
    description: 'Comprehensive postgraduate training analyzing AI ethics, algorithmic explainability, data governance, and public-interest technology communications.',
  }
];
