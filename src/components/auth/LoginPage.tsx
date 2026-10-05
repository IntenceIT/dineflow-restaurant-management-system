import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Store,
  UserCheck,
  CreditCard,
  Flame,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { UserRole } from '../../types';
import { ROLE_LIST, DEMO_ACCOUNTS } from '../../data/credentials';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('Super Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for saved email in localStorage
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('dineflow_remember_email');
      if (savedEmail) {
        setEmail(savedEmail);
        const matchingAcc = DEMO_ACCOUNTS.find(
          (a) => a.user.email.toLowerCase() === savedEmail.toLowerCase()
        );
        if (matchingAcc) {
          setSelectedRole(matchingAcc.user.role);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
  };

  const handleQuickFill = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setSelectedRole(acc.user.role);
    setEmail(acc.user.email);
    setPassword(acc.password);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Invalid login credentials.');
      return;
    }

    setIsLoading(true);

    // Simulate realistic micro-interaction latency
    setTimeout(() => {
      const result = login(selectedRole, email, password, rememberMe);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Invalid login credentials.');
      }
    }, 350);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Super Admin':
        return <ShieldCheck className="h-4 w-4" />;
      case 'Restaurant Owner':
        return <Store className="h-4 w-4" />;
      case 'Manager':
        return <UserCheck className="h-4 w-4" />;
      case 'Cashier':
        return <CreditCard className="h-4 w-4" />;
      case 'Kitchen Staff':
        return <Flame className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#f8fafc] overflow-hidden">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft violet radial glows */}
        <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-violet-200/50 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-200/40 blur-3xl animate-pulse-glow" />
        <div className="absolute top-[40%] left-[60%] h-[350px] w-[350px] rounded-full bg-indigo-100/60 blur-3xl animate-pulse-glow" />

        {/* Floating Subtle Culinary & Geometric Silhouettes */}
        <div className="absolute top-16 left-[10%] text-violet-300/40 transform -rotate-12 animate-float-slow">
          <UtensilsCrossed className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 left-[12%] text-purple-300/35 transform rotate-45 hidden md:block animate-float-slow" style={{ animationDelay: '2s' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <div className="absolute top-24 right-[12%] text-violet-300/35 transform rotate-12 hidden sm:block animate-float-slow" style={{ animationDelay: '4s' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2v20M18 2v20M6 12h12" />
          </svg>
        </div>
        <div className="absolute bottom-24 right-[10%] text-indigo-300/35 transform -rotate-6 animate-float-slow" style={{ animationDelay: '1.5s' }}>
          <Store className="h-10 w-10" />
        </div>
      </div>

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Top Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200/80 mb-3 transform hover:scale-105 transition-transform duration-300">
            <UtensilsCrossed className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            DineFlow
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Restaurant Management System
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-xl shadow-slate-200/60 backdrop-blur-md">
          {/* Quick Demo Credentials Assistant */}
          <div className="mb-6 rounded-2xl bg-violet-50/70 border border-violet-100 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-800">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                Demo Credentials (Click to Autofill)
              </span>
              <span className="text-[10px] text-violet-600 font-medium">
                Dev Preview
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.user.id}
                  type="button"
                  onClick={() => handleQuickFill(acc)}
                  className={`flex flex-col text-left px-2.5 py-1.5 rounded-lg border text-[11px] transition-all ${
                    selectedRole === acc.user.role && email === acc.user.email
                      ? 'bg-violet-600 text-white border-violet-700 shadow-2xs font-semibold'
                      : 'bg-white hover:bg-violet-100/60 text-slate-700 border-slate-200/70'
                  }`}
                >
                  <span className="truncate">{acc.user.name}</span>
                  <span
                    className={`text-[9px] truncate ${
                      selectedRole === acc.user.role && email === acc.user.email
                        ? 'text-violet-200'
                        : 'text-slate-400'
                    }`}
                  >
                    {acc.user.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROLE_LIST.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-purple-200'
                          : 'bg-slate-50/80 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className={isSelected ? 'text-white' : 'text-violet-600'}>
                        {getRoleIcon(role)}
                      </span>
                      <span className="truncate">{role}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div
                className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs font-semibold text-rose-700 animate-in fade-in duration-200"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email / Login ID Field */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Email / Login ID
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="e.g. yasir@gmail.com"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-violet-500/15 transition-all"
                />
              </div>
            </div>

            {/* Password Field + Show/Hide Button */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Enter your password"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-violet-500/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-600 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer accent-violet-600"
                />
                <span>Remember Me</span>
              </label>

              <span className="text-[11px] text-slate-400 font-medium">
                Encrypted Session
              </span>
            </div>

            {/* LOGIN Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-3 px-4 text-sm font-bold text-white shadow-md shadow-purple-300/40 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-3 focus:ring-violet-500/20 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info (Simple, clean, commercial look) */}
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>© 2026 DineFlow Technologies Inc. All rights reserved.</p>
          <p className="mt-1 text-[11px]">
            Enterprise Restaurant Operating Platform
          </p>
        </div>
      </div>
    </div>
  );
};
