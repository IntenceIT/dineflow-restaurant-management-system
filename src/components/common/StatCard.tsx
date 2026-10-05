import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlight = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-md ${
        highlight
          ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white border-violet-500 shadow-sm shadow-purple-200'
          : 'bg-white border-slate-200/80 text-slate-800 shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0 flex-1">
          <p
            className={`text-xs font-semibold uppercase tracking-wider truncate ${
              highlight ? 'text-violet-200' : 'text-slate-500'
            }`}
          >
            {title}
          </p>
          
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                highlight ? 'text-white' : 'text-slate-900'
              }`}
            >
              {value}
            </span>
            {trend && (
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                  highlight
                    ? 'bg-white/20 text-white'
                    : trend.positive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                }`}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>

          {subtitle && (
            <p
              className={`text-xs truncate ${
                highlight ? 'text-violet-100/90' : 'text-slate-500'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
            highlight
              ? 'bg-white/15 text-white backdrop-blur-xs'
              : 'bg-violet-50 text-violet-600 border border-violet-100'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Subtle decorative glow */}
      <div
        className={`absolute -right-6 -bottom-6 h-20 w-20 rounded-full pointer-events-none ${
          highlight ? 'bg-white/10 blur-xl' : 'bg-violet-500/5 blur-xl'
        }`}
      />
    </div>
  );
};
