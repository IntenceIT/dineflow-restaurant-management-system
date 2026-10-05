import React from 'react';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PlaceholderViewProps {
  moduleName: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ moduleName }) => {
  const { setActiveTab, user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 sm:p-16 text-center shadow-xs">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 shadow-xs mb-4">
        <Clock className="h-7 w-7" />
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/70 px-3 py-1 text-xs font-semibold text-violet-800 mb-2">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Module Planned</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
        {moduleName} Module
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500 leading-relaxed">
        The <span className="font-semibold text-slate-700">{moduleName}</span> feature for{' '}
        <span className="font-medium text-violet-700">{user?.role}</span> is part of the next phase. Core role-based dashboards and authentication are live.
      </p>
      <button
        type="button"
        onClick={() => setActiveTab('dashboard')}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-purple-300/40 hover:bg-violet-700 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};
