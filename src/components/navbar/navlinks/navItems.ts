export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {label: 'Inicio', href: '/'},
  {label: 'Conocenos', href: '/conocenos'},
  {label: 'Tienda', href: '/shop'},
  {label: 'Cuenta', href: '/cuenta'}
];
