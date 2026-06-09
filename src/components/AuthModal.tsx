import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Lock, UserPlus, LogIn, Key, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signUp, logIn, resetPassword, errorMsg } = useAuth();
  const [activeMode, setActiveMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMsg(null);

    if (!email) {
      setLocalError('Please fill in your email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (activeMode === 'login') {
        if (!password) {
          setLocalError('Please enter your password.');
          setIsSubmitting(false);
          return;
        }
        await logIn(email, password);
        setSuccessMsg('Successfully logged in!');
        setTimeout(() => {
          onClose();
        }, 1200);
      } else if (activeMode === 'signup') {
        if (password.length < 6) {
          setLocalError('Password must be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }
        if (password !== confirmPassword) {
          setLocalError('Passwords do not match.');
          setIsSubmitting(false);
          return;
        }
        await signUp(email, password);
        setSuccessMsg('Account created successfully! Welcome to your portfolio dashboard.');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (activeMode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg('Instructional password recovery link has been sent to ' + email);
      }
    } catch (err: any) {
      let friendlyError = err.message;
      if (err.code === 'auth/invalid-credential') {
        friendlyError = 'Invalid email or password combination.';
      } else if (err.code === 'auth/email-already-in-use') {
        friendlyError = 'That email is already registered.';
      } else if (err.code === 'auth/weak-password') {
        friendlyError = 'The password must be stronger (at least 6 characters).';
      }
      setLocalError(friendlyError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 max-w-md w-full shadow-2xl relative flex flex-col p-6 md:p-8 rounded-none"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-500 hover:text-slate-950 hover:bg-slate-200 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand visual header */}
        <div className="text-center pb-4 mb-4 border-b border-slate-100">
          <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center mx-auto mb-2 text-md font-serif font-bold">
            BM
          </div>
          <h3 className="text-lg font-sans font-bold uppercase tracking-wider text-slate-900 leading-tight">
            {activeMode === 'login' && 'Portfolio Authentication'}
            {activeMode === 'signup' && 'Register Profile Cohort'}
            {activeMode === 'forgot' && 'Reset Access Credentials'}
          </h3>
          <p className="text-xs text-slate-400 font-mono tracking-widest mt-0.5 uppercase">
            {activeMode === 'login' && 'Sign in to edit your social networks'}
            {activeMode === 'signup' && 'Create your security profile'}
            {activeMode === 'forgot' && 'Reset verification coordinates'}
          </p>
        </div>

        {/* Modes selectors */}
        <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 border border-slate-200 mb-6">
          <button
            onClick={() => {
              setActiveMode('login');
              setLocalError(null);
              setSuccessMsg(null);
            }}
            className={`py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === 'login' 
                ? 'bg-slate-900 text-white shadow-2xs' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveMode('signup');
              setLocalError(null);
              setSuccessMsg(null);
            }}
            className={`py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMode === 'signup' 
                ? 'bg-slate-900 text-white shadow-2xs' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status logs */}
          {localError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-mono leading-relaxed">
              {localError}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-[#2563eb] text-xs font-mono leading-relaxed">
              {successMsg}
            </div>
          )}

          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
              Business Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@domain.com"
                required
                className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
              />
              <Mail className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Password field - skip if in reset mode */}
          {activeMode !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
                  Access Code (Password)
                </label>
                {activeMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode('forgot');
                      setLocalError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[10px] font-mono text-[#2563eb] uppercase tracking-wider font-semibold hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required={activeMode !== 'forgot'}
                  className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                />
                <Lock className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          )}

          {/* Confirm Password field for Sign Up */}
          {activeMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-slate-400 block font-bold tracking-widest">
                Re-enter Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat code"
                  required
                  className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2.5 text-xs outline-none focus:bg-white focus:border-[#2563eb] font-mono"
                />
                <Lock className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          )}

          {/* Submit action button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-[#2563eb] text-white text-xs font-bold font-mono py-3.5 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-widest shadow-xs disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                {activeMode === 'login' && <span>Inscribe Credentials</span>}
                {activeMode === 'signup' && <span>Deploy Profile</span>}
                {activeMode === 'forgot' && <span>Dispense Recovery Link</span>}
              </>
            )}
          </button>
        </form>

        {activeMode === 'forgot' && (
          <button
            onClick={() => {
              setActiveMode('login');
              setLocalError(null);
              setSuccessMsg(null);
            }}
            className="mt-4 text-xs font-mono text-center text-slate-500 hover:text-slate-900 uppercase tracking-wider block font-bold underline cursor-pointer bg-transparent border-none"
          >
            Return to Login
          </button>
        )}
      </motion.div>
    </div>
  );
}
