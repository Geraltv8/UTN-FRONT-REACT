# TP Módulo Proveedores

## Probar
1. Backend (UTN-prog-iv-example): `npm install` y `npm run dev` (puerto 3000, con su .env y Mongo).
2. Front: `npm install` y `npm run dev` (puerto 5173, ya permitido por el CORS del backend).
3. Crear un usuario ADMIN: POST http://localhost:3000/api/login  body: {"email","password","rol":"ADMIN"}
4. Entrar en http://localhost:5173/login. Solo un ADMIN puede crear proveedores (403 si es VENDEDOR).

## Archivos nuevos / modificados
- src/services/api.js, authService.js, proveedorService.js
- src/components/ProveedorCard.jsx, ProtectedRoute.jsx, Navbar.jsx
- src/pages/Proveedores.jsx, Login.jsx, Dashboard.jsx
- src/App.jsx (rutas; /proveedores dentro de ProtectedRoute)

## Entrega
git checkout -b feature/crud-proveedores
git add . && git commit -m "feat: implementado CRUD completo de proveedores"
git push origin feature/crud-proveedores   -> abrir Pull Request con nombre completo y decisiones de diseño.
