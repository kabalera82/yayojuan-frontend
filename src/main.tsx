import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Conocenos from './pages/Conocenos';
import Shop from './pages/Shop';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import {AuthProvider} from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="conocenos" element={<Conocenos />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cuenta" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
