export interface Address {
  _id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CartItem {
  _id: string;
  product: string;
  quantity: number;
}

export interface User {
  _id: string;
  username: string;
  userSurname: string;
  email: string;
  phone: string;
  addresses: Address[];
  role: 'customer' | 'admin';
  cart: CartItem[];
  wishlist: string[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

// El backend siempre responde así cuando el cuerpo es solo un mensaje: tanto en
// éxito (register, actualizar perfil, actualizar contraseña) como en error (400).
export interface MessageResponse {
  message: string;
}

export type RegisterResponse = MessageResponse;
export type ErrorResponse = MessageResponse;
export type UserResponse = User;

// Para endpoints donde éxito y error tienen la misma forma ({message}) y la única
// manera real de distinguirlos es el status HTTP (res.ok).
export interface ActionResult {
  ok: boolean;
  message: string;
}
