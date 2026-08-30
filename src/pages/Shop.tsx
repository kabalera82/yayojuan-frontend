import {useEffect, useState} from 'react';
import './Shop.css';
import {getProducts, getCategories} from '../services/api';
import type {Product, Category} from '../types/product';
import ProductCard from '../components/productcard/ProductCard';
import Cart from '../components/cart/Cart';
import {useCart} from '../hooks/useCart';

const Shop = () => {
  const {cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} =
    useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories();
      if ('message' in result) {
        setMessage(result.message);
        return;
      }
      setCategories(result);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const result = await getProducts(selectedCategory || undefined);

      if ('message' in result) {
        setMessage(result.message);
        setLoading(false);
        return;
      }

      setProducts(result);
      setLoading(false);
    };
    loadProducts();
  }, [selectedCategory]);

  return (
    <section className="shop">
      <h1>Tienda</h1>

      <div className="shop__filters">
        <button
          type="button"
          className={`shop__filter ${selectedCategory === '' ? 'shop__filter--active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            className={`shop__filter ${
              selectedCategory === category._id ? 'shop__filter--active' : ''
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {message && <p className="shop__message">{message}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="shop__grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}

      <section className="shop__cart">
        <h2>Tu carrito</h2>
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
        />
      </section>
    </section>
  );
};

export default Shop;
