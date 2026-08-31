import './Home.css';
import artesanal from '../assets/images/artesanal.webp';
import delatierra from '../assets/images/delatierra.webp';
import heroImage from '../assets/images/hero_image.jpg';
import cercania from '../assets/images/cercania.webp';
import {Button} from '../components/button/Button';
import {Card} from '../components/card/Card';

const values = [
  {
    image: cercania,
    title: 'Cultivo de cercanía',
    description:
      'Verduras y hortalizas cultivadas en nuestra huerta de Navarra, sin viajes largos ni intermediarios.'
  },
  {
    image: delatierra,
    title: 'De la tierra a tu mesa',
    description: 'Recogemos cada pedido en su punto justo de maduración, listo para comer.'
  },
  {
    image: artesanal,
    title: 'Cuidado artesanal',
    description: 'Cultivamos con el mismo cariño de siempre, sin prisas y sin químicos de más.'
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
            <Card key={value.title} {...value} />
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
