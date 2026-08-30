import {useAuth} from '../../../context/AuthContext';
import type {NavItem} from './navItems';

// Un único destino ("/cuenta"): esa página decide qué mostrar según el estado.
// Solo cambia la etiqueta, según si hay sesión o no.
export const useAccountNavItem = (): NavItem => {
  const {user} = useAuth();
  return {label: user ? 'Cuenta' : 'Acceder', href: '/cuenta'};
};
