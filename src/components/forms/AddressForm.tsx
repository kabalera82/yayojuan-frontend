import {useState} from 'react';
import type {SubmitEvent} from 'react';
import './UserForm.css';
import {useAuth} from '../../hooks/useAuth';
import {addAddress, updateAddress} from '../../services/api';
import {Button} from '../button/Button';

const AddressForm = () => {
  const {token, user, setUser} = useAuth();
  const address = user?.addresses.find((entry) => entry.isDefault) ?? user?.addresses[0];

  const [street, setStreet] = useState(address?.street ?? '');
  const [city, setCity] = useState(address?.city ?? '');
  const [postalCode, setPostalCode] = useState(address?.postalCode ?? '');
  const [country, setCountry] = useState(address?.country ?? 'España');

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token || !user) {
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const payload = {street, city, postalCode, country};
      const result = address
        ? await updateAddress(token, address._id, payload)
        : await addAddress(token, payload);

      setMessage(result.message);

      if (result.addresses) {
        setUser({...user, addresses: result.addresses});
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo conectar con el servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Dirección de envío</h2>

      <label className="user-form__field">
        Calle
        <input value={street} onChange={(event) => setStreet(event.target.value)} required />
      </label>

      <label className="user-form__field">
        Ciudad
        <input value={city} onChange={(event) => setCity(event.target.value)} required />
      </label>

      <label className="user-form__field">
        Código postal
        <input
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        País
        <input value={country} onChange={(event) => setCountry(event.target.value)} required />
      </label>

      {message && <p className="user-form__message">{message}</p>}

      <Button type="submit" block disabled={submitting}>
        {address ? 'Guardar dirección' : 'Añadir dirección'}
      </Button>
    </form>
  );
};

export default AddressForm;
