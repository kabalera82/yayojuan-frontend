// Línea de un pedido: copia congelada del nombre y precio del producto en el
// momento de la compra, no el producto actual.
export interface OrderItem {
  _id: string;
  product: string;
  name: string;
  quantity: number;
  price: number;
}

// Copia de la dirección elegida en el momento del pedido.
export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

// El campo user viene como id (string) en "mis pedidos", y poblado con
// username/email cuando lo lista un admin o se consulta el detalle.
export interface Order {
  _id: string;
  user: string | {_id: string; username: string; email: string};
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
