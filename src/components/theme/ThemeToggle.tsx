import {useTheme} from './useTheme';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
