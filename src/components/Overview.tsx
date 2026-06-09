import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Cpu, Settings, MessageSquare, MapPin, Mail, 
  Phone, Linkedin, Github, Award, GraduationCap, 
  CheckCircle, ArrowRight, ExternalLink, Twitter, Globe, X
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, WORK_PROJECTS, EDUCATION_TIMELINE } from '../data';
import { useAuth } from '../context/AuthContext';

// Map icon names to components safely
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Database: Database,
  Cpu: Cpu,
  Settings: Settings,
  MessageSquare: MessageSquare
};

export default function Overview({ onNavigateToContact, onNavigateToGallery }: { onNavigateToContact: () => void, onNavigateToGallery: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { user, socials, updateSocials } = useAuth();

  // Social Links Form State
  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [linkedinInput, setLinkedinInput] = useState('');
  const [githubInput, setGithubInput] = useState('');
  const [twitterInput, setTwitterInput] = useState('');
  const [otherInput, setOtherInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sync inputs dynamically when socials fetch updates
  useEffect(() => {
    if (socials) {
      setLinkedinInput(socials.linkedin || '');
      setGithubInput(socials.github || '');
      setTwitterInput(socials.twitter || '');
      setOtherInput(socials.other || '');
    } else {
      setLinkedinInput(PERSONAL_INFO.linkedin);
      setGithubInput(PERSONAL_INFO.github);
      setTwitterInput(PERSONAL_INFO.twitter);
      setOtherInput(PERSONAL_INFO.instagram);
    }
  }, [socials]);

  const handleSaveSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSocials({
        linkedin: linkedinInput,
        github: githubInput,
        twitter: twitterInput,
        other: otherInput
      });
      setIsEditingSocials(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const activeLinkedin = socials?.linkedin || PERSONAL_INFO.linkedin;
  const activeGithub = socials?.github || PERSONAL_INFO.github;
  const activeTwitter = socials?.twitter || PERSONAL_INFO.twitter;
  const activeOther = socials?.other || PERSONAL_INFO.instagram;
  
  const stats = [
    { value: '4+', label: 'Years Support & Data Experience', detail: 'Dera Municipal & Star NGO' },
    { value: '6', label: 'AI & Data Science Certificates', detail: 'All Earned in 2026' },
    { value: '2', label: 'Major Industry Sectors Covered', detail: 'Public Governance / Dev NGOs' },
    { value: '1', label: 'Continuous Progressive Vision', detail: 'Kaplan → Westminster' }
  ];  return (
    <div id="overview-section" className="space-y-16">
      {/* 1. Hero / Profile Header Block */}
      <section className="relative overflow-hidden bg-white border border-slate-200 p-8 md:p-10 shadow-sm">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-slate-150 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start gap-8">
          {/* Avatar / Monogram */}
          <div className="flex-shrink-0 w-24 h-24 bg-slate-900 flex flex-col items-center justify-center text-white shadow-xs border border-slate-200">
            <span className="font-serif text-4xl font-bold tracking-tighter">BM</span>
            <span className="text-[9px] font-mono tracking-widest uppercase opacity-80 mt-1">Ethiopia</span>
          </div>

          {/* Profile details */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="inline-flex items-center bg-[#2563eb]/10 px-2.5 py-0.5 text-xs font-semibold text-[#2563eb] ring-1 ring-inset ring-[#2563eb]/25 uppercase tracking-wider">
                  Available for Cohort 2026
                </span>
              </div>
              <p className="text-base md:text-lg font-mono font-semibold text-[#2563eb] uppercase tracking-wider mt-1">
                {PERSONAL_INFO.title} &amp; {PERSONAL_INFO.subTitle}
              </p>
              <p className="font-mono text-xs text-slate-500 mt-2 flex items-center gap-1.5 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#2563eb]" />
                {PERSONAL_INFO.pathway}
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
              {PERSONAL_INFO.quickBio}
            </p>

            {/* Quick action badges & links */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 pt-4 border-t border-slate-100 text-xs font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-4 h-4 text-[#2563eb]" />
                {PERSONAL_INFO.location}
              </span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 text-slate-600 hover:text-[#2563eb] transition-colors">
                <Mail className="w-4 h-4 text-[#2563eb]" />
                {PERSONAL_INFO.email}
              </a>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Phone className="w-4 h-4 text-slate-900" />
                {PERSONAL_INFO.phone}
              </span>
              <a href={activeGithub.startsWith('http') ? activeGithub : `https://${activeGithub}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-[#2563eb] transition-colors">
                <Github className="w-4 h-4 text-slate-900" />
                GitHub
              </a>
              <a href={activeLinkedin.startsWith('http') ? activeLinkedin : `https://${activeLinkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-[#2563eb] transition-colors">
                <Linkedin className="w-4 h-4 text-slate-900" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-white border border-slate-200 p-5 shadow-xs hover:border-[#2563eb] transition-colors group"
          >
            <div className="font-sans text-3xl md:text-4xl text-slate-900 font-bold leading-none mb-1.5 group-hover:text-[#2563eb] transition-colors">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm font-semibold text-slate-800 leading-snug">
              {stat.label}
            </div>
            <div className="font-mono text-[9px] md:text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
              {stat.detail}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Prominent Verification Social Directory & Personal Linkages */}
      <section className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-2xl font-sans font-bold text-slate-900">
              Verified Social Networks & Links
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
              Prominently displayed channels for academic evaluation and digital alignment checks
            </p>
          </div>
          {/* Edit Button if logged in */}
          {user ? (
            <button
              onClick={() => setIsEditingSocials(true)}
              className="bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-mono font-bold uppercase tracking-widest px-4 py-2.5 rounded-none cursor-pointer border-none transition-all shadow-xs"
            >
              Configure Links
            </button>
          ) : (
            <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-50 border border-slate-200 px-3 py-1.5 font-bold tracking-wider">
              Sign In to customize links
            </span>
          )}
        </div>

        {/* Display Links Prominently */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'LinkedIn Directory', value: activeLinkedin, icon: Linkedin },
            { label: 'GitHub Repositories', value: activeGithub, icon: Github },
            { label: 'Twitter / X Feed', value: activeTwitter, icon: Twitter },
            { label: 'Other Active Channel', value: activeOther, icon: Globe }
          ].map((soc, idx) => {
            const Icon = soc.icon;
            const hasUrl = !!soc.value && soc.value !== 'Not Configured' && soc.value.trim() !== '';
            const cleanUrl = hasUrl ? (soc.value.startsWith('http') ? soc.value : `https://${soc.value}`) : null;
            return (
              <a
                key={idx}
                href={cleanUrl || undefined}
                target={cleanUrl ? "_blank" : undefined}
                rel="noreferrer"
                className={`p-5 border border-slate-200 bg-slate-50/20 flex flex-col justify-between hover:border-[#2563eb] hover:bg-slate-50/50 transition-all duration-200 group rounded-none ${!cleanUrl ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-slate-900 text-white group-hover:bg-[#2563eb] transition-all duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    {cleanUrl && <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-[#2563eb] transition-all duration-200" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[9px] font-bold font-mono uppercase tracking-widest text-slate-400">
                      {soc.label}
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-900 truncate">
                      {soc.value || 'Not Configured'}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Social Links Editing Modal Dialog */}
      <AnimatePresence>
        {isEditingSocials && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setIsEditingSocials(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 max-w-md w-full shadow-2xl relative flex flex-col p-6 md:p-8 rounded-none"
            >
              <button
                onClick={() => setIsEditingSocials(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 leading-tight">
                  Configure Social Connections
                </h3>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest mt-0.5 uppercase">
                  Alter your prominent portfolio directories
                </p>
              </div>

              <form onSubmit={handleSaveSocials} className="space-y-4">
                {/* LinkedIn field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
                    LinkedIn URL/Handle
                  </label>
                  <input
                    type="text"
                    value={linkedinInput}
                    onChange={(e) => setLinkedinInput(e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                  />
                </div>

                {/* GitHub field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
                    GitHub URL/Handle
                  </label>
                  <input
                    type="text"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    placeholder="github.com/username"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                  />
                </div>

                {/* Twitter field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
                    Twitter / X URL/Handle
                  </label>
                  <input
                    type="text"
                    value={twitterInput}
                    onChange={(e) => setTwitterInput(e.target.value)}
                    placeholder="twitter.com/username"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                  />
                </div>

                {/* Other field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
                    Other Portfolio/Channel Link
                  </label>
                  <input
                    type="text"
                    value={otherInput}
                    onChange={(e) => setOtherInput(e.target.value)}
                    placeholder="e.g. medium.com/@username"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                  />
                </div>

                {/* Actions */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-slate-900 hover:bg-[#2563eb] text-white text-xs font-bold font-mono py-3 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-widest shadow-xs"
                >
                  {isSaving ? 'Deploying Changes...' : 'Save Social Channels'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Interactive Skills Matrix */}
      <section className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-2xl font-sans font-bold text-slate-900">
              Skills Matrix &amp; Proficiency
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
              Validating self-learning benchmarks against operational NGO and municipal workflows
            </p>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1 border border-slate-200">
            {['All', ...SKILL_CATEGORIES.map(c => c.title)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-2xs' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.split(' ')[0]} {/* shortened labels for mobile */}
              </button>
            ))}
          </div>
        </div>

        {/* Display Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {SKILL_CATEGORIES.filter(cat => activeCategory === 'All' || cat.title === activeCategory).map((category, catIdx) => {
            const IconComponent = iconMap[category.icon] || Cpu;
            return (
              <div key={catIdx} className="space-y-4 p-5 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                  <div className="p-1.5 bg-slate-900 text-white">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 tracking-wider font-mono uppercase">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-900">{skill.name}</span>
                        <span className="font-mono text-slate-500 text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 font-bold uppercase">
                          {skill.label}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/85 h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: skillIdx * 0.1 }}
                          className="h-full bg-linear-to-r from-slate-900 to-[#2563eb]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Select Career Projects & Milestones */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-sans font-bold text-slate-900 flex items-center gap-2">
            Professional Work Highlights
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
            Proven contributions in public operations, database integrity, and NGO hardware management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {WORK_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 p-6 shadow-xs hover:translate-y-[-2px] hover:shadow-sm transition-all duration-300 relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#2563eb] font-bold uppercase bg-[#2563eb]/10 px-2.5 py-1">
                      {project.timeline}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight mt-2.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-tight font-sans font-semibold mt-1">
                      {project.subtitle} · <span className="italic font-medium">{project.sector}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="inline-flex items-center bg-slate-100 px-2 py-1 text-[11px] font-mono font-bold text-slate-500 ring-1 ring-inset ring-slate-200 uppercase tracking-widest">
                      Verifiable
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="font-mono text-[9px] px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 uppercase font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <p className="text-xs md:text-sm font-semibold text-slate-900 italic">
                    &ldquo;{project.outcome}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {project.context}
                  </p>
                  <ul className="text-xs text-slate-800 space-y-1.5 list-disc pl-4 font-sans leading-relaxed">
                    {project.bullets.map((b, idx) => (
                      <li key={idx} className="leading-normal text-slate-600">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center text-xs">
                <div className="font-mono text-[10px] text-slate-400">
                  ID: {project.id}
                </div>
                <button
                  onClick={onNavigateToGallery}
                  className="text-slate-900 hover:text-[#2563eb] font-bold font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  View Related Artifacts
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Career & Educational Timeline / Roadmap */}
      <section className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-sans font-bold text-slate-900">
            Journey of Academic &amp; Career Evolution
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
            Establishing a formal academic bridge from technical computing foundations to advanced communication governance
          </p>
        </div>

        {/* Timeline track */}
        <div className="relative border-l-2 border-dashed border-slate-200 pl-6 md:pl-8 ml-2 space-y-10">
          {EDUCATION_TIMELINE.map((item, idx) => {
            const isKaplanWestminster = item.title.includes("Kaplan") || item.title.includes("Postgrad") || item.title.includes("Westminster");
            const isCertifications = item.title.includes("Certifications");
            
            return (
              <div key={idx} className="relative group">
                {/* Visual marker dot */}
                <div className={`absolute -left-10 md:-left-12 top-1 w-5 h-5 bg-white border-4 transition-all duration-300
                  ${isKaplanWestminster 
                    ? 'border-[#2563eb] scale-110 ring-4 ring-blue-50' 
                    : isCertifications 
                      ? 'border-slate-800 scale-105 ring-4 ring-slate-100' 
                      : 'border-slate-300 group-hover:border-slate-800'
                  }`} 
                />

                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 items-start">
                  <div className="font-mono text-xs md:text-sm font-bold text-[#2563eb] uppercase tracking-wider leading-none">
                    {item.period}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      {item.title}
                      {isKaplanWestminster && (
                        <span className="inline-flex items-center bg-blue-100 px-2 py-0.5 text-[9px] font-mono font-bold text-[#2563eb] uppercase tracking-wider">
                          Academic Goal
                        </span>
                      )}
                    </h4>
                    <p className="font-sans text-xs font-semibold text-slate-500 mt-0.5 leading-none uppercase tracking-wider">
                      {item.institution}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2.5 max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Call to Action block */}
      <section className="bg-slate-900 text-white p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-slate-800">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-xl md:text-2xl font-sans font-bold uppercase tracking-wider text-white">
            Let's discuss academic alignment
          </h3>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            I am preparing for Kaplan Pre-Master's classes with goal progression to MA program, seeking cohort peer contact and academic references.
          </p>
        </div>
        <button
          onClick={onNavigateToContact}
          className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold font-mono uppercase tracking-widest px-6 py-4 transition-all hover:shadow-md cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center flex items-center gap-2"
        >
          Contact Bilal Directly
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </section>
    </div>
  );
}
