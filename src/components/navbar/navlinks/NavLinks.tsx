import {NavLink} from 'react-router-dom';
import type {NavItem} from './navItems';
import './NavLinks.css';

type NavLinksProps = {
  items: NavItem[];
  onLinkClick?: () => void;
};

export const NavLinks = ({items, onLinkClick}: NavLinksProps) => (
  <ul className="navlinks_list">
    {items.map((item) => (
      <li className="navlinks_item" key={item.href}>
        <NavLink className="navlinks_link" to={item.href} onClick={onLinkClick}>
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
);
