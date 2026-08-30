import type {ValueCardProps} from '../../types/props';
import './ValueCard.css';

export const ValueCard = ({icon, title, description}: ValueCardProps) => (
  <article className="value-card">
    <div className="value-card__icon">{icon}</div>
    <h3 className="value-card__title">{title}</h3>
    <p className="value-card__description">{description}</p>
  </article>
);
