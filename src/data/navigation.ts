import { UserRole } from '../types';

export interface NavItemDef {
  id: string;
  label: string;
  iconName: string;
  badge?: string | number;
}

export const ROLE_NAVIGATION: Record<UserRole, NavItemDef[]> = {
  'Super Admin': [
    { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard' },
    { id: 'restaurants', label: 'Restaurants', iconName: 'Store', badge: '128' },
    { id: 'subscriptions', label: 'Subscriptions', iconName: 'CreditCard' },
    { id: 'settings', label: 'Settings', iconName: 'Settings' },
  ],
  'Restaurant Owner': [
    { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard' },
    { id: 'billing', label: 'Billing', iconName: 'Receipt' },
    { id: 'orders', label: 'Orders', iconName: 'ShoppingBag', badge: '12' },
    { id: 'tables', label: 'Tables', iconName: 'Grid' },
    { id: 'menu', label: 'Menu', iconName: 'Utensils' },
    { id: 'inventory', label: 'Inventory', iconName: 'Boxes', badge: 'Low' },
    { id: 'purchases', label: 'Purchases', iconName: 'Truck' },
    { id: 'suppliers', label: 'Suppliers', iconName: 'Users' },
    { id: 'payments', label: 'Payments', iconName: 'CreditCard' },
    { id: 'expenses', label: 'Expenses', iconName: 'DollarSign' },
    { id: 'reports', label: 'Reports', iconName: 'BarChart3' },
    { id: 'staff', label: 'Staff', iconName: 'UserCheck' },
    { id: 'settings', label: 'Settings', iconName: 'Settings' },
  ],
  'Manager': [
    { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard' },
    { id: 'billing', label: 'Billing', iconName: 'Receipt' },
    { id: 'orders', label: 'Orders', iconName: 'ShoppingBag', badge: '8' },
    { id: 'tables', label: 'Tables', iconName: 'Grid' },
    { id: 'menu', label: 'Menu', iconName: 'Utensils' },
    { id: 'inventory', label: 'Inventory', iconName: 'Boxes' },
    { id: 'payments', label: 'Payments', iconName: 'CreditCard' },
    { id: 'reports', label: 'Reports', iconName: 'BarChart3' },
    { id: 'staff', label: 'Staff', iconName: 'UserCheck' },
  ],
  'Cashier': [
    { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard' },
    { id: 'billing', label: 'Billing', iconName: 'Receipt' },
    { id: 'orders', label: 'Orders', iconName: 'ShoppingBag' },
    { id: 'payments', label: 'Payments', iconName: 'CreditCard' },
  ],
  'Kitchen Staff': [
    { id: 'dashboard', label: 'Live KDS', iconName: 'Flame', badge: 'Live' },
    { id: 'orders', label: 'Orders Queue', iconName: 'ShoppingBag', badge: '5' },
    { id: 'history', label: 'Completed Orders', iconName: 'CheckCircle2' },
  ],
};
