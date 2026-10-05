export type UserRole =
  | 'Super Admin'
  | 'Restaurant Owner'
  | 'Manager'
  | 'Cashier'
  | 'Kitchen Staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  restaurantName?: string;
  avatar?: string;
}

export interface NavItem {
  id: string;
  label: string;
  iconName: string;
  badge?: string | number;
}

export interface KitchenOrder {
  id: string;
  orderNumber: string;
  time: string;
  table?: string;
  items: { name: string; quantity: number; notes?: string }[];
  status: 'New' | 'Preparing' | 'Ready';
}
