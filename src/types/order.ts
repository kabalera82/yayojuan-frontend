export interface OrderItem {
  _id: string;
  product: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

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
