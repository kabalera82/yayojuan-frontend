import { useAuth } from './useAuth';
import type { NavItem } from '../components/navbar/navlinks/navItems';

export const useAccountNavItem = (): NavItem => {
  const { user } = useAuth();
  return { label: user ? 'Cuenta' : 'Acceder', href: '/cuenta'};
};
