import {useEffect, useState} from 'react';
import type {SubmitEvent} from 'react';
import './UserForm.css';
import {useAuth} from '../../hooks/useAuth';
import {registerUser, updateUser, createUser, getMe} from '../../services/api';
import type {UserFormProps} from '../../types/user';
import {Button} from '../button/Button';

const TITULOS = {
  register: 'Crear cuenta',
  update: 'Guardar cambios',
  create: 'Nuevo usuario'
};

const UserForm = ({mode, onSuccess}: UserFormProps) => {
  const {token, user, setUser} = useAuth();

  const [username, setUsername] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(mode === 'update');

  useEffect(() => {
    if (mode !== 'update' || !token) {
      return;
    }

    const loadUser = async () => {
      const result = await getMe(token);

      if ('message' in result) {
        setMessage(result.message);
        setLoading(false);
        return;
      }

      setUsername(result.username);
      setUserSurname(result.userSurname);
      setEmail(result.email);
      setPhone(result.phone);
      setUser(result);
      setLoading(false);
    };

    loadUser();
  }, [mode, token, setUser]);

  if (mode === 'update' && (loading || !token)) {
    return <p>Cargando...</p>;
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      let result;

      if (mode === 'update') {
        result = await updateUser(token!, username, userSurname, email, phone);
      } else if (mode === 'create') {
        result = await createUser(token!, {username, userSurname, email, phone, password, role});
      } else {
        result = await registerUser({username, userSurname, email, phone, password});
      }

      setMessage(result.message);

      if (mode === 'update') {
        setUser({...user!, username, userSurname, email, phone});
      }

      onSuccess?.();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo conectar con el servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{TITULOS[mode]}</h2>

      <label className="user-form__field">
        Nombre
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        Apellidos
        <input
          value={userSurname}
          onChange={(event) => setUserSurname(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        Teléfono
        <input value={phone} onChange={(event) => setPhone(event.target.value)} required />
      </label>

      {mode === 'create' && (
        <label className="user-form__field">
          Rol
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="customer">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
      )}

      {mode !== 'update' && (
        <label className="user-form__field">
          Contraseña
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>
      )}

      {message && <p className="user-form__message">{message}</p>}

      <Button type="submit" block disabled={submitting}>
        {TITULOS[mode]}
      </Button>
    </form>
  );
};

export default UserForm;
