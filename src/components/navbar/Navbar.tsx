import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {NavLinks} from './navlinks/NavLinks';

import {useNavItems} from '../../hooks/useNavItems';
import {ThemeToggle} from '../theme/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const items = useNavItems();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand" onClick={closeMenu}>
        La huerta del Yayo Juan
      </NavLink>

      <div className={`navbar__menu ${menuOpen ? 'is-open' : ''}`}>
        <NavLinks items={items} onLinkClick={closeMenu} />
      </div>

      <div className="navbar__actions">
        <ThemeToggle />
        <button
          type="button"
          className="navbar__burger"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
