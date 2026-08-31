export interface Category {
  _id: string;
  name: string;
}

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
