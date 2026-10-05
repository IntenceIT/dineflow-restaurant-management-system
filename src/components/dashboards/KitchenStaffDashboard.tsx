import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../common/DashboardLayout';
import { StatCard } from '../common/StatCard';
import {
  Flame,
  Clock,
  CheckCircle2,
  Utensils,
  Play,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface OrderItem {
  name: string;
  qty: number;
  notes?: string;
}

interface KitchenTicket {
  id: string;
  orderNumber: string;
  time: string;
  table: string;
  items: OrderItem[];
  status: 'New' | 'Preparing' | 'Ready';
}

export const KitchenStaffDashboard: React.FC = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<KitchenTicket[]>([
    {
      id: 'ord-1025',
      orderNumber: '#1025',
      time: '3m ago',
      table: 'Table 4',
      items: [
        { name: 'Veg Burger', qty: 1, notes: 'Extra crispy patty' },
        { name: 'Coke', qty: 2, notes: 'With ice & lemon' },
      ],
      status: 'New',
    },
    {
      id: 'ord-1024',
      orderNumber: '#1024',
      time: '11m ago',
      table: 'Table 2',
      items: [
        { name: 'Chicken Burger', qty: 2, notes: 'Medium spice' },
        { name: 'Fries', qty: 1, notes: 'Peri-peri salt' },
      ],
      status: 'Preparing',
    },
    {
      id: 'ord-1023',
      orderNumber: '#1023',
      time: '18m ago',
      table: 'Takeaway',
      items: [
        { name: 'Classic Cheeseburger', qty: 3 },
        { name: 'Onion Rings', qty: 1 },
      ],
      status: 'Ready',
    },
  ]);

  const updateStatus = (orderId: string, newStatus: 'New' | 'Preparing' | 'Ready') => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const newCount = orders.filter((o) => o.status === 'New').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;
  const readyCount = orders.filter((o) => o.status === 'Ready').length;

  return (
    <DashboardLayout pageTitle="Kitchen Display System (KDS)">
      {/* Clean compact header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Kitchen Display System (KDS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Welcome, {user?.name || 'Kitchen Staff'} • Live Order Preparation Queue
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-800 self-start sm:self-auto">
          <Flame className="h-4 w-4 text-amber-600" />
          <span>{orders.length} Active Tickets</span>
        </div>
      </div>

      {/* Cards: New Orders, Preparing, Ready */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
        <StatCard
          title="New Orders"
          value={newCount}
          subtitle="Waiting for cook acceptance"
          icon={Flame}
          highlight={newCount > 0}
        />
        <StatCard
          title="Preparing"
          value={preparingCount}
          subtitle="On grill / fryer right now"
          icon={Clock}
        />
        <StatCard
          title="Ready"
          value={readyCount}
          subtitle="Awaiting server pick-up"
          icon={CheckCircle2}
        />
      </div>

      {/* Main Section: Kitchen Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Kitchen Orders</h2>
            <p className="text-xs text-slate-500">
              Real-time ticket queue with step-by-step state actions
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {orders.length} orders
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((ord) => {
            const isNew = ord.status === 'New';
            const isPrep = ord.status === 'Preparing';
            const isReady = ord.status === 'Ready';

            return (
              <div
                key={ord.id}
                className={`relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs transition-all ${
                  isNew
                    ? 'border-violet-300 ring-2 ring-violet-500/10'
                    : isPrep
                    ? 'border-amber-300 ring-2 ring-amber-500/10'
                    : 'border-emerald-300 bg-emerald-50/20'
                }`}
              >
                {/* Ticket Top bar */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900">
                        {ord.orderNumber}
                      </span>
                      <Badge
                        variant={
                          isNew ? 'purple' : isPrep ? 'amber' : 'emerald'
                        }
                        size="sm"
                      >
                        {ord.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-700">
                        {ord.table}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {ord.time}
                      </span>
                    </div>
                  </div>

                  {/* Ticket Items List */}
                  <div className="py-4 space-y-2.5">
                    {ord.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between rounded-xl bg-slate-50/80 p-2.5 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-violet-700">
                              {item.name}
                            </span>
                            <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                              × {item.qty}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-[11px] text-amber-700 italic mt-0.5">
                              • {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* State Transition Action Buttons */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">
                    Update Order Status:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Button 1: Accept */}
                    <button
                      type="button"
                      onClick={() => updateStatus(ord.id, 'New')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                        isNew
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-[11px]">Accept</span>
                    </button>

                    {/* Button 2: Preparing */}
                    <button
                      type="button"
                      onClick={() => updateStatus(ord.id, 'Preparing')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                        isPrep
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-[11px]">Preparing</span>
                    </button>

                    {/* Button 3: Ready */}
                    <button
                      type="button"
                      onClick={() => updateStatus(ord.id, 'Ready')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                        isReady
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-[11px]">Ready</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};
