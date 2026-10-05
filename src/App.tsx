/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { RestaurantOwnerDashboard } from './components/dashboards/RestaurantOwnerDashboard';
import { ManagerDashboard } from './components/dashboards/ManagerDashboard';
import { CashierDashboard } from './components/dashboards/CashierDashboard';
import { KitchenStaffDashboard } from './components/dashboards/KitchenStaffDashboard';

const AppContent: React.FC = () => {
  const { user, currentPath } = useAuth();

  // If unauthenticated or at login route, present login page
  if (!user || currentPath === '/login') {
    return <LoginPage />;
  }

  // Render role-specific dashboard based on verified authenticated role
  switch (user.role) {
    case 'Super Admin':
      return <SuperAdminDashboard />;
    case 'Restaurant Owner':
      return <RestaurantOwnerDashboard />;
    case 'Manager':
      return <ManagerDashboard />;
    case 'Cashier':
      return <CashierDashboard />;
    case 'Kitchen Staff':
      return <KitchenStaffDashboard />;
    default:
      return <LoginPage />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
