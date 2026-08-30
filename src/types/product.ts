// Categoria de producto
export interface Category {
  _id: string;
  name: string;
}

// Producto
export interface Season {
  startMonth: number;
  endMonth: number;
}

export interface Product {
  _id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  stock: number;
  image: string;
  season?: Season;
}

export interface ProductInput {
  name: string;
  category: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  season?: Season;
}
