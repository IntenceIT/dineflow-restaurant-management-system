import React from 'react';
import { Menu, Bell, LogOut, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from './Badge';

interface HeaderProps {
  onToggleSidebar: () => void;
  pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, pageTitle }) => {
  const { user, logout, activeTab } = useAuth();

  const formattedTabTitle =
    activeTab === 'dashboard'
      ? pageTitle
      : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side: Hamburger (mobile) & Title breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile branding */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-purple-600 text-white shadow-xs">
            <UtensilsCrossed className="h-4 w-4" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">DineFlow</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-500">DineFlow</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <h1 className="font-bold text-slate-900 text-base">{formattedTabTitle}</h1>
        </div>
      </div>

      {/* Right side: User information, role badge, notifications & logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Role badge */}
        {user && (
          <div className="hidden sm:block">
            <RoleBadge role={user.role} />
          </div>
        )}

        {/* Notifications button */}
        <div className="relative">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 transition-all"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-600 ring-2 ring-white" />
          </button>
        </div>

        {/* User profile capsule */}
        {user && (
          <div className="flex items-center gap-2.5 pl-1 sm:pl-2 border-l border-slate-200/80">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-purple-500 text-white font-semibold text-sm shadow-xs ring-2 ring-violet-100">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user.name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {user.email}
              </span>
            </div>
          </div>
        )}

        {/* Quick logout */}
        <button
          type="button"
          onClick={logout}
          className="flex h-9 items-center gap-1.5 px-2.5 sm:px-3 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 border border-transparent transition-all text-xs font-medium"
          title="Sign out of DineFlow"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
