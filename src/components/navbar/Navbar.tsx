import {NavLink} from 'react-router-dom';
import {NavLinks} from './navlinks/NavLinks';
import {navItems} from './navlinks/navItems';
import {useAccountNavItem} from './navlinks/useAccountNavItem';
import {ThemeToggle} from '../theme/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const accountItem = useAccountNavItem();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        La huerta del Yayo Juan
      </NavLink>
      <div className="navbar__end">
        <NavLinks items={[...navItems, accountItem]} />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
