import {useEffect, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import {getProducts, deleteProduct, exportProducts, importProducts} from '../services/api';
import type {Product} from '../types/product';
import ProductForm from '../components/forms/ProductForm';
import {Card} from '../components/card/Card';
import {Button} from '../components/button/Button';

const AdminProducts = () => {
  const {token} = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [editando, setEditando] = useState<Product | null>(null);
  const [message, setMessage] = useState('');
  const [recargar, setRecargar] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts();
      if ('message' in result) {
        setMessage(result.message);
        return;
      }
      setProducts(result);
    };
    loadProducts();
  }, [recargar]);

  const handleExport = async () => {
    if (!token) return;

    const result = await exportProducts(token);
    setMessage(result.message);
  };

  const handleImport = async () => {
    if (!token) return;

    const result = await importProducts(token);
    setMessage(result.message);
    setRecargar(recargar + 1);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    const result = await deleteProduct(token, id);
    setMessage(result.message);

    if (editando?._id === id) setEditando(null);
    setProducts((current) => current.filter((product) => product._id !== id));
  };

  const guardado = () => {
    setEditando(null);
    setRecargar(recargar + 1);
  };

  return (
    <div className="admin__layout">
      <div className="admin__panel admin__form surface">
        <ProductForm
          key={editando?._id ?? 'nuevo'}
          product={editando}
          onSuccess={guardado}
          onCancel={() => setEditando(null)}
        />
      </div>

      <div className="admin__panel surface">
        <div className="admin__head">
          <h2>
            Productos <span className="admin__count">({products.length})</span>
          </h2>
          <div className="admin__actions">
            <Button variant="secondary" size="sm" onClick={handleExport}>
              Exportar CSV
            </Button>
            <Button variant="secondary" size="sm" onClick={handleImport}>
              Importar CSV
            </Button>
          </div>
        </div>

        {message && <p className="admin__message">{message}</p>}

        <div className="admin__cards">
          {products.map((product) => (
            <div key={product._id}>
              <Card
                variant="product"
                image={product.image}
                category={product.category.name}
                title={product.name}
                description={product.description}
                price={product.price}
              />
              <div className="admin__actions">
                <Button variant="ghost" size="sm" onClick={() => setEditando(product)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
