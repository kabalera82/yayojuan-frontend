import {NavLink, Outlet} from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  return (
    <section className="admin container">
      <h1>Panel Administrador</h1>

      <nav className="admin__tabs">
        <NavLink className="admin__tab" to="/admin/productos">
          Productos
        </NavLink>
        <NavLink className="admin__tab" to="/admin/usuarios">
          Usuarios
        </NavLink>
        <NavLink className="admin__tab" to="/admin/pedidos">
          Pedidos
        </NavLink>
      </nav>

      <Outlet />
    </section>
  );
};

export default Admin;
