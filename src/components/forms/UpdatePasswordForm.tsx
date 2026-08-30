import {useState} from 'react';
import type {SubmitEvent} from 'react';
import './UserForm.css';
import {useAuth} from '../../context/AuthContext';
import {updatePassword} from '../../services/api';

const UpdatePasswordForm = () => {
  const {token} = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    setSubmitting(true);
    setMessage('');

    const result = await updatePassword(token, currentPassword, newPassword);

    setSubmitting(false);
    setMessage(result.message);
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Cambiar contraseña</h2>

      <label className="user-form__field">
        Contraseña actual
        <input
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        Contraseña nueva
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
          minLength={6}
        />
      </label>

      {message && <p className="user-form__message">{message}</p>}

      <button type="submit" className="user-form__submit" disabled={submitting}>
        Actualizar contraseña
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
