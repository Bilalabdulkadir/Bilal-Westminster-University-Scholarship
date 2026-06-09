import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, CheckCircle, AlertCircle, Inbox, Trash2
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Academic Recruiter',
    subject: '',
    message: ''
  });

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Load existing messages on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bilal_portfolio_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not parse localStorage messages", e);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core client validations
    if (!formData.name.trim()) return setErrorMessage('Please state your name.');
    if (!formData.email.trim()) return setErrorMessage('Please state your business email address.');
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) return setErrorMessage('Please provide a valid formatting email.');
    if (!formData.subject.trim()) return setErrorMessage('Please supply a subject header.');
    if (!formData.message.trim()) return setErrorMessage('Your message content cannot be blank.');

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('bilal_portfolio_messages', JSON.stringify(updated));

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      role: 'Academic Recruiter',
      subject: '',
      message: ''
    });

    // Reset success banner after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('bilal_portfolio_messages', JSON.stringify(updated));
  };

  return (
    <div id="contact-section" className="space-y-12 max-w-4xl mx-auto">
      {/* Intro info box */}
      <section className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm text-center sm:text-left">
        <h2 className="text-2xl font-sans font-bold text-slate-900">
          Coordinate Academic Collaboration
        </h2>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed mt-2 font-sans">
          Whether you represent Kaplan International, the University of Westminster admissions panel, or a prospective academic cohort member, direct your messages here. Your submissions will be processed and logged directly within the secure viewport cache.
        </p>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Quick Contact info sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200 p-5 space-y-4 shadow-2xs">
            <h3 className="font-sans font-bold text-slate-900 text-xs border-b border-slate-200 pb-2.5 uppercase tracking-widest">
              Contact Channels
            </h3>
            
            <div className="space-y-4 text-xs md:text-sm">
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Location</span>
                <span className="font-semibold text-slate-900 font-sans">Addis Ababa, Ethiopia</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Direct Email</span>
                <a href="mailto:Bilalabdulkadir286@gmail.com" className="font-semibold text-[#2563eb] hover:underline font-mono">
                  Bilalabdulkadir286@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Phone</span>
                <span className="font-semibold text-slate-900 font-mono">+251 94 132 2989</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">LinkedIn</span>
                <span className="font-semibold text-slate-700 block truncate font-mono">linkedin.com/in/bilalabdulkadir</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-none text-xs space-y-2.5">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#2563eb] block">
              Ethical Statement
            </span>
            <p className="text-slate-600 leading-relaxed text-justify">
              I commit fully to strict data governance, treating any inquiries with high confidence and professional compliance. Let’s align on postgraduate research.
            </p>
          </div>
        </div>

        {/* The Actionable Form Panel */}
        <div className="md:col-span-2 bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Feedback states */}
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-blue-50 border border-blue-200 text-[#2563eb] text-xs rounded-none flex items-center gap-2 font-mono"
              >
                <CheckCircle className="w-4 h-4 shrink-0 text-[#2563eb]" />
                <span>Message submitted into local cache successfully! Explore the sandbox log below.</span>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-none flex items-center gap-2 font-mono"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.55">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Jane Smith"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-sans"
                />
              </div>

              {/* Email address */}
              <div className="space-y-1.55">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. j.smith@kaplan.com"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recruiter Role selection */}
              <div className="space-y-1.55">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Identify Your Category
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 px-2 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] cursor-pointer font-sans"
                >
                  <option value="Academic Recruiter">Admissions Panel Member</option>
                  <option value="Kaplan London Faculty">Kaplan London Representative</option>
                  <option value="University of Westminster Team">Westminster Admissions rep</option>
                  <option value="Academic Cohort Peer">Potential Peer classmate</option>
                  <option value="Other Industry Liaison">Compliance Standard Contact</option>
                </select>
              </div>

              {/* Message Subject */}
              <div className="space-y-1.55">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Subject Topic
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Academic Syllabus Review"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-sans"
                />
              </div>
            </div>

            {/* MESSAGE CONTAINER */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Collate Message Body
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Inscribe details of proposed research pathways, syllabus compliance guidelines, or feedback templates here..."
                className="w-full bg-slate-50 border border-slate-200 p-3.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] resize-none font-sans leading-relaxed"
              />
            </div>

            <button
              type="submit"
              id="submit-contact-form"
              className="w-full bg-slate-900 hover:bg-[#2563eb] text-white text-xs font-bold font-mono py-3.5 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-widest shadow-xs"
            >
              Dispense Message File
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* Recruiter Inbox Simulator sandbox panel */}
      <section className="bg-slate-100 border border-slate-200 rounded-none p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-slate-900">
            <Inbox className="w-5 h-5 text-slate-900" />
            <h3 className="font-sans font-bold text-base md:text-lg uppercase tracking-wider">
              Recipient Inbox Simulation Log (DEX Admin Hub)
            </h3>
          </div>
          <span className="font-mono text-[9px] text-[#2563eb] bg-blue-100/60 border border-blue-200 px-2 py-0.5 font-bold uppercase tracking-wider">
            Client-Side Cache Only
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Verify form serialization in real-time. Any submissions sent via the layout form above appear instantly inside this local log module. It preserves submission metrics locally inside your individual session sandbox.
        </p>

        {messages.length === 0 ? (
          <div className="border border-dashed border-slate-300 rounded-none p-8 text-center text-slate-400">
            <Inbox className="w-8 h-8 mx-auto opacity-40 mb-2" />
            <span className="text-xs font-mono uppercase tracking-wider">Simulated Inbox is empty. Submit a contact form sequence above.</span>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
            {messages.map((m) => (
              <div 
                key={m.id}
                className="bg-white border border-slate-200 p-5 rounded-none flex items-start gap-4 justify-between"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-1.5 py-0.5 bg-[#2563eb]/10 text-[#2563eb] text-[9px] font-mono font-bold uppercase leading-none tracking-wider">
                      {m.role}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono leading-none font-semibold uppercase tracking-wider">
                      Sent at {m.timestamp}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
                    {m.subject}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify whitespace-pre-wrap">
                    {m.message}
                  </p>
                  <p className="text-[10px] font-mono text-[#2563eb] leading-none mt-2 font-semibold uppercase tracking-wider">
                    From: <span className="font-bold text-slate-900">{m.name}</span> ({m.email})
                  </p>
                </div>
                <button
                  id={`delete-msg-${m.id}`}
                  onClick={() => deleteMessage(m.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-none cursor-pointer transition-colors shrink-0"
                  title="Delete message node"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
