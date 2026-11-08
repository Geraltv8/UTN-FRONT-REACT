# Gestión de proveedores

Aplicación React para iniciar sesión y gestionar el directorio de proveedores de la API de UTN.

## Requisitos

- Node.js y npm
- Backend `UTN-prog-iv-example` ejecutándose en `http://localhost:3000`
- Usuario habilitado en el backend

## Desarrollo local

```sh
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. Si la API corre en otra URL, crear un archivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

El backend permite el origen `http://localhost:5173` por CORS.

## Funcionalidad

- Inicio de sesión mediante `POST /api/login/login`.
- La ruta `/proveedores` requiere el token JWT; las solicitudes autenticadas envían `Authorization: Bearer <token>`.
- Alta de proveedores con `POST /api/proveedores` y listado con `GET /api/proveedores`.
- Calificación con `PATCH /api/proveedores/:id/calificacion`.
- La API de referencia no implementa edición general ni eliminación de proveedores. El alta requiere rol `ADMIN`; el rol y los permisos se verifican en el backend.

## Verificación

```sh
npm run lint
npm run build
```
