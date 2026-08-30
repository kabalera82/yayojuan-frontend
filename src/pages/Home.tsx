import './Home.css';
import heroImage from '../assets/images/hero_image.jpg';
import {Button} from '../components/button/Button';
import {ValueCard} from '../components/valuecard/ValueCard';
import type {Value} from '../types/props';

const values: Value[] = [
  {
    title: 'Cultivo de cercanía',
    description:
      'Verduras y hortalizas cultivadas en nuestra huerta de Navarra, sin viajes largos ni intermediarios.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 21c8 0 14-6 14-14V5h-2C9 5 5 11 5 19v2Z" />
        <path d="M5 21c3-5 6-8 11-11" />
      </svg>
    )
  },
  {
    title: 'De la tierra a tu mesa',
    description: 'Recogemos cada pedido en su punto justo de maduración, listo para comer.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10h16l-1.5 9a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 10Z" />
        <path d="M8 10 9 5" />
        <path d="M16 10l-1-5" />
        <path d="M9 14v3M12 14v3M15 14v3" />
      </svg>
    )
  },
  {
    title: 'Cuidado artesanal',
    description: 'Cultivamos con el mismo cariño de siempre, sin prisas y sin químicos de más.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20s-7-4.35-9.5-8.5C.8 8 2 4.5 5.5 4a4.7 4.7 0 0 1 6.5 2 4.7 4.7 0 0 1 6.5-2c3.5.5 4.7 4 3 7.5C19 15.65 12 20 12 20Z" />
      </svg>
    )
  }
];

const Home = () => {
  return (
    <>
      <section className="hero">
        <img className="hero__image" src={heroImage} alt="El Yayo Juan recogiendo la cosecha" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1>La huerta del Yayo Juan</h1>
          <p>Productos naturales de Navarra, cultivados con cuidado y cariño.</p>
          <div className="hero__actions">
            <Button to="/shop">Ver la tienda</Button>
            <Button to="/conocenos" variant="secondary">
              Conócenos
            </Button>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="values__grid">
          {values.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Descubre la cosecha de esta semana</h2>
        <p>Fruta y verdura de temporada, recién recogida de la huerta.</p>
        <Button to="/shop">Ir a la tienda</Button>
      </section>
    </>
  );
};

export default Home;
