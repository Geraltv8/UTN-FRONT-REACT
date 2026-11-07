# Trabajo Práctico Módulo 5 - Proveedores

Frontend en React para el TP de Programación IV. Partí del [ejemplo de la materia](https://github.com/Geraltv8/UTN-FRONT-REACT) y agregué la gestión de proveedores, manteniendo el catálogo de productos que ya estaba.

## Qué se puede hacer

- Iniciar sesión para obtener el token del backend.
- Ver el listado de proveedores.
- Registrar un proveedor nuevo, con validaciones de CUIT y correo electrónico.
- Calificar proveedores con 1 a 5 estrellas.
- Buscar proveedores por nombre, CUIT o ciudad.
- Navegar entre inicio, catálogo de productos y proveedores.

La aplicación usa Axios, React Router DOM y Bootstrap. Organicé el código en `services/`, `components/` y `pages/`, como vimos en la guía.

## Cómo probar

Primero hay que tener el [backend del docente](https://github.com/Geraltv8/UTN-prog-iv-example) funcionando en `http://localhost:3000`, con MongoDB configurado.

Después, en una terminal dentro del frontend:

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173` y entrar con un usuario registrado en el backend. Para dar de alta proveedores se necesita un usuario con rol **ADMIN**, ya que la API controla ese permiso.

También hay algunas pruebas unitarias para las validaciones y el filtrado:

```bash
npm test
```

## Detalles de la API

- `POST /api/login/login`: iniciar sesión y recibir JWT.
- `GET /api/proveedores`: obtener listado.
- `POST /api/proveedores`: registrar proveedor (requiere rol ADMIN).
- `PATCH /api/proveedores/:id/calificacion`: cambiar la puntuación.

El token se guarda en `localStorage` y Axios lo agrega a las solicitudes mediante un interceptor. Para desarrollo local se usa el proxy de Vite hacia el backend; si la API está en otro servidor se puede configurar `VITE_API_URL`.

El backend que utilizamos no tiene rutas PUT ni DELETE de proveedores, así que trabajé con las tres operaciones que realmente ofrece.

Incluí en `docs/transcripcion-audio.md` una transcripción editada del audio donde se explicó el TP.

**Alumno: Carlos Dualibe**
