import {useState} from 'react';
import type {SubmitEvent} from 'react';
import './Contact.css';
import '../components/forms/UserForm.css';
import heroImage from '../assets/images/hero_image.jpg';
import {sendContactMessage} from '../services/api';
import {Button} from '../components/button/Button';

const LATITUDE = Number(import.meta.env.VITE_MAP_LATITUDE);
const LONGITUDE = Number(import.meta.env.VITE_MAP_LONGITUDE);
const MAP_DELTA = 0.01;
const MAP_SRC =
  `https://www.openstreetmap.org/export/embed.html?bbox=${LONGITUDE - MAP_DELTA}%2C${LATITUDE - MAP_DELTA}%2C${LONGITUDE + MAP_DELTA}%2C${LATITUDE + MAP_DELTA}` +
  `&layer=mapnik&marker=${LATITUDE}%2C${LONGITUDE}`;

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback('');

    try {
      const result = await sendContactMessage({name, email, message});
      setFeedback(result.message);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'No se pudo conectar con el servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <img className="contact__hero" src={heroImage} alt="El Yayo Juan recogiendo la cosecha" />

      <section className="contact__grid container">
        <form className="user-form" onSubmit={handleSubmit}>
          <h2>Contacta con nosotros</h2>

          <label className="user-form__field">
            Nombre
            <input value={name} onChange={(event) => setName(event.target.value)} required />
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
            Mensaje
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              required
            />
          </label>

          {feedback && <p className="user-form__message">{feedback}</p>}

          <Button type="submit" block disabled={submitting}>
            Enviar
          </Button>
        </form>

        <iframe
          className="contact__map"
          title="Ubicación de La huerta del Yayo Juan"
          src={MAP_SRC}
          loading="lazy"
        />
      </section>
    </>
  );
};

export default Contact;
