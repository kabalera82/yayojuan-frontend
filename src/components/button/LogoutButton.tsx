import {useAuth} from '../../context/AuthContext';
import './Button.css';
import '../forms/UserForm.css';

export const LogoutButton = () => {
  const {logout} = useAuth();

  return (
    <div className="user-form">
      <button type="button" className="button button--danger button--block" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};
