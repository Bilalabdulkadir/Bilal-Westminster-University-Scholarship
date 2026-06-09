import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, ChevronRight, CornerDownRight, Landmark, 
  HelpCircle, Calendar, GraduationCap, CheckSquare, Search, AlertCircle 
} from 'lucide-react';

export default function PersonalStatement() {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const statementSections = [
    {
      id: 'why',
      title: 'Why this Programme?',
      paragraphs: [
        'The rapid advancement of artificial intelligence is transforming how societies create, analyse, and communicate information. While studying Mathematics and Data Science and exploring practical applications of AI and cloud technologies, I realised that technical excellence alone is not enough.',
        'Data has value only when it can be interpreted, communicated, and applied responsibly. This understanding has inspired me to pursue the AI, Data and Communication MA at the University of Westminster through the foundational Pre-Master’s pathway at Kaplan.'
      ]
    },
    {
      id: 'academic',
      title: 'Academic Foundation',
      paragraphs: [
        'My undergraduate education in Mathematics and Computing provided me with a strong analytical and quantitative foundation. Through my studies at Jimma University, I developed skills in statistical analysis, machine learning foundations, data visualisation, and computational problem-solving.',
        'Alongside my formal education, I have expanded my knowledge through independent learning and practical certifications, mastering Python Pandas pipelines, advanced Power BI metrics, and Microsoft Fabric Direct Lake architectures.'
      ]
    },
    {
      id: 'vision',
      title: 'Professional Vision (Africa’s Digital Future)',
      paragraphs: [
        'Ethiopia and Greater East Africa are undergoing significant digital transformation, creating unprecedented opportunities for AI-driven innovation across agriculture, healthcare, e-governance, and public services.',
        'After completing my MSc / MA studies, I intend to return to Addis Ababa and contribute to this progress by supporting the responsible, ethical adoption of artificial intelligence and designing robust, inclusive technology communication policy templates.'
      ]
    },
    {
      id: 'contribution',
      title: 'What I Will Contribute to the Cohort',
      paragraphs: [
        'I bring curiosity, resilience, and a commitment to continuous learning. My portfolio showcases raw operational experience in NGO and municipal databanks.',
        'As an Ethiopian student, I will contribute unique perspectives on low-connectivity AI challenges, multilingual database schemas, and inclusive digital governance in developing economies.'
      ]
    }
  ];

  const travelGaps = [
    {
      period: 'Study Gap 1: July 2019 – January 2022',
      reason: 'Transition & localized freelance technical assignments in Dera.',
      explanation: 'Following graduation with my BSc in Computing, I prioritized contributing localized practical IT diagnostics support and graphic design tasks. This period validated my adaptive problem-solving skills in high-pressure public environments before I transitioned to stable municipal service contracts.'
    },
    {
      period: 'Study Gap 2: September 2025 – Present',
      reason: 'Academic visa preparation, portfolio engineering, and advanced certifications.',
      explanation: 'Dedicated entirely to elevating my analytics stack from basic support level to enterprise master level. Successfully finalized five advanced Microsoft Learn pathways and the premium Udacity Accenture Gemini pipeline to align with Westminster MA technical expectations.'
    }
  ];

  // Helper to highlight search keywords
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) 
            ? <mark key={i} className="bg-[#ffd542]/50 text-ink-dark rounded-xs px-0.5">{part}</mark> 
            : part
        )}
      </>
    );
  };

  return (
    <div id="statement-section" className="space-y-16">
      {/* Editorial paper sheet frame */}
      <section className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* Navigation Sidebar inside document */}
        <div className="lg:w-64 bg-slate-50 p-6 space-y-6 flex-shrink-0">
          <div className="space-y-1">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Document Sections
            </h3>
            <p className="text-[11px] text-slate-500 font-medium font-sans">Click to filter specific essays</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveSection('all')}
              className={`w-full text-left px-3 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer
                ${activeSection === 'all' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
            >
              <span>Full Dossier</span>
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            {statementSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider flex items-start gap-1 transition-all cursor-pointer
                  ${activeSection === sec.id 
                    ? 'bg-blue-50 text-[#2563eb] font-bold border-l-2 border-[#2563eb]' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/20'
                  }`}
              >
                <CornerDownRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#2563eb]" />
                <span className="line-clamp-1">{sec.title}</span>
              </button>
            ))}
          </div>

          {/* Search bar inside document */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="text-[11px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
              Filter Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Python, AI..."
                className="w-full bg-white border border-slate-200 rounded-none pl-3 pr-8 py-2 text-xs outline-none focus:border-[#2563eb] placeholder-slate-400 font-mono"
              />
              <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* The Text Column */}
        <div className="flex-1 p-8 md:p-12 space-y-8 font-sans">
          <div className="border-b border-slate-200 pb-6 space-y-2 tracking-tight">
            <div className="text-xs font-mono text-[#2563eb] uppercase font-bold tracking-widest">
              Kaplan &bull; Westminster Admissions Submission
            </div>
            <h1 className="font-serif italic text-3xl md:text-4xl text-slate-900 leading-tight font-semibold">
              Academic Personal Statement
            </h1>
            <p className="font-mono text-xs text-slate-400 uppercase leading-none tracking-wider mt-1">
              Candidate: Bilal Abdulkadir Muhammed &bull; Intake target: September 2026
            </p>
          </div>

          {/* Statement paragraphs list */}
          <div className="space-y-10">
            {statementSections
              .filter(sec => activeSection === 'all' || sec.id === activeSection)
              .map(sec => (
                <div key={sec.id} className="space-y-3">
                  <h3 className="font-sans text-xs font-bold text-slate-900 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#2563eb]" />
                    {sec.title}
                  </h3>
                  <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed text-justify font-sans">
                    {sec.paragraphs.map((p, idx) => (
                      <p key={idx}>
                        {highlightText(p, searchTerm)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Institutional note */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#2563eb] shrink-0" />
            <span>Targeting the Westminster Media School, Department of Journalism and Mass Communication.</span>
          </div>
        </div>
      </section>

      {/* 2. Gaps Accordions Section */}
      <section className="bg-white border border-slate-200 rounded-none p-8 md:p-10 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-sans font-bold text-slate-900">
            Registry Disclosures &amp; Study Gaps
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
            Official explanations addressing study timelines for the Kaplan admissions panel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelGaps.map((gap, idx) => (
            <div key={idx} className="border border-slate-200 rounded-none p-6 bg-slate-50 hover:bg-white hover:border-[#2563eb] transition-all">
              <span className="font-mono text-[10px] text-[#2563eb] font-bold uppercase block mb-1 tracking-wider">
                {gap.period}
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight uppercase font-sans tracking-wide">
                {gap.reason}
              </h4>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed text-justify font-sans">
                {gap.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. IELTS Standard Plan */}
      <section className="bg-white border border-slate-200 rounded-none p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-[#2563eb] font-mono text-xs font-bold uppercase tracking-widest">
            <AlertCircle className="w-4 h-4 text-[#2563eb]" /> IELTS Academic Readiness Dossier
          </div>
          <h3 className="text-xl md:text-2xl font-sans font-bold text-slate-900">
            Mandatory Goal: IELTS for UKVI Target 5.5
          </h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
            I am registered to sit my upcoming Academic IELTS for UKVI test. My systematic learning strategy prioritizes the transition from current overall benchmarks to Kaplan Admission compliance scores.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-none">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Listening</span>
              <span className="block text-md font-bold text-slate-900 mt-1 font-mono">5.5 Target</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-none">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Reading</span>
              <span className="block text-md font-bold text-slate-900 mt-1 font-mono">5.5 Target</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-none">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Writing</span>
              <span className="block text-md font-bold text-slate-900 mt-1 font-mono">5.5 Target</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-none">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Speaking</span>
              <span className="block text-md font-bold text-slate-900 mt-1 font-mono">5.5 Target</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-none shrink-0 w-full md:w-64 space-y-3.5">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#2563eb] block">
            Practice Routine
          </span>
          <ul className="text-[11px] text-slate-600 space-y-3 list-none pl-0">
            <li className="flex items-start gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
              <span>Syllabus focus: Cambridge IELTS prep guides volume 18.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
              <span>Active mock exams scheduled on bi-weekly Saturdays.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
              <span>Participating in conversational groups in Addis Ababa.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
