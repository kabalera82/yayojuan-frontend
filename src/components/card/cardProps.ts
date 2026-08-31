export type CardProps = {
  variant?: 'value' | 'product';
  image: string;
  title: string;
  description: string;
  category?: string;
  price?: number;
  onAdd?: () => void;
};
