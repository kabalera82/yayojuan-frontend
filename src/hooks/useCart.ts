import {useEffect, useMemo, useState} from 'react';
import {getProducts} from '../services/api';
import type {Product} from '../types/product';

export type CartProduct = Product & {quantity: number};

// En el navegador solo guardamos qué producto y cuánto.
// Nombre, precio y stock son del servidor y se piden a la API.
type CartLine = {_id: string; quantity: number};

const STORAGE_KEY = 'cart';
const MIN_ITEMS = 1;

const getInitialLines = (): CartLine[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }
    return JSON.parse(saved).map((line: CartLine) => ({
      _id: line._id,
      quantity: line.quantity
    }));
  } catch {
    return [];
  }
};

export const useCart = () => {
  const [lines, setLines] = useState<CartLine[]>(getInitialLines);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts();
      if ('message' in result) {
        return;
      }
      setProducts(result);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  // Lo que se ve se resuelve contra los productos recién traídos, nunca contra una copia guardada
  const cart = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = products.find((entry) => entry._id === line._id);
        return product ? [{...product, quantity: line.quantity}] : [];
      }),
    [lines, products]
  );

  const stockOf = (id: string) => products.find((entry) => entry._id === id)?.stock ?? 0;

  const addToCart = (product: Product) => {
    setLines((current) => {
      const existing = current.find((line) => line._id === product._id);

      if (!existing) {
        return [...current, {_id: product._id, quantity: 1}];
      }

      if (existing.quantity >= product.stock) {
        return current;
      }

      return current.map((line) =>
        line._id === product._id ? {...line, quantity: line.quantity + 1} : line
      );
    });
  };

  const removeFromCart = (id: string) => {
    setLines((current) => current.filter((line) => line._id !== id));
  };

  const increaseQuantity = (id: string) => {
    setLines((current) =>
      current.map((line) =>
        line._id === id && line.quantity < stockOf(id)
          ? {...line, quantity: line.quantity + 1}
          : line
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setLines((current) =>
      current.map((line) =>
        line._id === id && line.quantity > MIN_ITEMS ? {...line, quantity: line.quantity - 1} : line
      )
    );
  };

  const clearCart = () => {
    setLines([]);
  };

  return {cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart};
};
