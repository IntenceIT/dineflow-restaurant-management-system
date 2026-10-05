import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../common/DashboardLayout';
import { StatCard } from '../common/StatCard';
import {
  Building2,
  CheckCircle2,
  Clock3,
  Users2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const recentRestaurants = [
    {
      id: 'rest-1',
      name: 'Royal Burger House',
      owner: 'Restaurant Owner',
      plan: 'Enterprise',
      status: 'Active',
      tables: 24,
      joined: 'Today, 10:14 AM',
    },
    {
      id: 'rest-2',
      name: 'Saffron Spice Kitchen',
      owner: 'Tariq Al-Mansoor',
      plan: 'Pro Plan',
      status: 'Active',
      tables: 36,
      joined: 'Yesterday',
    },
    {
      id: 'rest-3',
      name: 'Bella Italia Trattoria',
      owner: 'Marco Rossi',
      plan: '14-Day Trial',
      status: 'Trial',
      tables: 18,
      joined: '2 days ago',
    },
    {
      id: 'rest-4',
      name: 'Sushi Zen & Grill',
      owner: 'Kenji Sato',
      plan: 'Pro Plan',
      status: 'Active',
      tables: 30,
      joined: '3 days ago',
    },
  ];

  const systemActivities = [
    {
      id: 'act-1',
      title: 'New restaurant onboarding',
      desc: 'Royal Burger House activated subscription',
      time: '12m ago',
      type: 'success',
    },
    {
      id: 'act-2',
      title: 'License renewed',
      desc: 'Saffron Spice Kitchen renewed annual plan',
      time: '1h ago',
      type: 'info',
    },
    {
      id: 'act-3',
      title: 'Trial registration',
      desc: 'Bella Italia started 14-day cloud trial',
      time: '3h ago',
      type: 'warning',
    },
    {
      id: 'act-4',
      title: 'System health check',
      desc: 'All regional server nodes operating at 99.98% uptime',
      time: '5h ago',
      type: 'info',
    },
  ];

  return (
    <DashboardLayout pageTitle="Super Admin Dashboard">
      {/* Clean compact header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Welcome, {user?.name || 'Administrator'} • DineFlow System Overview
          </p>
        </div>
      </div>

      {/* Cards Row: Total Restaurants, Active Restaurants, Trial Restaurants, Total Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
        <StatCard
          title="Total Restaurants"
          value="128"
          subtitle="+12 this month"
          icon={Building2}
          trend={{ value: '9.4%', positive: true }}
          highlight
        />
        <StatCard
          title="Active Restaurants"
          value="114"
          subtitle="89% subscription retention"
          icon={CheckCircle2}
          trend={{ value: '4.2%', positive: true }}
        />
        <StatCard
          title="Trial Restaurants"
          value="14"
          subtitle="Expiring within 7 days: 5"
          icon={Clock3}
        />
        <StatCard
          title="Total Users"
          value="842"
          subtitle="Staff, managers & cashiers"
          icon={Users2}
          trend={{ value: '18.1%', positive: true }}
        />
      </div>

      {/* Grid: Recent Restaurants & System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Restaurants Section */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Restaurants</h2>
              <p className="text-xs text-slate-500">
                Latest outlets registered on DineFlow Cloud
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
              Live Feed
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase font-semibold border-b border-slate-100">
                  <th className="pb-3 pl-2">Restaurant</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Subscription</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentRestaurants.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-semibold text-slate-800">
                      {res.name}
                    </td>
                    <td className="py-3.5 text-slate-600">{res.owner}</td>
                    <td className="py-3.5">
                      <span className="font-medium text-slate-700">{res.plan}</span>
                    </td>
                    <td className="py-3.5">
                      <Badge
                        variant={res.status === 'Active' ? 'emerald' : 'amber'}
                        size="sm"
                      >
                        {res.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 text-right pr-2 text-slate-500">
                      {res.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Section */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">System Activity</h2>
              <p className="text-xs text-slate-500">Audit logs & events</p>
            </div>
            <Activity className="h-4 w-4 text-violet-600" />
          </div>

          <div className="mt-4 space-y-4">
            {systemActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-violet-600 ring-4 ring-violet-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {act.title}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-tight mt-0.5">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="rounded-xl bg-violet-50 p-3 text-xs text-violet-800 flex items-center justify-between">
              <span className="font-semibold">All nodes healthy</span>
              <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md text-violet-700 shadow-2xs">
                OK 200
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
