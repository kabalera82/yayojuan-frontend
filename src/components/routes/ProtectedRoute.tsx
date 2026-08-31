import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

const ProtectedRoute = ({adminOnly = false}: {adminOnly?: boolean}) => {
  const {token, user} = useAuth();

  if (!token) {
    return <Navigate to="/cuenta" replace />;
  }

  if (!user) {
    return <p>Cargando...</p>;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
