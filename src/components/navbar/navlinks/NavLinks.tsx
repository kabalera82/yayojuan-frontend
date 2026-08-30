import {NavLink} from 'react-router-dom';
import type {NavLinksProps} from '../../../types/props';
import './NavLinks.css';

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
