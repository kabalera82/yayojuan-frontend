import {useAuth} from './useAuth';
import {navItems} from '../components/navbar/navlinks/navItems';
import type {NavItem} from '../components/navbar/navlinks/navItems';

export const useNavItems = (): NavItem[] => {
  const {user} = useAuth();

  const items = [...navItems, {label: user ? 'Cuenta' : 'Acceder', href: '/cuenta'}];

  if (user?.role === 'admin') {
    items.push({label: 'Administración', href: '/admin'});
  }

  return items;
};
