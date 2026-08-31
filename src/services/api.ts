import type {
  User,
  LoginResponse,
  RegisterResponse,
  ErrorResponse,
  MessageResponse,
  RegisterPayload,
  LoginPayload,
  AddressResponse
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

interface AddressPayload {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

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

const getMe = async (token: string): Promise<User | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

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

const getProducts = async (categoryId?: string): Promise<Product[] | ErrorResponse> => {
  const query = categoryId ? `?category=${categoryId}` : '';
  const res = await fetch(`${VITE_API_URL}/products${query}`);
  return res.json();
};

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

const getCategories = async (): Promise<Category[] | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/categories`);
  return res.json();
};

const addAddress = async (token: string, payload: AddressPayload): Promise<AddressResponse> => {
  const res = await fetch(`${VITE_API_URL}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({...payload, isDefault: true})
  });
  return res.json();
};

const updateAddress = async (
  token: string,
  addressId: string,
  payload: AddressPayload
): Promise<AddressResponse> => {
  const res = await fetch(`${VITE_API_URL}/addresses/${addressId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

const createProduct = async (token: string, datos: FormData): Promise<Product | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: datos
  });
  return res.json();
};

const createUser = async (
  token: string,
  payload: RegisterPayload & {role: string}
): Promise<MessageResponse> => {
  const res = await fetch(`${VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

const updateProduct = async (
  token: string,
  id: string,
  datos: FormData
): Promise<Product | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: datos
  });
  return res.json();
};

const deleteProduct = async (token: string, id: string): Promise<MessageResponse> => {
  const res = await fetch(`${VITE_API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

const descargar = (blob: Blob, nombre: string) => {
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  enlace.click();
  URL.revokeObjectURL(url);
};

const exportProducts = async (token: string): Promise<MessageResponse | null> => {
  const res = await fetch(`${VITE_API_URL}/products/export`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    return res.json();
  }

  descargar(await res.blob(), 'productos.csv');
  return null;
};

const importProducts = async (token: string, datos: FormData): Promise<MessageResponse> => {
  const res = await fetch(`${VITE_API_URL}/products/import`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: datos
  });
  return res.json();
};

const exportOrders = async (token: string): Promise<MessageResponse | null> => {
  const res = await fetch(`${VITE_API_URL}/orders/export`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    return res.json();
  }

  descargar(await res.blob(), 'pedidos.csv');
  return null;
};

const importOrders = async (token: string, datos: FormData): Promise<MessageResponse> => {
  const res = await fetch(`${VITE_API_URL}/orders/import`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: datos
  });
  return res.json();
};

const getOrders = async (token: string): Promise<Order[] | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

const updateOrderStatus = async (
  token: string,
  id: string,
  status: string
): Promise<Order | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({status})
  });
  return res.json();
};

const updateOrder = async (
  token: string,
  id: string,
  items: OrderRequestItem[]
): Promise<Order | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({items})
  });
  return res.json();
};

const getUsers = async (token: string): Promise<User[] | ErrorResponse> => {
  const res = await fetch(`${VITE_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

const deleteUser = async (token: string, id: string): Promise<MessageResponse> => {
  const res = await fetch(`${VITE_API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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
  requestOrder,
  addAddress,
  updateAddress,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
  importProducts,
  exportOrders,
  importOrders,
  createUser,
  getOrders,
  updateOrderStatus,
  updateOrder,
  getUsers,
  deleteUser
};
