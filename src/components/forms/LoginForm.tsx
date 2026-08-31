import {useState} from 'react';
import type {SubmitEvent} from 'react';
import './UserForm.css';
import {useAuth} from '../../hooks/useAuth';
import {loginUser} from '../../services/api';
import {Button} from '../button/Button';

const LoginForm = () => {
  const {login} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const result = await loginUser({email, password});

      if ('token' in result) {
        login(result.token, result.user);
        return;
      }

      setMessage(result.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo conectar con el servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

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
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      {message && <p className="user-form__message">{message}</p>}

      <Button type="submit" block disabled={submitting}>
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;
