import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface UserSocials {
  id: string;
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
  other: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  socials: UserSocials | null;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateSocials: (data: Partial<UserSocials>) => Promise<void>;
  errorMsg: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [socials, setSocials] = useState<UserSocials | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch or initialize social links for this user
  const fetchUserSocials = async (currentUser: User) => {
    const docRef = doc(db, 'users', currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSocials(docSnap.data() as UserSocials);
      } else {
        // Initialize new user with empty or default placeholders
        const initialSocials: UserSocials = {
          id: currentUser.uid,
          email: currentUser.email || '',
          linkedin: '',
          github: '',
          twitter: '',
          other: '',
        };
        await setDoc(docRef, {
          ...initialSocials,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setSocials(initialSocials);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setErrorMsg(null);
      if (currentUser) {
        await fetchUserSocials(currentUser);
      } else {
        setSocials(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    setErrorMsg(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign up');
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    setErrorMsg(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to log in');
      throw err;
    }
  };

  const logOut = async () => {
    setErrorMsg(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to log out');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    setErrorMsg(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send reset email');
      throw err;
    }
  };

  const updateSocials = async (data: Partial<UserSocials>) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      // Update local state cleanly
      setSocials((prev) => prev ? { ...prev, ...data } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      socials,
      signUp,
      logIn,
      logOut,
      resetPassword,
      updateSocials,
      errorMsg
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
