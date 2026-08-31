# 🌿 La huerta del Yayo Juan

**La tienda online de una huerta familiar de Navarra.**

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

El Yayo Juan cultiva fruta y verdura de temporada, y aquí cualquiera puede entrar, ver lo que hay esta semana, crearse una cuenta, meter cosas en el carrito y pedirlas. En cuanto alguien hace un pedido o escribe por el formulario de contacto, le llega un aviso directo por Telegram — sin paneles ni complicaciones.

Esta carpeta es la parte que ve y toca el cliente en su navegador.

---

## 🚀 Ponerla a andar

```bash
npm install
cp .env.example .env
```

Abre el `.env` recién creado y rellena la dirección del backend (`VITE_API_URL`) y, si quieres ver el mapa de la página de contacto, sus coordenadas. Con eso listo:

```bash
npm run dev
```

Y ya tienes la web corriendo en local, recargándose sola cada vez que guardas un cambio.

> El backend tiene que estar levantado para que la tienda, el login y el contacto funcionen de verdad — [su README está aquí](../backend/README.md).

## 📜 Comandos disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo, con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve ese build en local, para comprobarlo antes de publicar |
| `npm run lint` | Revisa el código en busca de errores |
| `npm run format` | Lo ordena automáticamente |

## 🧺 Qué hay dentro

- **Inicio** — hero, presentación y llamada a la tienda.
- **Tienda** — catálogo con filtro por categoría y carrito de la compra.
- **Mi cuenta** — registro, inicio de sesión, editar perfil, cambiar contraseña.
- **Contacto** — un formulario y un mapa de dónde está la huerta.
- **Tema claro/oscuro** — se recuerda entre visitas.

## 📚 Si necesitas saber más

Este README se queda en la superficie a propósito. La arquitectura completa, cada pantalla explicada con calma, y qué queda pendiente por hacer, vive en [`docs/`](../docs/frontend01.md), repartida en varios documentos cortos en vez de uno interminable.
