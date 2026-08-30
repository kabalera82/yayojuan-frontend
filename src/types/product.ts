import type {Category} from './category';

// 1 = enero ... 12 = diciembre. Si startMonth > endMonth, la temporada cruza el fin de
// año (p. ej. 10 a 2 = octubre-febrero).
export interface Season {
  startMonth: number;
  endMonth: number;
}

// Forma en la que llega un producto desde la API (GET): category ya viene
// poblada con el objeto completo, no solo su id.
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

// Forma para crear/actualizar un producto: category va como id (string),
// que es lo que espera el backend en el cuerpo de la petición.
export interface ProductInput {
  name: string;
  category: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  season?: Season;
}
