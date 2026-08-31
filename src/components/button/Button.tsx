import {Link} from 'react-router-dom';
import type {ButtonProps} from './buttonProps';
import './Button.css';

export const Button = ({
  to,
  type = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
  children
}: ButtonProps) => {
  const className = [
    'button',
    `button--${variant}`,
    size !== 'md' && `button--${size}`,
    block && 'button--block',
    active && 'is-active'
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
