import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Globe, Code, LineChart, FileText, Calendar, 
  User, CheckCircle, ArrowRight, X, Sparkles, Filter 
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'certification' | 'academic' | 'portfolio_piece'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  // Render a live stylized CSS/Vector preview for each visual type
  const renderVisualPreview = (item: GalleryItem) => {
    switch (item.visualType) {
      case 'code':
        return (
          <div className="w-full h-44 bg-[#14171e]/95 text-[#f8f6f0] p-4 rounded-xl font-mono text-[10px] select-none border border-[#e9e3d6]/10 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="space-y-1.5 opacity-85">
              <p className="text-gray-500 font-sans border-b border-gray-800 pb-1 flex justify-between">
                <span>{item.issuer || 'LocalCompiler'} terminal</span>
                <span>bash</span>
              </p>
              <p className="text-green-400"># Initializing exploration pipeline</p>
              <p><span className="text-pink-400">import</span> pandas <span className="text-pink-400">as</span> pd</p>
              <p><span className="text-pink-400">import</span> numpy <span className="text-pink-400">as</span> np</p>
              <p>df = pd.read_csv(<span className="text-amber-300">"municipal_records.csv"</span>)</p>
              <p>cleansed_df = df.dropna().drop_duplicates()</p>
              <p>cleansed_df.groupby(<span className="text-amber-300">"region"</span>).agg({"{"}<span className="text-amber-300">"records"</span>: <span className="text-amber-300">"count"</span>{"}"})</p>
            </div>
            <div className="bg-gray-800/50 p-1.5 rounded text-[9px] text-[#ffd542] text-center border border-gray-700/50 font-sans tracking-wide">
              {item.badge}
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-slate-900 to-indigo-950 p-4 rounded-xl text-[#f8f6f0] font-sans text-[10px] select-none border border-[#e9e3d6]/10 flex flex-col justify-between relative overflow-hidden">
            {/* Minimal power BI frame */}
            <div className="flex items-center justify-between border-b border-indigo-800/40 pb-1.5 text-indigo-200">
              <span className="font-semibold text-[9px] tracking-wider uppercase font-mono flex items-center gap-1">
                <LineChart className="w-3.5 h-3.5 text-[#f2c811]" />
                Power BI Integration
              </span>
              <span className="bg-indigo-500/20 px-1 py-0.5 rounded text-[8px]">Direct Lake</span>
            </div>

            {/* Dashboard blocks */}
            <div className="grid grid-cols-3 gap-2 my-2">
              <div className="bg-white/5 border border-white/10 rounded p-1.5 text-center">
                <span className="block text-[8px] opacity-70">Total Registers</span>
                <span className="text-xs font-bold font-mono text-[#f2c811]">10,480</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded p-1.5 text-center">
                <span className="block text-[8px] opacity-70">Data Integrity</span>
                <span className="text-xs font-bold font-mono text-emerald-400">99.8%</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded p-1.5 text-center">
                <span className="block text-[8px] opacity-70">Prompt Active</span>
                <span className="text-xs font-bold font-mono text-cyan-400">Copilot</span>
              </div>
            </div>

            {/* Simulated graph lines using simple styles */}
            <div className="flex items-end gap-1.5 h-10 px-1 bg-white/5 rounded border border-white/5">
              <div className="w-full bg-[#f2c811] rounded-t" style={{ height: '35%' }} />
              <div className="w-full bg-emerald-500 rounded-t" style={{ height: '70%' }} />
              <div className="w-full bg-[#f2c811] rounded-t" style={{ height: '55%' }} />
              <div className="w-full bg-indigo-400 rounded-t" style={{ height: '88%' }} />
              <div className="w-full bg-sky-400 rounded-t" style={{ height: '65%' }} />
              <div className="w-full bg-emerald-500 rounded-t" style={{ height: '95%' }} />
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="w-full h-44 bg-[#fcfbfa] border border-[#e9e3d6] rounded-xl p-4 font-mono text-[9px] text-[#4b5563] select-none flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-purple-500/5 rounded-full blur-xl" />
            <div className="text-center font-bold text-indigo-900 border-b border-[#e9e3d6] pb-1 font-serif">
              ANALYTICS PIPELINE TOPOLOGY
            </div>

            <div className="flex items-center justify-between my-2 relative">
              {/* Connector line behind */}
              <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-dashed border-b border-indigo-200 -translate-y-1/2 z-0" />
              
              <div className="bg-[#f0f0eb] border border-[#c97b3f]/30 px-1 py-1 rounded relative z-10 text-center w-[60px] text-[8px]">
                <span className="font-bold text-amber-800">OneLake</span>
                <span className="block text-[6px] opacity-80">Bronze Files</span>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 px-1 py-1 rounded relative z-10 text-center w-[60px] text-[8px]">
                <span className="font-bold text-indigo-700">Spark ETL</span>
                <span className="block text-[6px] opacity-80">Silver Delta</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 px-1 py-1 rounded relative z-10 text-center w-[60px] text-[8px]">
                <span className="font-bold text-emerald-800">Gold semantic</span>
                <span className="block text-[6px] opacity-80">Power BI DL</span>
              </div>
            </div>

            <div className="bg-indigo-900 text-white p-1 rounded text-center text-[8px] font-sans font-medium uppercase tracking-wider">
              {item.badge}
            </div>
          </div>
        );

      case 'credentials':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-[#faf8f3] to-[#ebdcb9]/40 border-2 border-[#d9c493] p-4 rounded-xl text-ink-dark font-serif text-[10px] select-none flex flex-col justify-between relative shadow-2xs">
            {/* Filigree frame */}
            <div className="absolute inset-1 border border-[#ebdcc4] rounded-lg pointer-events-none" />
            <div className="text-center font-serif tracking-tight pt-1">
              <span className="block uppercase text-[8px] tracking-widest text-[#9c7123] font-bold">Official Registry</span>
              <p className="font-bold text-ink-dark mt-0.5 text-xs">JIMMA UNIVERSITY</p>
              <p className="text-[7px] italic text-[#5c6370]">Est. 1952 · Addis Ababa Authority</p>
            </div>

            <div className="text-center border-y border-[#d9c493]/60 py-1.5 my-1">
              <span className="font-sans block text-[7px] uppercase tracking-wider text-ink-muted">Degree Conferred</span>
              <span className="font-serif font-bold text-emerald-deep tracking-normal block text-[11px]">BSc in Computing</span>
            </div>

            <div className="flex justify-between items-end text-[6px] font-mono text-ink-muted px-2">
              <span>Date: August 2019</span>
              <span>Verify ID: JU-628-BM</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-44 bg-[#f8f6f0] rounded-xl flex items-center justify-center border border-[#e9e3d6]">
            <Award className="w-8 h-8 text-emerald-deep" />
          </div>
        );
    }
  };

  return (
    <div id="gallery-section" className="space-y-12">
      {/* Description & Filter Header */}
      <section className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2563eb] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" /> Interactive Gallery
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Credentials, Certificates &amp; Technical Artifacts
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
            This module provides a deep-dive interactive log of my verified academic diplomas, Microsoft professional learn certifications, and technical structural pipelines. Click any item to explore specific syllabus details and registered data science competencies.
          </p>

          {/* Category Filter buttons */}
          <div className="flex flex-wrap gap-2 pt-4 items-center">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#2563eb]" /> Filters:
            </span>
            {[
              { id: 'all', label: 'All Artifacts' },
              { id: 'certification', label: 'Microsoft / Udacity Certs' },
              { id: 'academic', label: 'Academic Diplomas' },
            ].map(filter => (
              <button
                key={filter.id}
                id={`filter-${filter.id}`}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-3.5 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider border cursor-pointer select-none transition-all duration-200
                  ${activeFilter === filter.id 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-500 border-slate-200 hover:text-slate-950 hover:bg-slate-50'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of items */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => {
          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="bg-white border border-slate-200 rounded-none p-6 shadow-2xs hover:shadow-md hover:border-[#2563eb] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Visual interactive preview panel */}
                {renderVisualPreview(item)}

                {/* Text details */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider">
                      {item.issuer || 'Verification Available'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action trigger label */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#2563eb] bg-blue-50 px-2 py-1">
                  {item.category.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-slate-500 group-hover:text-[#2563eb] flex items-center gap-1 transition-colors uppercase tracking-wider">
                  Explore Syllabus
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Lightbox details modal panel */}
      <AnimatePresence>
        {selectedItem && (
          <div 
            id="lightbox-backdrop"
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-none max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col relative"
            >
              {/* Modal close icon */}
              <button
                id="close-lightbox-btn"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-500 hover:text-slate-950 hover:bg-slate-200 cursor-pointer transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content Panel */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-[#2563eb] text-[9px] font-mono font-bold uppercase tracking-widest">
                    {selectedItem.badge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-sans font-bold text-slate-900 mt-2 tracking-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    Issuer: <span className="font-bold text-slate-900">{selectedItem.issuer || 'Academic Register'}</span> &bull; Verified in {selectedItem.date}
                  </p>
                </div>

                {/* Preview layout duplicated in light size */}
                <div className="border border-slate-200 rounded-none overflow-hidden shadow-2xs">
                  {renderVisualPreview(selectedItem)}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-200 pb-2">
                    Metadata Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedItem.metadata.map((meta, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-none">
                        <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          {meta.label}
                        </span>
                        <span className="block text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                          {meta.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50 border border-slate-200 p-5 rounded-none">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#2563eb] font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Syllabus Insights &amp; Concepts Synthesized
                  </h4>
                  <ul className="text-xs md:text-sm text-slate-600 space-y-2.5 list-disc pl-4 leading-relaxed font-sans">
                    {selectedItem.learnings.map((learning, idx) => (
                      <li key={idx}>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                    Demonstrated Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.skillsDemonstrated.map((skill, idx) => (
                      <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-850 px-2.5 py-1 text-slate-800 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close footer trigger */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center rounded-none">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                  VERIFIED DIRECT SOURCE REGISTRY
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-slate-900 text-white hover:bg-slate-950 text-xs font-bold px-4 py-2 uppercase tracking-wide rounded-none cursor-pointer transition-all"
                >
                  Done Exploring
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
