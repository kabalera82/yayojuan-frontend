import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import './Button.css';

type ButtonProps = {
  to: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

export const Button = ({to, variant = 'primary', children}: ButtonProps) => (
  <Link to={to} className={`button button--${variant}`}>
    {children}
  </Link>
);
