export interface User {
  _id: string;
  username: string;
  userSurname: string;
  email: string;
  phone: string;
  addresses: Address[];
  role: 'customer' | 'admin';
  wishlist: string[];
}

export interface UserFormProps {
  mode: 'register' | 'update' | 'create';
  onSuccess?: () => void;
}

export interface Address {
  _id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface AddressResponse {
  message: string;
  addresses?: Address[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface MessageResponse {
  message: string;
}

export type RegisterResponse = MessageResponse;
export type ErrorResponse = MessageResponse;

export interface RegisterPayload {
  username: string;
  userSurname: string;
  email: string;
  phone: string;
  password: string;
}
