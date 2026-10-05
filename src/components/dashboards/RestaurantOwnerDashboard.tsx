import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../common/DashboardLayout';
import { StatCard } from '../common/StatCard';
import {
  DollarSign,
  ShoppingBag,
  Banknote,
  Smartphone,
  AlertTriangle,
  Store,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Clock,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const RestaurantOwnerDashboard: React.FC = () => {
  const { user } = useAuth();

  const recentOrders = [
    {
      id: '#ORD-1025',
      time: '2 mins ago',
      table: 'Table 4',
      items: '1x Veg Burger, 2x Coke',
      amount: 'Rs. 320.00',
      payment: 'UPI',
      status: 'Preparing',
    },
    {
      id: '#ORD-1024',
      time: '9 mins ago',
      table: 'Table 2',
      items: '2x Chicken Burger, 1x Fries',
      amount: 'Rs. 540.00',
      payment: 'Cash',
      status: 'Ready',
    },
    {
      id: '#ORD-1023',
      time: '18 mins ago',
      table: 'Takeaway',
      items: '3x Classic Cheeseburger',
      amount: 'Rs. 690.00',
      payment: 'UPI',
      status: 'Completed',
    },
    {
      id: '#ORD-1022',
      time: '34 mins ago',
      table: 'Table 7',
      items: '2x Double Bacon BBQ, 2x Milkshake',
      amount: 'Rs. 820.00',
      payment: 'Cash',
      status: 'Completed',
    },
  ];

  const lowStockItems = [
    { name: 'Burger Buns (Brioche)', quantity: '18 pcs left', threshold: '50 pcs' },
    { name: 'Cheddar Cheese Slices', quantity: '12 slices left', threshold: '40 slices' },
    { name: 'Cooking Oil (Canola)', quantity: '3.5 Litres left', threshold: '10 Litres' },
  ];

  return (
    <DashboardLayout pageTitle="Dashboard">
      {/* Clean, standard SaaS page header (no giant banner) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Welcome, {user?.name || 'Restaurant Owner'} • {user?.restaurantName || 'Royal Burger House'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-violet-50 border border-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-800 self-start sm:self-auto">
          <Store className="h-4 w-4 text-violet-600" />
          <span>{user?.restaurantName || 'Royal Burger House'}</span>
        </div>
      </div>

      {/* Cards: Today's Sales, Today's Orders, Cash, UPI, Low Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 mb-6">
        <StatCard
          title="Today's Sales"
          value="Rs. 2,480.50"
          subtitle="+14% vs yesterday"
          icon={Banknote}
          trend={{ value: '14.2%', positive: true }}
          highlight
        />
        <StatCard
          title="Today's Orders"
          value="142"
          subtitle="Avg ticket Rs. 174.60"
          icon={ShoppingBag}
          trend={{ value: '8.6%', positive: true }}
        />
        <StatCard
          title="Cash"
          value="Rs. 960.00"
          subtitle="38.7% of total sales"
          icon={Banknote}
        />
        <StatCard
          title="UPI"
          value="Rs. 1,520.50"
          subtitle="61.3% of total sales"
          icon={Smartphone}
        />
        <StatCard
          title="Low Stock"
          value="3 Items"
          subtitle="Requires purchase order"
          icon={AlertTriangle}
        />
      </div>

      {/* Main Grid: Recent Activity & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Overview */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Today's Live Orders</h2>
              <p className="text-xs text-slate-500">Real-time floor & takeaway receipts</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live Synchronized
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase font-semibold border-b border-slate-100">
                  <th className="pb-3 pl-2">Order</th>
                  <th className="pb-3">Source</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-violet-700">
                      {ord.id}
                      <span className="block text-[11px] font-normal text-slate-400">
                        {ord.time}
                      </span>
                    </td>
                    <td className="py-3.5 font-medium text-slate-700">{ord.table}</td>
                    <td className="py-3.5 text-slate-600 max-w-[200px] truncate">
                      {ord.items}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                          ord.payment === 'Cash'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200/50'
                        }`}
                      >
                        {ord.payment}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">
                      {ord.amount}
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <Badge
                        variant={
                          ord.status === 'Completed'
                            ? 'emerald'
                            : ord.status === 'Ready'
                            ? 'blue'
                            : 'amber'
                        }
                        size="sm"
                      >
                        {ord.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts & Quick Health */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900">Low Stock Alert</h2>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                3 Items Low
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {lowStockItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <span className="inline-flex items-center text-xs font-bold text-rose-700 bg-rose-100/80 border border-rose-200 px-2.5 py-1 rounded-md shrink-0">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                    <span>Reorder Threshold:</span>
                    <span className="font-semibold text-slate-700">{item.threshold}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Payment Method Breakdown
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">UPI / QR Payment</span>
                  <span className="font-bold text-slate-900">Rs. 1,520.50 (61%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-violet-600 rounded-full w-[61%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">Cash Register</span>
                  <span className="font-bold text-slate-900">Rs. 960.00 (39%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[39%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

