import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_NAVIGATION } from '../../data/navigation';
import { NavIcon } from './NavIcon';

export const MobileBottomNav: React.FC = () => {
  const { user, activeTab, setActiveTab } = useAuth();

  if (!user) return null;

  const items = ROLE_NAVIGATION[user.role] || [];
  // Take the first 4 most relevant items for mobile bottom bar
  const mobileItems = items.slice(0, 4);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-slate-200/80 bg-white/95 px-2 backdrop-blur-md lg:hidden">
      {mobileItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveTab(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-1 flex-col items-center justify-center py-1 transition-all ${
              isActive
                ? 'text-violet-600 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                isActive ? 'bg-violet-100 text-violet-700' : ''
              }`}
            >
              <NavIcon name={item.iconName} className="h-4 w-4" />
            </div>
            <span className="text-[10px] tracking-tight truncate max-w-[70px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
