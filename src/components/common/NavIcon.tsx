import React from 'react';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Settings,
  Receipt,
  ShoppingBag,
  Grid,
  Utensils,
  Boxes,
  Truck,
  Users,
  DollarSign,
  BarChart3,
  UserCheck,
  Flame,
  CheckCircle2,
  LucideProps,
} from 'lucide-react';

interface NavIconProps extends LucideProps {
  name: string;
}

export const NavIcon: React.FC<NavIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'LayoutDashboard':
      return <LayoutDashboard {...props} />;
    case 'Store':
      return <Store {...props} />;
    case 'CreditCard':
      return <CreditCard {...props} />;
    case 'Settings':
      return <Settings {...props} />;
    case 'Receipt':
      return <Receipt {...props} />;
    case 'ShoppingBag':
      return <ShoppingBag {...props} />;
    case 'Grid':
      return <Grid {...props} />;
    case 'Utensils':
      return <Utensils {...props} />;
    case 'Boxes':
      return <Boxes {...props} />;
    case 'Truck':
      return <Truck {...props} />;
    case 'Users':
      return <Users {...props} />;
    case 'DollarSign':
      return <DollarSign {...props} />;
    case 'BarChart3':
      return <BarChart3 {...props} />;
    case 'UserCheck':
      return <UserCheck {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    default:
      return <LayoutDashboard {...props} />;
  }
};
