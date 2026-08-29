import {Link} from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className="not-found">
      <h1>Página no encontrada</h1>
      <Link to="/">Volver a inicio</Link>
    </section>
  );
};

export default NotFound;
