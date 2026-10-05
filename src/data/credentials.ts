import { User, UserRole } from '../types';

export interface DemoAccount {
  user: User;
  password: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    user: {
      id: 'super-admin-1',
      name: 'Yasir',
      email: 'yasir@gmail.com',
      role: 'Super Admin',
    },
    password: '2412',
  },
  {
    user: {
      id: 'super-admin-2',
      name: 'Mahim',
      email: 'mahim@gmail.com',
      role: 'Super Admin',
    },
    password: '2412',
  },
  {
    user: {
      id: 'owner-1',
      name: 'Restaurant Owner',
      email: 'owner@gmail.com',
      role: 'Restaurant Owner',
      restaurantName: 'Royal Burger House',
    },
    password: 'restaurant',
  },
  {
    user: {
      id: 'manager-1',
      name: 'Manager',
      email: 'manager@gmail.com',
      role: 'Manager',
      restaurantName: 'Royal Burger House',
    },
    password: 'manager',
  },
  {
    user: {
      id: 'cashier-1',
      name: 'Cashier',
      email: 'cashier@gmail.com',
      role: 'Cashier',
      restaurantName: 'Royal Burger House',
    },
    password: 'cashier',
  },
  {
    user: {
      id: 'kitchen-1',
      name: 'Kitchen Staff',
      email: 'kitchenstaff@gmail.com',
      role: 'Kitchen Staff',
      restaurantName: 'Royal Burger House',
    },
    password: 'kitchenstaff',
  },
];

export const ROLE_ROUTES: Record<UserRole, string> = {
  'Super Admin': '/super-admin/dashboard',
  'Restaurant Owner': '/restaurant/dashboard',
  'Manager': '/manager/dashboard',
  'Cashier': '/cashier/dashboard',
  'Kitchen Staff': '/kitchen/dashboard',
};

export const ROLE_LIST: UserRole[] = [
  'Super Admin',
  'Restaurant Owner',
  'Manager',
  'Cashier',
  'Kitchen Staff',
];

export function getRoleFromPath(pathname: string): UserRole | null {
  if (pathname.startsWith('/super-admin')) return 'Super Admin';
  if (pathname.startsWith('/restaurant')) return 'Restaurant Owner';
  if (pathname.startsWith('/manager')) return 'Manager';
  if (pathname.startsWith('/cashier')) return 'Cashier';
  if (pathname.startsWith('/kitchen')) return 'Kitchen Staff';
  return null;
}
