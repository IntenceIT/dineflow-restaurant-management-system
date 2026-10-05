import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { useAuth } from '../../context/AuthContext';
import { PlaceholderView } from './PlaceholderView';

interface DashboardLayoutProps {
  pageTitle: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  pageTitle,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeTab } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* Sidebar for Desktop & Mobile drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column offset by desktop sidebar */}
      <div className="flex flex-1 flex-col lg:pl-64 min-w-0">
        <Header
          pageTitle={pageTitle}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {activeTab === 'dashboard' ? (
            children
          ) : (
            <PlaceholderView moduleName={activeTab} />
          )}
        </main>

        {/* Mobile bottom navigation bar */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
