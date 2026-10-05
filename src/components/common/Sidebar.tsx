import React from 'react';
import { UtensilsCrossed, LogOut, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_NAVIGATION } from '../../data/navigation';
import { NavIcon } from './NavIcon';
import { RoleBadge } from './Badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout, activeTab, setActiveTab } = useAuth();

  if (!user) return null;

  const navItems = ROLE_NAVIGATION[user.role] || [];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white text-slate-800">
      {/* Brand & Restaurant header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-800 to-purple-700 bg-clip-text text-transparent">
                  DineFlow
                </span>
                <span className="inline-flex items-center rounded-full bg-violet-100 px-1.5 py-0.2 text-[10px] font-bold text-violet-700">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">
                Restaurant Management System
              </p>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Restaurant name context if present */}
        {user.restaurantName && (
          <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 p-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-violet-500">
                  Outlet
                </span>
                <p className="text-xs font-bold text-slate-800 truncate">
                  {user.restaurantName}
                </p>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-3 pb-1 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </span>
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-violet-600 text-white shadow-sm shadow-purple-300/40 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <NavIcon
                  name={item.iconName}
                  className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-violet-50 text-violet-700 border border-violet-200/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom User profile card & Logout */}
      <div className="border-t border-slate-200/80 p-3 space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/60 p-2.5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white text-xs font-bold shadow-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user.name}
              </p>
              <div className="mt-0.5">
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-2xs"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-200/80 lg:bg-white z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl transition-transform animate-in slide-in-from-left duration-200 z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
