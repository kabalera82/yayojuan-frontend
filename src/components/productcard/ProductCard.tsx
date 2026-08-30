import type {Product} from '../../types/product';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({product}: ProductCardProps) => (
  <article className="product-card">
    <img className="product-card__image" src={product.image} alt={product.name} />
    <div className="product-card__body">
      <span className="product-card__category">{product.category.name}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">{product.price.toFixed(2)} €</p>
    </div>
  </article>
);
