import {useMemo, useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {requestOrder} from '../../services/api';
import type {CartProduct} from '../../hooks/useCart';
import '../button/Button.css';
import './Cart.css';

type CartProps = {
  cart: CartProduct[];
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

const Cart = ({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}: CartProps) => {
  const {token} = useAuth();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  const handleRequestOrder = async () => {
    if (!token) {
      setMessage('Inicia sesión para solicitar el pedido');
      return;
    }

    setSubmitting(true);
    setMessage('');

    const items = cart.map((item) => ({product: item._id, quantity: item.quantity}));
    const result = await requestOrder(token, items);

    setSubmitting(false);

    if ('message' in result) {
      setMessage(result.message);
      return;
    }

    alert('Pedido solicitado');
    clearCart();
  };

  return (
    <div className="cart">
      {isEmpty ? (
        <p className="cart__empty">El carrito está vacío</p>
      ) : (
        <>
          <table className="cart__table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img className="cart__image" src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td className="cart__price">{item.price.toFixed(2)} €</td>
                  <td>
                    <div className="cart__quantity">
                      <button
                        type="button"
                        className="cart__button"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        type="button"
                        className="cart__button"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="cart__button cart__button--danger"
                      onClick={() => removeFromCart(item._id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="cart__total">
            Total a pagar: <span>{cartTotal.toFixed(2)} €</span>
          </p>

          <button
            type="button"
            className="button button--primary button--block"
            onClick={handleRequestOrder}
            disabled={submitting}
          >
            Solicitar pedido
          </button>

          {message && <p className="cart__message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
