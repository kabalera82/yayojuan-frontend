import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import ProtectedRoute from './components/routes/ProtectedRoute';
import {AuthProvider} from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cuenta" element={<Account />} />

            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="admin" element={<Admin />}>
                <Route index element={<Navigate to="productos" replace />} />
                <Route path="productos" element={<AdminProducts />} />
                <Route path="usuarios" element={<AdminUsers />} />
                <Route path="pedidos" element={<AdminOrders />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
