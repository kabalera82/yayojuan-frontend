import {useEffect, useState} from 'react';
import type {SubmitEvent} from 'react';
import './UserForm.css';
import {useAuth} from '../../hooks/useAuth';
import {createProduct, updateProduct, getCategories} from '../../services/api';
import type {Category, Product} from '../../types/product';
import {Button} from '../button/Button';

type ProductFormProps = {
  product?: Product | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const ProductForm = ({product, onSuccess, onCancel}: ProductFormProps) => {
  const {token} = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(product?.name ?? '');
  const [category, setCategory] = useState(product?.category._id ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [stock, setStock] = useState(product ? String(product.stock) : '');
  const [image, setImage] = useState<File | null>(null);

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories();
      if ('message' in result) {
        setMessage(result.message);
        return;
      }
      setCategories(result);
    };
    loadCategories();
  }, []);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    const form = event.currentTarget;

    setSubmitting(true);
    setMessage('');

    try {
      const datos = new FormData();
      datos.append('name', name);
      datos.append('category', category);
      datos.append('description', description);
      datos.append('price', price);
      datos.append('stock', stock);
      if (image) datos.append('image', image);

      const result = product
        ? await updateProduct(token, product._id, datos)
        : await createProduct(token, datos);

      if ('message' in result) {
        setMessage(result.message);
        return;
      }

      setMessage(
        product ? `Producto "${result.name}" actualizado` : `Producto "${result.name}" creado`
      );

      if (!product) {
        setName('');
        setCategory('');
        setDescription('');
        setPrice('');
        setStock('');
        setImage(null);
        form.reset();
      }

      onSuccess?.();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo conectar con el servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{product ? 'Editar producto' : 'Nuevo producto'}</h2>

      <label className="user-form__field">
        Nombre
        <input value={name} onChange={(event) => setName(event.target.value)} required />
      </label>

      <label className="user-form__field">
        Categoría
        <select value={category} onChange={(event) => setCategory(event.target.value)} required>
          <option value="">Elige una categoría</option>
          {categories.map((entry) => (
            <option key={entry._id} value={entry._id}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>

      <label className="user-form__field">
        Descripción
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
        />
      </label>

      <label className="user-form__field">
        Precio (€)
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        Stock
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          required
        />
      </label>

      <label className="user-form__field">
        Imagen
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
        />
      </label>

      {message && <p className="user-form__message">{message}</p>}

      <Button type="submit" block disabled={submitting}>
        {product ? 'Guardar cambios' : 'Crear producto'}
      </Button>

      {product && (
        <Button variant="secondary" block onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </form>
  );
};

export default ProductForm;
