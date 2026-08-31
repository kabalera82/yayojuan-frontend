import {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {requestOrder} from '../../services/api';
import type {CartProduct} from '../../hooks/useCart';
import {Button} from '../button/Button';
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

  const cartTotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);

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

    setMessage('Pedido solicitado');
    clearCart();
  };

  return (
    <div className="cart surface">
      {cart.length === 0 ? (
        <p className="cart__empty">El carrito está vacío</p>
      ) : (
        <>
          <div className="scroll-x">
            <table className="table">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          ariaLabel={`Quitar una unidad de ${item.name}`}
                          onClick={() => decreaseQuantity(item._id)}
                        >
                          ➖
                        </Button>
                        {item.quantity}
                        <Button
                          variant="ghost"
                          size="icon"
                          ariaLabel={`Añadir una unidad de ${item.name}`}
                          onClick={() => increaseQuantity(item._id)}
                        >
                          ➕
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="icon"
                        ariaLabel={`Eliminar ${item.name} del carrito`}
                        onClick={() => removeFromCart(item._id)}
                      >
                        ✖️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cart__total">
            Total a pagar: <span>{cartTotal.toFixed(2)} €</span>
          </p>

          <Button block disabled={submitting} onClick={handleRequestOrder}>
            Solicitar pedido
          </Button>

          {message && <p className="cart__message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
