import type {CardProps} from './cardProps';
import {Button} from '../button/Button';
import './Card.css';

export const Card = ({
  variant = 'value',
  image,
  title,
  description,
  category,
  price,
  onAdd
}: CardProps) => (
  <article className={`card card--${variant} surface`}>
    <img className="card__image" src={image} alt={title} loading="lazy" />
    <div className="card__body">
      {category && <span className="card__category">{category}</span>}
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>
      {price !== undefined && <p className="card__price">{price.toFixed(2)} €</p>}
      {onAdd && <Button onClick={onAdd}>Agregar al carrito</Button>}
    </div>
  </article>
);
