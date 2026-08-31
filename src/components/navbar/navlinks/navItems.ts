export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {label: 'Inicio', href: '/'},
  {label: 'Conócenos', href: '/contact'},
  {label: 'Tienda', href: '/shop'}
];

export type NavLinksProps = {
  items: NavItem[];
  onLinkClick?: () => void;
};
