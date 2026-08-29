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

### Fixed

- Formateo con Prettier aplicado a los ficheros que no cumplían la configuración del
  proyecto (`eslint.config.js`, `prettier.config.cjs`, `README.md`, `src/main.tsx`,
  `tsconfig.json`, `vite.config.ts`).
