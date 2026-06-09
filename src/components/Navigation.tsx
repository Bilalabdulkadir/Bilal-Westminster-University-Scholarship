import React from 'react';
import { Mail, Calendar, BookOpen, Layers, LogIn, LogOut, User, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onDownloadPack?: () => void;
  onOpenAuth: () => void;
}

export default function Navigation({ activeTab, setActiveTab, onDownloadPack, onOpenAuth }: NavigationProps) {
  const { user, logOut } = useAuth();
  
  const tabs = [
    { id: 'overview', name: 'Overview', icon: Layers },
    { id: 'statement', name: 'Statement', icon: BookOpen },
    { id: 'gallery', name: 'Gallery View', icon: Calendar },
    { id: 'timeline', name: 'Timeline', icon: Clock },
    { id: 'contact', name: 'Contact Form', icon: Mail },
  ];

  const handleAuthAction = () => {
    if (user) {
      logOut();
    } else {
      onOpenAuth();
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 md:py-5 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-white font-serif text-lg font-bold">
              BM
            </div>
            <div>
              <span className="font-sans font-semibold text-slate-900 text-lg tracking-tight block leading-tight">
                Bilal Abdulkadir Muhammed
              </span>
              <span className="font-mono text-[10px] text-[#2563eb] font-semibold tracking-widest uppercase block mt-0.5">
                MA Applicant Portfolio
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            {/* Short badge or mobile auth button */}
            <button
              onClick={handleAuthAction}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-none transition-all cursor-pointer
                ${user 
                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700' 
                  : 'bg-blue-50 text-[#2563eb] border-blue-200 hover:bg-blue-100 hover:text-blue-700'
                }`}
            >
              {user ? <LogOut className="w-3" /> : <LogIn className="w-3" />}
              {user ? 'Exit' : 'Auth'}
            </button>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-200 outline-none cursor-pointer select-none whitespace-nowrap
                  ${isActive 
                    ? 'text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5' 
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Call to action (Kaplan -> Westminster) */}
        <div className="hidden md:flex items-center gap-3">
          {/* User Session Info */}
          {user && (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 font-mono text-[11px] font-medium text-slate-600">
              <User className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="truncate max-w-[120px] font-bold uppercase">{user.email?.split('@')[0]}</span>
            </div>
          )}

          <button
            onClick={handleAuthAction}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-widest border transition-all duration-200 cursor-pointer shadow-xs
              ${user
                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'
                : 'bg-blue-50 text-[#2563eb] border-blue-200 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb]'
              }`}
          >
            {user ? <LogOut className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
            {user ? 'Log Out' : 'Sign In'}
          </button>

          {onDownloadPack && (
            <button
              id="download-pack-btn"
              onClick={onDownloadPack}
              className="bg-slate-900 hover:bg-[#2563eb] text-white text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-none cursor-pointer transition-all duration-200 shadow-xs"
            >
              📄 Application Pack
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
