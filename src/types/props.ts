import type {ReactNode} from 'react';
import type {NavItem} from '../components/navbar/navlinks/navItems';
import type {Product} from './product';

export type ButtonProps = {
  to: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

export type NavLinksProps = {
  items: NavItem[];
  onLinkClick?: () => void;
};

export type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export type Value = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type ValueCardProps = Value;

export interface UserFormProps {
  mode: 'register' | 'update';
  onSuccess?: () => void;
}
