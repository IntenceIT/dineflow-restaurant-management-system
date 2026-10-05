import React from 'react';
import { UserRole } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'emerald' | 'amber' | 'blue' | 'slate' | 'rose';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
}) => {
  const variantStyles = {
    purple: 'bg-violet-50 text-violet-700 border-violet-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    blue: 'bg-sky-50 text-sky-700 border-sky-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};

export const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => {
  const getVariant = (r: UserRole): BadgeProps['variant'] => {
    switch (r) {
      case 'Super Admin':
        return 'purple';
      case 'Restaurant Owner':
        return 'emerald';
      case 'Manager':
        return 'blue';
      case 'Cashier':
        return 'amber';
      case 'Kitchen Staff':
        return 'rose';
      default:
        return 'purple';
    }
  };

  return <Badge variant={getVariant(role)}>{role}</Badge>;
};
