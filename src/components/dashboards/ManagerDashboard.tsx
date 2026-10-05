import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../common/DashboardLayout';
import { StatCard } from '../common/StatCard';
import {
  Banknote,
  ShoppingBag,
  Clock,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  TableProperties,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ManagerDashboard: React.FC = () => {
  const { user } = useAuth();

  const activeFloorTables = [
    { table: 'Table 1', guests: 4, status: 'Occupied', server: 'John D.', orderVal: 'Rs. 420.00' },
    { table: 'Table 2', guests: 2, status: 'Food Ready', server: 'Sarah M.', orderVal: 'Rs. 220.00' },
    { table: 'Table 3', guests: 0, status: 'Available', server: '-', orderVal: '-' },
    { table: 'Table 4', guests: 3, status: 'Kitchen Preparing', server: 'John D.', orderVal: 'Rs. 145.00' },
    { table: 'Table 5', guests: 6, status: 'Occupied', server: 'David R.', orderVal: 'Rs. 680.00' },
    { table: 'Table 6', guests: 0, status: 'Available', server: '-', orderVal: '-' },
  ];

  const staffOnDuty = [
    { name: 'Sarah Miller', role: 'Head Waiter', status: 'On Shift' },
    { name: 'John Davis', role: 'Floor Server', status: 'On Shift' },
    { name: 'David Ross', role: 'Server', status: 'On Shift' },
    { name: 'Alex Wong', role: 'Lead Cook', status: 'In Kitchen' },
  ];

  return (
    <DashboardLayout pageTitle="Manager Operations Dashboard">
      {/* Clean compact header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Welcome, {user?.name || 'Manager'} • Floor & Operations Control
          </p>
        </div>
      </div>

      {/* Cards: Today's Sales, Orders, Pending Orders, Low Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
        <StatCard
          title="Today's Sales"
          value="Rs. 2,480.50"
          subtitle="Target: Rs. 3,000.00"
          icon={Banknote}
          trend={{ value: '14.2%', positive: true }}
          highlight
        />
        <StatCard
          title="Orders"
          value="142"
          subtitle="Served today across all tables"
          icon={ShoppingBag}
          trend={{ value: '8.6%', positive: true }}
        />
        <StatCard
          title="Pending Orders"
          value="8"
          subtitle="5 in prep, 3 queue"
          icon={Clock}
        />
        <StatCard
          title="Low Stock"
          value="3 Items"
          subtitle="Kitchen alerts reported"
          icon={AlertTriangle}
        />
      </div>

      {/* Floor Overview & On-Duty Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table & Floor Status */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Floor Status</h2>
              <p className="text-xs text-slate-500">Live dining area & table occupancy</p>
            </div>
            <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
              4 / 6 Tables Active
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase font-semibold border-b border-slate-100">
                  <th className="pb-3 pl-2">Table</th>
                  <th className="pb-3">Guests</th>
                  <th className="pb-3">Assigned Staff</th>
                  <th className="pb-3">Bill Current</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeFloorTables.map((tbl, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-slate-900">{tbl.table}</td>
                    <td className="py-3.5 text-slate-600">
                      {tbl.guests > 0 ? `${tbl.guests} guests` : 'Vacant'}
                    </td>
                    <td className="py-3.5 text-slate-600">{tbl.server}</td>
                    <td className="py-3.5 font-mono font-semibold text-slate-800">
                      {tbl.orderVal}
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <Badge
                        variant={
                          tbl.status === 'Available'
                            ? 'slate'
                            : tbl.status === 'Food Ready'
                            ? 'emerald'
                            : tbl.status === 'Kitchen Preparing'
                            ? 'amber'
                            : 'blue'
                        }
                        size="sm"
                      >
                        {tbl.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff on Duty */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Staff On Duty</h2>
              <p className="text-xs text-slate-500">Current shift allocation</p>
            </div>
            <UserCheck className="h-4 w-4 text-violet-600" />
          </div>

          <div className="mt-4 space-y-3">
            {staffOnDuty.map((staff, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 font-bold text-xs">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{staff.name}</p>
                    <p className="text-[11px] text-slate-500">{staff.role}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {staff.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-violet-100 bg-violet-50/50 p-3">
            <span className="text-[11px] font-bold text-violet-900">Shift Notes</span>
            <p className="text-xs text-slate-600 mt-1">
              Table 5 reserved for party of 6 at 7:30 PM. Buns inventory restocked from supplier delivery.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
