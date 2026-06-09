import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Briefcase, Award, Filter, ArrowUp, ArrowDown,
  Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, BookOpen, Clock, Activity
} from 'lucide-react';

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  type: 'academic' | 'career' | 'certification';
  location?: string;
  description: string;
  details: string[];
  tags: string[];
  outcome?: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'ju-bsc',
    period: '2014 – 2019',
    title: 'BSc in Computing',
    institution: 'Jimma University',
    location: 'Ethiopia',
    type: 'academic',
    description: 'Built core qualitative and computational fundamentals. Coursework focused on system performance, networking architecture, and database concepts.',
    details: [
      'Studied foundational components of database schemas, indexing, SQL queries, and normalization levels.',
      'Gained deep familiarity with computer diagnostics, hardware architectures, and assembly procedures.',
      'Applied software lifecycle best practices from design to local diagnostic testing.'
    ],
    tags: ['Relational Database SQL', 'Networking Fundamentals', 'Algorithm Analytics', 'Computer Diagnostics'],
    outcome: 'First-Class Level Foundation'
  },
  {
    id: 'sa-contrib',
    period: 'Dec 2015',
    title: 'Standards Australia CE-006 Committee Contribution',
    institution: 'Expert Consultation Panel Representation',
    location: 'Remote / Australia Outreach',
    type: 'career',
    description: 'Volunteered technical analytical review and feedback for structural asphalt formulations, collaborating via the official national standards collaboration portal.',
    details: [
      'Participated in testing guidelines evaluation and draft refinements.',
      'Collaborated remotely with international construction and laboratory experts to assess compliance metrics.',
      'Synthesized standard references on materials resilience, proving strong document analytical capacity.'
    ],
    tags: ['Technical Governance', 'Quality Assurance', 'International Compliance', 'Standards Connect'],
    outcome: 'Official Consultation Input Registered'
  },
  {
    id: 'freelance-transition',
    period: '2019 – 2022',
    title: 'Transition & Market Preparation',
    institution: 'Professional Support & Freelance Design',
    location: 'Addis Ababa, Ethiopia',
    type: 'career',
    description: 'Worked on localized computer maintenance, IT consulting, and graphic design assignments while organizing upcoming academic applications.',
    details: [
      'Diagnosed and repaired over 50 client hardware units, improving system performance and security parameters.',
      'Designed and developed layout collateral for local small businesses, maintaining consistent styling structures.'
    ],
    tags: ['SysOps Diagnostics', 'Branding Layouts', 'Client Consultancy', 'Graphic Design'],
    outcome: 'Self-Employed Operational Launch'
  },
  {
    id: 'dera-admin',
    period: 'Jan 2022 – Jan 2024',
    title: 'Database Registration Officer',
    institution: 'Dera City Administration',
    location: 'Ethiopia',
    type: 'career',
    description: 'Spearheaded the practical migration of paper municipal registration files to new electronic forms, providing frontline software support for local civil servants.',
    details: [
      'Coordinated the registration and high-fidelity verification of over 10,000 resident records.',
      'Implemented robust real-time data cleansing routines that reduced database input inconsistencies by over 30%.',
      'Acted as a crucial hybrid translator, training non-technical administrative colleagues to navigate municipal schema platforms.'
    ],
    tags: ['E-Governance', 'Data Entry Verification', 'Process Design', 'Database Admin'],
    outcome: 'Eliminated manual transcription errors across municipal units'
  },
  {
    id: 'star-ngo',
    period: 'May 2022 – Sep 2025',
    title: 'IT Service Support Professional',
    institution: 'Star Development Organization',
    location: 'Ethiopia',
    type: 'career',
    description: 'Owned end-to-end technical support management for a regional NGO, overseeing hardware lifecycles, configuration rollouts, and field network security protocols.',
    details: [
      'Formulated a standardized software installation checklist that improved operational deployment speed for custom applications.',
      'Designed a unified knowledge-base ledger containing typical incidents and quick-resolve procedures, accelerating team onboarding.',
      'Administered regular, secure storage backups and routine patch evaluations across multi-user environments.'
    ],
    tags: ['Network Operations', 'Preventive Maintenance', 'Risk Mitigation', 'OS Provisioning'],
    outcome: 'Maintained 99.8% system up-time across complex multi-branch network connections'
  },
  {
    id: 'self-certs',
    period: '2025 – 2026',
    title: 'Intensive Self-Directed Certifications',
    institution: 'Microsoft Learn & Udacity/Accenture',
    location: 'Professional Education',
    type: 'certification',
    description: 'Earned tech credentials across advanced Power BI, Python modeling, Microsoft Fabric Data Lakehouses, and Gemini workspace integrations.',
    details: [
      'Understood deployment of SaaS semantic models directly connecting to a dynamic delta warehouse.',
      'Engineered structured system prompts to auto-generate responsive executive dashboard mockups.',
      'Mastered Pandas statistical plotting distributions inside Jupyter Notebooks.'
    ],
    tags: ['Power BI Copilot', 'Python Pandas', 'Microsoft Fabric Lakehouse', 'Gemini Office Integration'],
    outcome: 'Earned 6 Verified Technical Certifications'
  },
  {
    id: 'kaplan-pre',
    period: 'Sep 2026 – June 2027',
    title: 'Pre-Master’s in Law & Social Sciences',
    institution: 'Kaplan International College London',
    location: 'London, UK',
    type: 'academic',
    description: 'Rigorous academic preparation bridging technical expertise with social science perspectives, research methods, and critical legal writing.',
    details: [
      'Developed strong qualitative research frameworks targeting real-world digital policy implications.',
      'Bridged algorithmic understanding with legal research principles and international data governance policies.',
      'Perfected critical reading, argumentation structures, and systematic literature review methodologies.'
    ],
    tags: ['Qualitative Analysis', 'Academic Writing', 'Social Research Methods', 'Policy Review'],
    outcome: 'Pathways Prepared to Progressive MA at Westminster'
  },
  {
    id: 'westminster-ma',
    period: 'Sep 2027 onwards',
    title: 'MA AI, Data and Communication',
    institution: 'University of Westminster',
    location: 'London, UK',
    type: 'academic',
    description: 'Comprehensive postgraduate training analyzing AI ethics, algorithmic explainability, data governance, and public-interest technology communications.',
    details: [
      'Analyses the societal outcomes of automatic decision systems (ADS) and machine learning deployment.',
      'Designs frameworks for cross-functional stakeholder alignments between specialized engineers and policy makers.',
      'Researches communication paradigms that translate technical system variables into humane, transparent dialogue.'
    ],
    tags: ['AI Ethics', 'Algorithmic Explainability', 'Data Governance', 'Public Communication'],
    outcome: 'Postgraduate Synthesis & Professional Specialization'
  }
];

export default function ProfessionalTimeline() {
  const [filterType, setFilterType] = useState<'all' | 'academic' | 'career' | 'certification'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({
    'westminster-ma': true, // Keep the most advanced milestone expanded by default
    'kaplan-pre': true
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getFilteredAndSortedItems = () => {
    let items = [...TIMELINE_DATA];
    if (filterType !== 'all') {
      items = items.filter(item => item.type === filterType);
    }
    
    items.sort((a, b) => {
      // Find approximate sort ordering based on timeline dates
      // Easy approach: simple index sort representation
      const aIndex = TIMELINE_DATA.findIndex(t => t.id === a.id);
      const bIndex = TIMELINE_DATA.findIndex(t => t.id === b.id);
      return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
    });

    return items;
  };

  const currentItems = getFilteredAndSortedItems();

  // Highlight Stats calculations
  const totalAcademic = TIMELINE_DATA.filter(item => item.type === 'academic').length;
  const totalCareer = TIMELINE_DATA.filter(item => item.type === 'career').length;
  const totalCerts = TIMELINE_DATA.filter(item => item.type === 'certification').length;

  return (
    <div id="professional-timeline-section" className="space-y-12">
      {/* Description Header */}
      <section className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2563eb] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-[#2563eb]" /> Chronological Milestones
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Professional &amp; Academic Timeline
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
            Trace Bilal's complete technical progression and academic milestones. Use the filters to drill down into deep computer hardware frameworks, international NGO consultancies, digital municipal registrations, or Kaplan-Westminster pathways.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-none flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-[#2563eb]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-lg font-bold text-slate-900 font-mono lead-none">{totalAcademic}</span>
                <span className="block text-[9px] font-mono uppercase text-slate-400 font-bold tracking-wider">Academic Milestones</span>
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-none flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-lg font-bold text-slate-900 font-mono lead-none">{totalCareer}</span>
                <span className="block text-[9px] font-mono uppercase text-slate-400 font-bold tracking-wider">Career Roles</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-none flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-lg font-bold text-slate-900 font-mono lead-none">{totalCerts}</span>
                <span className="block text-[9px] font-mono uppercase text-slate-400 font-bold tracking-wider">Certifications Earned</span>
              </div>
            </div>
          </div>

          {/* Filters & Sorting Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5 text-[#2563eb]" /> Category:
              </span>
              {[
                { id: 'all', label: 'All Landmarks' },
                { id: 'academic', label: 'Academic' },
                { id: 'career', label: 'Career' },
                { id: 'certification', label: 'Certifications' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id as any)}
                  className={`px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider border cursor-pointer select-none transition-all duration-200
                    ${filterType === filter.id 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-500 border-slate-200 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 font-black uppercase tracking-wider">Sorting:</span>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-xs font-mono font-bold uppercase text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
              >
                {sortOrder === 'desc' ? (
                  <>
                    <ArrowDown className="w-3.5 h-3.5 text-[#2563eb]" /> Newest First
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-3.5 h-3.5 text-[#2563eb]" /> Oldest First
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Timeline Stream */}
      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-8 py-4">
        <AnimatePresence initial={false}>
          {currentItems.map((item, idx) => {
            const isExpanded = !!expandedItems[item.id];
            
            // Icon helper
            let IconComponent = Briefcase;
            let themeStyles = 'bg-emerald-50 border-emerald-200 text-emerald-600';
            if (item.type === 'academic') {
              IconComponent = GraduationCap;
              themeStyles = 'bg-blue-50 border-blue-200 text-[#2563eb]';
            } else if (item.type === 'certification') {
              IconComponent = Award;
              themeStyles = 'bg-purple-50 border-purple-200 text-purple-600';
            }

            return (
              <motion.div
                key={item.id}
                id={`timeline-${item.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Year Badge shown on the outer Left for Desktops */}
                <div className="hidden md:block absolute right-full mr-12 top-1.5 text-right w-24">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#2563eb] transition-colors block uppercase tracking-wide">
                    {item.period}
                  </span>
                  <span className="text-[9px] font-mono text-slate-300 font-bold uppercase tracking-wider block mt-0.5">
                    {item.type}
                  </span>
                </div>

                {/* Outer Timeline Indicator Node */}
                <div className={`absolute left-[-11px] top-1.5 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-120 group-hover:border-[#2563eb] ${
                  item.type === 'academic' ? 'border-[#2563eb]' : item.type === 'certification' ? 'border-purple-500' : 'border-emerald-650 border-emerald-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'academic' ? 'bg-[#2563eb]' : item.type === 'certification' ? 'bg-purple-600' : 'bg-emerald-600'
                  }`} />
                </div>

                {/* Interactivity Card Board */}
                <div className="bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 relative">
                  {/* Category Type Strip */}
                  <div className={`h-1.5 w-full ${
                    item.type === 'academic' ? 'bg-[#2563eb]' : item.type === 'certification' ? 'bg-purple-500' : 'bg-emerald-600'
                  }`} />

                  <div className="p-6 md:p-8 space-y-4">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div className="space-y-1">
                        {/* Mobile Year Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest md:hidden">
                          <Calendar className="w-3 h-3" /> {item.period}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors tracking-tight uppercase font-sans">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                          {item.institution}
                          {item.location && (
                            <span className="text-slate-300 flex items-center gap-0.5">
                              &bull; <MapPin className="w-3 h-3 inline" /> {item.location}
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Icon Indicator Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest border ${themeStyles}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                        {item.type}
                      </span>
                    </div>

                    {/* Brief context */}
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden space-y-4"
                        >
                          <div className="pt-4 border-t border-slate-100 space-y-4">
                            {/* Inner Details bullets */}
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#2563eb] font-bold">
                                Key Contributions &amp; Synthesized Insights
                              </h4>
                              <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4 leading-relaxed font-sans">
                                {item.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="text-xs">
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Verified Outcome Banner */}
                            {item.outcome && (
                              <div className="p-3 bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 flex items-center gap-2">
                                <span className="font-bold text-[#2563eb] uppercase tracking-wider">Registered Outcome:</span>
                                <span className="font-medium">{item.outcome}</span>
                              </div>
                            )}

                            {/* Dynamic Competency Badges */}
                            <div className="space-y-1.5">
                              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                                Demonstrated Competencies
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags.map((tag, tIdx) => (
                                  <span key={tIdx} className="text-[10px] text-slate-600 font-mono bg-slate-100 px-2.5 py-1 tracking-wide font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand/Collapse Trigger footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 font-medium uppercase">
                        {isExpanded ? 'Click to compress details' : 'Click to expand syllabus insights'}
                      </span>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono font-bold uppercase text-slate-700 cursor-pointer select-none transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            Compress <ChevronUp className="w-3.5 h-3.5 text-[#2563eb]" />
                          </>
                        ) : (
                          <>
                            Details <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Aesthetic Ending Marker */}
      <div className="flex items-center justify-center pt-4">
        <div className="text-center space-y-2">
          <div className="w-7 h-7 bg-slate-900 mx-auto text-white flex items-center justify-center font-serif text-sm font-bold">
            B
          </div>
          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] font-bold">
            End of Official Timeline Feed
          </span>
        </div>
      </div>
    </div>
  );
}
