export interface Skill {
  name: string;
  level: number; // 0-100 percentage
  label: string; // "advanced" | "intermediate" | "learning" | "strong" etc.
}

export interface SkillCategory {
  title: string;
  icon: string; // Lucide icon identifier
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  timeline: string;
  sector: string;
  outcome: string;
  tags: string[];
  context: string;
  bullets: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  badge: string;
  category: 'certification' | 'academic' | 'portfolio_piece';
  issuer?: string;
  date: string;
  description: string;
  visualType: 'code' | 'dashboard' | 'credentials' | 'process';
  metadata: { label: string; value: string }[];
  accentColor: string;
  // Detail content for the Modal Lightbox
  learnings: string[];
  skillsDemonstrated: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  role: string;
  subject: string;
  message: string;
  timestamp: string;
}
