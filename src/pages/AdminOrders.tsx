import {useEffect, useRef, useState} from 'react';
import type {ChangeEvent} from 'react';
import {useAuth} from '../hooks/useAuth';
import {
  getOrders,
  updateOrder,
  updateOrderStatus,
  exportOrders,
  importOrders
} from '../services/api';
import type {Order, OrderStatus} from '../types/order';
import {Button} from '../components/button/Button';

const ESTADOS: OrderStatus[] = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

const nombreCliente = (user: Order['user']) => {
  if (!user) return 'Usuario eliminado';
  return typeof user === 'string' ? user : user.username;
};

const AdminOrders = () => {
  const {token} = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [editando, setEditando] = useState<Order | null>(null);
  const [message, setMessage] = useState('');
  const [recargar, setRecargar] = useState(0);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) return;

    const loadOrders = async () => {
      const result = await getOrders(token);
      if ('message' in result) {
        setMessage(result.message);
        return;
      }
      setOrders(result);
    };
    loadOrders();
  }, [token, recargar]);

  const handleStatus = async (id: string, status: string) => {
    if (!token) return;

    const result = await updateOrderStatus(token, id, status);

    if ('message' in result) {
      setMessage(result.message);
      return;
    }

    setOrders((current) =>
      current.map((order) => (order._id === id ? {...order, status: result.status} : order))
    );
  };

  const handleExport = async () => {
    if (!token) return;

    const result = await exportOrders(token);
    if (result) setMessage(result.message);
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !token) return;

    const datos = new FormData();
    datos.append('file', file);

    const result = await importOrders(token, datos);
    setMessage(result.message);
    setRecargar(recargar + 1);
  };

  const cambiarCantidad = (productId: string, quantity: number) => {
    if (!editando) return;

    setEditando({
      ...editando,
      items: editando.items.map((item) => (item.product === productId ? {...item, quantity} : item))
    });
  };

  const quitarLinea = (productId: string) => {
    if (!editando) return;

    setEditando({
      ...editando,
      items: editando.items.filter((item) => item.product !== productId)
    });
  };

  const guardar = async () => {
    if (!token || !editando) return;

    const items = editando.items.map((item) => ({
      product: item.product,
      quantity: item.quantity
    }));

    const result = await updateOrder(token, editando._id, items);

    if ('message' in result) {
      setMessage(result.message);
      return;
    }

    setMessage('Pedido actualizado');
    setEditando(null);
    setRecargar(recargar + 1);
  };

  const total = editando
    ? editando.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="admin__layout">
      <div className="admin__panel admin__form surface">
        <div className="admin__head">
          <h2>Actualizar pedido</h2>
        </div>

        {!editando ? (
          <p className="admin__empty">Elige un pedido de la lista para editarlo.</p>
        ) : (
          <div className="user-form">
            {editando.items.map((item) => (
              <div className="admin__line" key={item.product}>
                <label className="user-form__field">
                  {item.name} — {item.price.toFixed(2)} €
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => cambiarCantidad(item.product, Number(event.target.value))}
                  />
                </label>
                <Button variant="ghost" size="sm" onClick={() => quitarLinea(item.product)}>
                  Quitar
                </Button>
              </div>
            ))}

            <p className="admin__total">Total: {total.toFixed(2)} €</p>

            <Button block onClick={guardar}>
              Guardar pedido
            </Button>
            <Button variant="secondary" block onClick={() => setEditando(null)}>
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="admin__panel surface">
        <div className="admin__head">
          <h2>
            Pedidos <span className="admin__count">({orders.length})</span>
          </h2>
          <div className="admin__actions">
            <Button variant="secondary" size="sm" onClick={handleExport}>
              Exportar CSV
            </Button>
            <input
              type="file"
              accept=".csv"
              ref={importInputRef}
              onChange={handleImportFile}
              hidden
            />
            <Button variant="secondary" size="sm" onClick={() => importInputRef.current?.click()}>
              Importar CSV
            </Button>
          </div>
        </div>

        {message && <p className="admin__message">{message}</p>}

        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Artículos</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{nombreCliente(order.user)}</td>
                  <td>
                    {order.items.map((item) => (
                      <div className="admin__item" key={item.product}>
                        {item.name} x{item.quantity} — {(item.price * item.quantity).toFixed(2)} €
                      </div>
                    ))}
                  </td>
                  <td>{order.totalPrice.toFixed(2)} €</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(event) => handleStatus(order._id, event.target.value)}
                    >
                      {ESTADOS.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" onClick={() => setEditando(order)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
