import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, X, GraduationCap, 
  MapPin, Clock, CheckCircle, ExternalLink, Mail, Phone, Contact,
  QrCode, Linkedin, Github, Twitter, Instagram, Link2
} from 'lucide-react';
import Navigation from './components/Navigation';
import Overview from './components/Overview';
import GalleryView from './components/GalleryView';
import PersonalStatement from './components/PersonalStatement';
import ContactForm from './components/ContactForm';
import AuthModal from './components/AuthModal';
import ProfessionalTimeline from './components/ProfessionalTimeline';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { socials } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPackModal, setShowPackModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [qrType, setQrType] = useState<'vcard' | 'linkedin' | 'github' | 'twitter' | 'instagram'>('vcard');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const dossierRef = useRef<HTMLDivElement>(null);

  // Quick navigation helpers cross-talking across modular borders
  const handleNavigateToContact = () => {
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToGallery = () => {
    setActiveTab('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Real client-side high-quality PDF generator using html2canvas & jspdf
  const handlePrintDossier = async () => {
    if (!dossierRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const element = dossierRef.current;
      
      // Let's render the detailed outline container to canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Double resolution for ultra-sharp vectors and clear text rendering
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#f8fafc', // Pristine off-white backdrop matching our dossier styling
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const imgWidth = 210; // A4 Standard width in mm
      const pageHeight = 295; // A4 height offset limits
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add primary cover/first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      // Ensure proper multipage pagination division spacing
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save('bilal_muhammed_academic_dossier.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to legacy printer view if canvas fails due to browser container sandboxing limits
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const activeLinkedin = socials?.linkedin || 'linkedin.com/in/bilalabdulkadir';
  const activeGithub = socials?.github || 'github.com/Bilalabdulkadir';
  const activeTwitter = socials?.twitter || 'x.com/imrbil27';
  const activeInstagram = socials?.other || 'instagram.com/bilal.tech27?igsh=emlvdmpweGY3eW1p';

  const getAbsoluteUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `https://${path}`;
  };

  const vcardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Bilal Abdulkadir Muhammed',
    'N:Muhammed;Bilal;Abdulkadir;;',
    'ORG:Star Development Organization / Dera City Administration',
    'TITLE:IT Operations & Support Professional',
    'EMAIL;TYPE=PREF,INTERNET:Bilalabdulkadir286@gmail.com',
    'TEL;TYPE=CELL,VOICE:+251941322989',
    'ADR;TYPE=HOME,PREF:;;Addis Ababa;;;Ethiopia',
    'NOTE:IT operations and data management professional with 4+ years of experience across technical support and database administration.',
    'URL:https://github.com/bilalmuhammed',
    'END:VCARD'
  ].join('\r\n');

  const getQrValue = () => {
    switch (qrType) {
      case 'linkedin':
        return getAbsoluteUrl(activeLinkedin);
      case 'github':
        return getAbsoluteUrl(activeGithub);
      case 'twitter':
        return getAbsoluteUrl(activeTwitter);
      case 'instagram':
        return getAbsoluteUrl(activeInstagram);
      case 'vcard':
      default:
        return vcardData;
    }
  };

  // Triggers modern local browser download of standard vCard contact format
  const handleDownloadVCard = () => {
    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bilal_muhammed.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-[#2563eb]/15 text-slate-900">
      
      {/* 1. Global Navigation Bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onDownloadPack={() => setShowPackModal(true)} 
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-10 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'overview' && (
              <Overview 
                onNavigateToContact={handleNavigateToContact} 
                onNavigateToGallery={handleNavigateToGallery} 
              />
            )}
            
            {activeTab === 'statement' && (
              <PersonalStatement />
            )}
            
            {activeTab === 'gallery' && (
              <GalleryView />
            )}
            
            {activeTab === 'timeline' && (
              <ProfessionalTimeline />
            )}
            
            {activeTab === 'contact' && (
              <ContactForm />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Professional Polish Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-8 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white text-xs font-serif font-black">
                B
              </div>
              <span className="font-sans font-semibold text-slate-900 text-sm uppercase tracking-wider">
                Bilal Muhammed Portfolio
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs text-justify">
              Structured to support Pre-Master's and MA applications for Westminster Media, Arts and Design. Rooted in real public service databases and NGO networks.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
              Admissions Framework
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>Pathway: Law &amp; Social Sciences</li>
              <li>College: Kaplan International London</li>
              <li>Progression University: Westminster</li>
              <li>Term: September 2026 Intake</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs md:text-right">
            <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
              Contact &amp; Support
            </h4>
            <p className="text-slate-900 font-semibold leading-none">Addis Ababa, Ethiopia</p>
            <p className="text-[#2563eb] leading-tight font-mono text-[11px] block mt-1">
              Bilalabdulkadir286@gmail.com
            </p>
            <p className="text-slate-400 text-[10px] font-mono mt-1">
              &copy; 2026 Bilal Abdulkadir Muhammed &bull; All Rights Confirmed
            </p>
          </div>
        </div>
      </footer>

      {/* 4. Beautiful Simulated PDF Dossier Modal Panel */}
      <AnimatePresence>
        {showPackModal && (
          <div 
            id="pdf-pack-modal" 
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowPackModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-none max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col"
            >
              <button
                id="close-pdf-modal"
                onClick={() => setShowPackModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#2563eb] font-semibold uppercase tracking-widest">
                      Dossier Portfolio Package
                    </span>
                    <h3 className="font-serif italic text-2xl font-semibold text-slate-800 tracking-tight leading-none mt-1">
                      Kaplan Admissions Pack
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center self-start sm:self-auto">
                    <button
                      id="download-vcard-btn"
                      onClick={handleDownloadVCard}
                      className="bg-white border border-slate-300 hover:border-[#2563eb] text-slate-700 hover:text-[#2563eb] font-mono text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-none flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-103"
                      title="Download Bilal's professional contact card to your address book"
                    >
                      <Contact className="w-3.5 h-3.5 text-[#2563eb]" />
                      Save Contact (vCard)
                    </button>

                    <button
                      id="print-dossier-btn"
                      disabled={isGeneratingPdf}
                      onClick={handlePrintDossier}
                      className={`${isGeneratingPdf ? 'bg-slate-600 opacity-85 cursor-not-allowed' : 'bg-slate-900 hover:bg-[#2563eb] cursor-pointer'} text-white font-mono text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-none flex items-center gap-1.5 transition-transform hover:scale-103`}
                    >
                      <Download className={`w-3.5 h-3.5 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                      {isGeneratingPdf ? 'Generating PDF...' : 'Print / Save as PDF'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  This simulated document viewer brings together Bilal's entire resume, credentials dossier, and travel gap justifications, optimized for immediate printing to A4 PDF format from your native browser engine.
                </p>

                {/* Aesthetic Interactive QR Code Scan Center (Screen Only) */}
                <div className="bg-slate-50 border border-slate-200 p-5 md:p-6 space-y-4 print:hidden">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#2563eb]" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                      Portfolio QR Code Generator Hub
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal font-sans">
                    Generate an instant contact card or profile shortcut. Select a destination link or contact type below, then scan the displayed QR code with your mobile camera.
                  </p>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Selectors and details */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                        {[
                          { id: 'vcard', label: 'Save Contact (vCard)', icon: Contact, desc: 'Scans directly to add Bilal to address book' },
                          { id: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, desc: 'Opens Bilal‘s official LinkedIn profile' },
                          { id: 'github', label: 'GitHub Repository', icon: Github, desc: 'Opens Bilal‘s technical repository' },
                          { id: 'twitter', label: 'Twitter / X', icon: Twitter, desc: 'Opens Bilal‘s professional Twitter feed' },
                          { id: 'instagram', label: 'Instagram', icon: Instagram, desc: 'Opens Bilal‘s Instagram channel' },
                        ].map((btn) => {
                          const IconComp = btn.icon;
                          const isActive = qrType === btn.id;
                          return (
                            <button
                              key={btn.id}
                              onClick={() => setQrType(btn.id as any)}
                              className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2.5 border cursor-pointer select-none transition-all duration-200 
                                ${isActive 
                                  ? 'bg-slate-900 border-slate-900 text-white' 
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                }`}
                            >
                              <IconComp className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                              <div className="min-w-0">
                                <span className="block text-[11px] font-bold uppercase tracking-wider font-mono truncate leading-none">
                                  {btn.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Display current selected data path */}
                      <div className="p-3 bg-white border border-slate-200/80 rounded-none space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                          Current QR Payload Destination:
                        </span>
                        <div className="text-[10px] font-mono text-slate-600 break-all select-all leading-tight bg-slate-50 p-2 border border-slate-100 max-h-[80px] overflow-y-auto">
                          {qrType === 'vcard' ? 'Standard vCard 3.0 Profile Data Structure' : getAbsoluteUrl(qrType === 'linkedin' ? activeLinkedin : qrType === 'github' ? activeGithub : qrType === 'twitter' ? activeTwitter : activeInstagram)}
                        </div>
                      </div>
                    </div>

                    {/* QR Code Graphic Frame */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-white border border-slate-200 text-center w-[180px] sm:w-[220px] shadow-xs">
                      <div className="relative p-2 bg-white border border-slate-100">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(getQrValue())}`}
                          alt="Dynamic QR Code"
                          className="w-36 h-36 md:w-40 md:h-40 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="block text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-3.5 animate-pulse">
                        &bull; Live Scannable Code &bull;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Print layout blueprint preview structure */}
                <div ref={dossierRef} className="border border-slate-200 p-6 rounded-none bg-slate-50 font-sans space-y-8 select-all">
                  <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="space-y-1 flex-1">
                      <h4 className="text-xl font-bold font-sans text-slate-900">Bilal Abdulkadir Muhammed</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mt-1">
                        Addis Ababa, Ethiopia &bull; Bilalabdulkadir286@gmail.com &bull; +251 94 132 2989
                      </p>
                      <p className="text-[11px] text-[#2563eb] font-mono font-semibold uppercase mt-1">
                        Target Program: Kaplan Pre-Master's (progression to Westminster MA AI, Data &amp; Comm)
                      </p>
                    </div>

                    {/* Integrated Resume vCard QR code (Shows on screen AND on print!) */}
                    <div className="flex-shrink-0 flex items-center gap-3 p-3 bg-white border border-slate-200 text-left rounded-none shadow-2xs max-w-xs">
                      <div className="relative p-0.5 bg-white border border-slate-100">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(vcardData)}`} 
                          alt="vCard QR Code"
                          className="w-16 h-16 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-0.5 max-w-[130px]">
                        <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400 font-bold leading-none">
                          Scan to Save
                        </span>
                        <span className="block text-[9.5px] font-black uppercase text-[#2563eb] leading-tight font-sans">
                          Contact Card
                        </span>
                        <span className="block text-[7.5px] font-mono text-slate-500 leading-tight">
                          Connects directly to Bilal's mobile vCard
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resume Body */}
                  <div className="space-y-5">
                    <div className="space-y-1 border-b border-slate-200 pb-1">
                      <h5 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest">
                        Professional Summary
                      </h5>
                      <p className="text-xs text-justify leading-relaxed text-slate-600">
                        IT operations and data management professional with 4+ years of experience across technical support, database administration, and digital transformation in the public and development sectors. Self-trained in the modern data analytics stack — Python, Power BI, Microsoft Fabric, and Copilot — seeking formal training to consolidate self-learning into a rigorous postgraduate qualification.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1">
                        Professional Contributions
                      </h5>
                      
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between items-baseline font-semibold text-slate-900">
                          <span>IT Service Support &bull; Star Development Organization</span>
                          <span className="font-mono text-[10px]">May 2022 – September 2025</span>
                        </div>
                        <ul className="list-disc pl-4 text-slate-600 text-[11px] space-y-1">
                          <li>Headed network maintenance, system updates and software installations for a development NGO, minimizing unplanned operational downtime.</li>
                          <li>Troubleshot diagnostic hardware/software, configured OS environments, and designed integrated knowledge-base guides for fast team troubleshooting.</li>
                        </ul>
                      </div>

                      <div className="text-xs space-y-1 pt-3 border-t border-slate-200">
                        <div className="flex justify-between items-baseline font-semibold text-slate-900">
                          <span>Database Registration Officer &bull; Dera City Administration</span>
                          <span className="font-mono text-[10px]">January 2022 – January 2024</span>
                        </div>
                        <ul className="list-disc pl-4 text-slate-600 text-[11px] space-y-1">
                          <li>Coordinated registration of resilient resident credentials, completing accurate entries with strong data quality validations.</li>
                          <li>Coordinated rollout of new electronic forms, reducing database input inconsistencies.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1">
                        Education &amp; Credentials
                      </h5>
                      <div className="flex justify-between items-baseline text-xs font-semibold text-slate-900">
                        <span>BSc in Computing</span>
                        <span className="font-mono text-[10px]">August 2019</span>
                      </div>
                      <p className="text-xs text-slate-600 italic leading-none">
                        Jimma University, Ethiopia &bull; Completed core database design, network protocols, and computing systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-[#cbd5e1] flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  A4 PRINT OUTLINE TEMPLATE
                </span>
                <button
                  onClick={() => setShowPackModal(false)}
                  className="bg-slate-900 hover:bg-[#2563eb] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
