import {useEffect, useState} from 'react';
import './Shop.css';
import {getProducts, getCategories} from '../services/api';
import type {Product, Category} from '../types/product';
import {Card} from '../components/card/Card';
import Cart from '../components/cart/Cart';
import {Button} from '../components/button/Button';
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
    <section className="shop container">
      <h1>Tienda</h1>

      <div className="shop__filters">
        <Button
          variant="ghost"
          size="sm"
          active={selectedCategory === ''}
          onClick={() => setSelectedCategory('')}
        >
          Todas
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant="ghost"
            size="sm"
            active={selectedCategory === category._id}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {message && <p className="shop__message">{message}</p>}

      <div className="shop__layout">
        <div className="shop__catalog">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="shop__grid">
              {products.map((product) => (
                <Card
                  key={product._id}
                  variant="product"
                  image={product.image}
                  category={product.category.name}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  onAdd={() => addToCart(product)}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="shop__cart">
          <h2>Tu carrito</h2>
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
          />
        </aside>
      </div>
    </section>
  );
};

export default Shop;
