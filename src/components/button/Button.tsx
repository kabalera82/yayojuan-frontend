import {Link} from 'react-router-dom';
import type {ButtonProps} from '../../types/props';
import './Button.css';

export const Button = ({to, variant = 'primary', children}: ButtonProps) => (
  <Link to={to} className={`button button--${variant}`}>
    {children}
  </Link>
);
