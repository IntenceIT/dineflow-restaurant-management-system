import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../common/DashboardLayout';
import { StatCard } from '../common/StatCard';
import {
  DollarSign,
  Receipt,
  Banknote,
  Smartphone,
  PlusCircle,
  ShoppingBag,
  CreditCard,
  Printer,
  Check,
  Search,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const CashierDashboard: React.FC = () => {
  const { user, setActiveTab } = useAuth();
  const [lastBilled, setLastBilled] = useState<string | null>(null);

  const pendingBills = [
    {
      id: 'BILL-409',
      table: 'Table 2',
      items: '2x Chicken Burger, 1x Fries',
      subtotal: 'Rs. 440.00',
      tax: 'Rs. 22.00',
      total: 'Rs. 462.00',
      time: 'Just now',
    },
    {
      id: 'BILL-408',
      table: 'Table 4',
      items: '1x Veg Burger, 2x Coke',
      subtotal: 'Rs. 320.00',
      tax: 'Rs. 16.00',
      total: 'Rs. 336.00',
      time: '6m ago',
    },
    {
      id: 'BILL-407',
      table: 'Table 5',
      items: '4x Gourmet Double BBQ, 4x Soda, Onion Rings',
      subtotal: 'Rs. 1,250.00',
      tax: 'Rs. 62.50',
      total: 'Rs. 1,312.50',
      time: '14m ago',
    },
  ];

  const handleQuickSettle = (billId: string, method: string) => {
    setLastBilled(`${billId} settled via ${method}`);
    setTimeout(() => {
      setLastBilled(null);
    }, 4000);
  };

  return (
    <DashboardLayout pageTitle="Cashier POS Dashboard">
      {/* Clean compact header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Welcome, {user?.name || 'Cashier'} • Terminal Register #01
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-violet-50 border border-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-800 self-start sm:self-auto">
          <Receipt className="h-4 w-4 text-violet-600" />
          <span>Register #01 - Active</span>
        </div>
      </div>

      {/* Main Quick Actions: New Bill, Orders, Payments */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Main Quick Actions
          </h2>
          {lastBilled && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full animate-in fade-in">
              <Check className="h-3.5 w-3.5" />
              {lastBilled}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('billing')}
            className="group flex items-center gap-3.5 rounded-2xl border border-violet-200/80 bg-white p-4 text-left transition-all hover:border-violet-400 hover:shadow-md hover:bg-violet-50/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-purple-200 transition-transform group-hover:scale-105">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                New Bill
              </h3>
              <p className="text-xs text-slate-500">Create new guest invoice / POS</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 text-left transition-all hover:border-violet-300 hover:shadow-md hover:bg-slate-50/50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition-transform group-hover:scale-105">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                Orders
              </h3>
              <p className="text-xs text-slate-500">View active table tickets</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 text-left transition-all hover:border-violet-300 hover:shadow-md hover:bg-slate-50/50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-200 transition-transform group-hover:scale-105">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Payments
              </h3>
              <p className="text-xs text-slate-500">Reconcile cash drawer & UPI</p>
            </div>
          </button>
        </div>
      </div>

      {/* Cards: Today's Sales, Today's Bills, Cash, UPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
        <StatCard
          title="Today's Sales"
          value="Rs. 2,480.50"
          subtitle="Total register gross"
          icon={Banknote}
          trend={{ value: '14.2%', positive: true }}
          highlight
        />
        <StatCard
          title="Today's Bills"
          value="142"
          subtitle="Receipts issued today"
          icon={Receipt}
          trend={{ value: '12 bills/hr', positive: true }}
        />
        <StatCard
          title="Cash"
          value="Rs. 960.00"
          subtitle="48 Cash transactions"
          icon={Banknote}
        />
        <StatCard
          title="UPI"
          value="Rs. 1,520.50"
          subtitle="94 UPI / QR transactions"
          icon={Smartphone}
        />
      </div>

      {/* Active Checkout Queue */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Pending Table Settlements
            </h2>
            <p className="text-xs text-slate-500">
              Ready for immediate cash or UPI checkout
            </p>
          </div>
          <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
            3 Ready to Settle
          </span>
        </div>

        <div className="divide-y divide-slate-100 mt-3">
          {pendingBills.map((bill) => (
            <div
              key={bill.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-violet-700">
                    {bill.id}
                  </span>
                  <Badge variant="blue" size="sm">
                    {bill.table}
                  </Badge>
                  <span className="text-[11px] text-slate-400">{bill.time}</span>
                </div>
                <p className="text-xs text-slate-600">{bill.items}</p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Total
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {bill.total}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickSettle(bill.id, 'Cash')}
                    className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Banknote className="h-3.5 w-3.5" />
                    <span>Cash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSettle(bill.id, 'UPI')}
                    className="inline-flex items-center gap-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSettle(bill.id, 'Printed Invoice')}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Print Receipt"
                  >
                    <Printer className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
