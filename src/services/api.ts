import type {
  User,
  LoginResponse,
  RegisterResponse,
  ErrorResponse,
  MessageResponse,
  RegisterPayload,
  LoginPayload
} from '../types/user';
import type {Product, Category} from '../types/product';
import type {Order} from '../types/order';

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface OrderRequestItem {
  product: string;
  quantity: number;
}

// Registro usuario
const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

// Login usuario
const loginUser = async (credentials: LoginPayload): Promise<LoginResponse | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return res.json();
};

// Usuario actual
const getMe = async (token: string): Promise<User | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

// Actualizar usuario
const updateUser = async (
  token: string,
  username: string,
  userSurname: string,
  email: string,
  phone: string
): Promise<ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({username, userSurname, email, phone})
  });
  return res.json();
};

// Actualizar password
const updatePassword = async (
  token: string,
  currentPassword: string,
  newPassword: string
): Promise<ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/me/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({currentPassword, newPassword})
  });
  return res.json();
};

// Envía un mensaje de contacto
const sendContactMessage = async (payload: ContactPayload): Promise<MessageResponse> => {
  const res = await fetch(`${VITE_API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

// Lista los productos, opcionalmente filtrados por categoría
const getProducts = async (categoryId?: string): Promise<Product[] | ErrorResponse> => {
  const query = categoryId ? `?category=${categoryId}` : '';
  const res = await fetch(`${VITE_API_URL}/products${query}`);
  return res.json();
};

// Solicita un pedido con el contenido del carrito
const requestOrder = async (
  token: string,
  items: OrderRequestItem[]
): Promise<Order | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/orders/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({items})
  });
  return res.json();
};

// Lista las categorías
const getCategories = async (): Promise<Category[] | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/categories`);
  return res.json();
};

export {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  updatePassword,
  sendContactMessage,
  getProducts,
  getCategories,
  requestOrder
};
