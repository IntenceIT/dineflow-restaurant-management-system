import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_ACCOUNTS, ROLE_ROUTES, getRoleFromPath } from '../data/credentials';

interface AuthContextType {
  user: User | null;
  currentPath: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigate: (path: string) => void;
  login: (
    role: UserRole,
    email: string,
    password: string,
    rememberMe: boolean
  ) => { success: boolean; error?: string };
  logout: () => void;
}

const STORAGE_KEY = 'dineflow_user_session';
const REMEMBER_KEY = 'dineflow_remember_email';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return p && p !== '/' ? p : '/login';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Enforce Protected Routes & Role Authorization
  useEffect(() => {
    if (!user) {
      if (currentPath !== '/login') {
        navigate('/login');
      }
      return;
    }

    // User is logged in:
    if (currentPath === '/login' || currentPath === '/') {
      navigate(ROLE_ROUTES[user.role]);
      return;
    }

    const pathRole = getRoleFromPath(currentPath);
    if (pathRole && pathRole !== user.role) {
      // Prevent unauthorized cross-role access and redirect to permitted dashboard
      navigate(ROLE_ROUTES[user.role]);
    }
  }, [user, currentPath]);

  const login = (
    role: UserRole,
    email: string,
    password: string,
    rememberMe: boolean
  ): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Find account by email (regardless of role first to detect role mismatch)
    const matchingAccount = DEMO_ACCOUNTS.find(
      (acc) => acc.user.email.toLowerCase() === cleanEmail
    );

    if (!matchingAccount) {
      return { success: false, error: 'Invalid login credentials.' };
    }

    // Check password
    if (matchingAccount.password !== cleanPassword) {
      return { success: false, error: 'Invalid login credentials.' };
    }

    // If password matches, check if selected role matches account role
    if (matchingAccount.user.role !== role) {
      return { success: false, error: 'Please select the correct account type.' };
    }

    // Valid credentials and correct role
    setUser(matchingAccount.user);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matchingAccount.user));
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, cleanEmail);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }
    } catch {
      // storage errors ignored safely
    }

    navigate(ROLE_ROUTES[matchingAccount.user.role]);
    return { success: true };
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentPath,
        activeTab,
        setActiveTab,
        navigate,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
