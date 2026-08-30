import type {ProductCardProps} from '../../types/props';
import './ProductCard.css';

const ProductCard = ({product, onAddToCart}: ProductCardProps) => (
  <article className="product-card">
    <img className="product-card__image" src={product.image} alt={product.name} />
    <div className="product-card__body">
      <span className="product-card__category">{product.category.name}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__price">{product.price.toFixed(2)} €</p>
    </div>
    {onAddToCart && (
      <button type="button" className="product-card__add" onClick={() => onAddToCart(product)}>
        Agregar al carrito
      </button>
    )}
  </article>
);

export default ProductCard;
