# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added

- Scaffold inicial del frontend: Vite + React 19 + TypeScript, con ESLint, Prettier y
  `react-router-dom` instalado (sin rutas todavía).
- Script `format` (`prettier --write .`) en `package.json`.
- Enrutado básico con `react-router-dom`: `Home` y página 404 (`NotFound`).
- Navbar con marca y enlaces de navegación (`NavLinks`, reutilizado también en el footer).
- Footer con enlaces a redes sociales.
- Color de acento (`--accent`) en `index.css`, aplicado al navbar, footer y estados
  activo/hover de los enlaces.
- Rediseño de la home: hero con imagen, sección de valores y CTA, con componentes
  reutilizables `Button` y `ValueCard`.
- Autenticación completa: registro, login, ver/actualizar perfil, cambiar contraseña
  y cerrar sesión (`AuthContext`, `UserForm`, `UpdatePasswordForm`, `ProtectedRoute`),
  con el enlace "Acceder"/"Cuenta" del nav cambiando según el estado de sesión.
- Selector de tema claro/oscuro (`useTheme`, `ThemeToggle`), persistido en `localStorage`.
- Página de tienda (`/shop`) con catálogo de productos y filtro por categoría.
- Página "Conócenos" (`/conocenos`) con formulario de contacto (guarda en el backend y
  avisa por Telegram) y mapa de localización.
- Carrito de la compra (`useCart`, `Cart`) integrado en la tienda: añadir productos,
  cambiar cantidades, eliminar líneas y solicitar el pedido, que se envía al backend y
  avisa por Telegram. Requiere sesión iniciada.
- Componente `Card` reutilizable (`variant="value" | "product"`), que sustituye a
  `ValueCard` y `ProductCard`.
- Menú de navegación plegable en móvil (`Navbar`).
- Utilidades compartidas en `index.css`: `.container`, `.surface`, `.table`,
  `.scroll-x`, y estilos para `select`.

### Changed

- Los hooks propios viven en `src/hooks/` y los tipos compartidos en `src/types/`. Los
  tipos que usa un solo módulo se declaran junto a él.
- `Category` se declara en `types/product.ts` y desaparece `types/category.ts`.
- El carrito solo guarda el id y la cantidad en `localStorage`. Nombre, precio y stock
  se leen siempre de la API, así que ya no se muestran precios obsoletos.
- `Button` es ahora el único componente de botón de la web: acepta `to` para pintarse
  como enlace, o `type`/`onClick` para `<button>`, con variantes
  `primary | secondary | ghost | danger` y tamaños `md | sm | icon`.
- La página "Conócenos" pasa a llamarse "Contacto" (`/contact`), con sus clases y
  componentes renombrados.
- `ProtectedRoute` admite la prop `adminOnly`, además de exigir sesión iniciada.
- El contexto de sesión (`AuthContext`) y su tipo (`context/auth.ts`) quedan separados
  del hook `useAuth`, evitando el aviso de Fast Refresh de React.
- El carrito, el navbar, el footer, la home, la tienda y la página de contacto
  reducen su altura y separación para caber sin scroll en pantallas de escritorio
  habituales, y el carrito pasa a lista compacta en móvil.

### Removed

- `CartItem` y el campo `cart` del tipo `User`: el backend ya no guarda el carrito.
- `ValueCard`, `ProductCard` y `LogoutButton`: sustituidos por `Card` y la variante
  `danger` de `Button`.
- `types/props.ts`: cada tipo pasa al archivo que lo usa, o se declara junto al
  componente si solo lo usa uno.

### Fixed

- Formateo con Prettier aplicado a los ficheros que no cumplían la configuración del
  proyecto (`eslint.config.js`, `prettier.config.cjs`, `README.md`, `src/main.tsx`,
  `tsconfig.json`, `vite.config.ts`).
- El contexto de sesión no exportaba `AuthContext` y declaraba dos veces `useAuth`, lo
  que rompía la compilación.
- El tipo de `token` no admitía `null`, aunque `localStorage.getItem` puede devolverlo.
- `ProtectedRoute` redirigía a `/login`, una ruta que no existe.
