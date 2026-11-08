# Gestión de proveedores

Frontend en React para administrar proveedores del backend de Programación IV. La aplicación separa las llamadas HTTP, los componentes visuales y las páginas, y protege el directorio con autenticación JWT.

## Requisitos

- Node.js y npm.
- El backend [UTN-prog-iv-example](https://github.com/Geraltv8/UTN-prog-iv-example) ejecutándose en `http://localhost:3000`.
- Una cuenta registrada en el backend. El registro de proveedores requiere el rol `ADMIN`.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrí la URL que informa Vite (por defecto `http://localhost:5173`) e iniciá sesión con las credenciales del backend.

Para configurar otra URL de API, definí `VITE_API_URL` en un archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Arquitectura

- `src/services/api.js`: instancia Axios e interceptor para enviar el JWT como `Bearer`.
- `src/services/authService.js`: inicio de sesión.
- `src/services/proveedorService.js`: consultas, registro y calificación de proveedores.
- `src/components/`: tarjeta reutilizable y protección de rutas.
- `src/pages/`: login y pantalla de gestión.

La ruta `/proveedores` requiere el token emitido por `POST /api/login/login`. El backend disponible permite listar (`GET /api/proveedores`), registrar (`POST /api/proveedores`) y calificar (`PATCH /api/proveedores/:id/calificacion`). No expone endpoints para editar los demás datos ni eliminar proveedores.

## Validación

```bash
npm run lint
npm run build
```
