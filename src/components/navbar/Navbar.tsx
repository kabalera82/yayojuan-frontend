import {NavLink} from 'react-router-dom';
import {NavLinks} from './navlinks/NavLinks';
import {navItems} from './navlinks/navItems';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        La huerta del Yayo Juan
      </NavLink>
      <NavLinks items={navItems} />
    </nav>
  );
};

export default Navbar;
