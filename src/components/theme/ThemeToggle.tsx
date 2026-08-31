import {useTheme} from '../../hooks/useTheme';
import {Button} from '../button/Button';

export const ThemeToggle = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      ariaLabel={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
};
