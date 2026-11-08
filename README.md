# UTN Front React

Panel de gestión de proveedores desarrollado con React, siguiendo una
arquitectura por capas:

- `src/services`: comunicación con el backend.
- `src/components`: componentes visuales reutilizables.
- `src/pages`: vistas y lógica de la aplicación.
- `src/App.jsx`: configuración de las rutas.

## Requisitos

- Node.js.
- El backend `UTN-prog-iv-example`.
- MongoDB Atlas o una instancia local de MongoDB.
- Un usuario con rol `ADMIN` para crear proveedores.

## Instalación

Desde esta carpeta:

```bash
npm install
```

## Configuración y ejecución del backend

El backend necesita un archivo `.env` en su carpeta raíz con sus variables de
entorno, incluyendo:

```env
MONGO_URI=tu cadena de conexión
JWT_SECRET=tu clave secreta
JWT_EXPIRATION=1h
PORT=3000
```

No se deben subir el archivo `.env` ni las credenciales de Firebase al
repositorio.

En una terminal, ejecutar el backend:

```bash
cd ../UTN-prog-iv-example
npm install
npm run dev
```

El backend debe estar disponible en `http://localhost:3000`.

Si el backend intenta cargar `firebase-key.json` y ese archivo no está
disponible, se debe desactivar temporalmente la inicialización de Firebase en
`server.js`, ya que no es necesaria para este TP de proveedores.

## Ejecución del frontend

En otra terminal, ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Autenticación

Las rutas de proveedores están protegidas y requieren un token JWT.

1. Iniciar sesión contra:

   ```text
   POST http://localhost:3000/api/login/login
   ```

2. Enviar un cuerpo JSON con email y contraseña:

   ```json
   {
     "email": "tu_email",
     "password": "tu_password"
   }
   ```

3. Copiar el valor `token` de la respuesta.
4. Abrir la consola del navegador en `http://localhost:5173` y ejecutar:

   ```js
   localStorage.setItem('token', 'TU_TOKEN')
   ```

El usuario debe tener rol `ADMIN` para registrar proveedores.

## Gestión de proveedores

Ingresar a:

```text
http://localhost:5173/proveedores
```

La vista permite:

- Consultar proveedores existentes.
- Registrar un proveedor.
- Actualizar la calificación entre 1 y 5.

Los servicios utilizados son:

- `GET /api/proveedores`
- `POST /api/proveedores`
- `PATCH /api/proveedores/:id/calificacion`
