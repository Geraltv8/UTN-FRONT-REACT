# Transcripción del audio del docente — Módulo 5

**Archivo fuente:** WhatsApp Ptt 2026-11-05 at 15.56.02.ogg  
**Duración aproximada:** 4 minutos y 13 segundos.  
**Criterio:** transcripción con puntuación y muletillas menores depuradas para lectura. No sustituye la consigna escrita.

---

Hola, chicos. Ahí, muy en resumen, lo que les pasé en esa guía, con todo lo que pensaba darles hoy, es básicamente cómo se estructura un frontend.

Van a ver que, por un lado, se instala una librería que se llama Axios, que nos va a servir para conectarnos a los endpoints. Anteriormente usábamos fetch, que es el modo nativo, pero fetch es más difícil de controlar: hay que hacer muchos if para controlar los errores, para esto, para lo otro. Axios lo hace todo automáticamente, así que es mucho más práctico.

Y React Router DOM, que nos va a permitir hacer el ruteo de páginas. Como les expliqué, React es una SPA, una single-page application, básicamente una aplicación de una sola página. Va dibujando y desarmando cosas a medida que necesita mostrar una cosa u otra.

Entonces, con React Router DOM lo que va a hacer es, entre comillas, “engañar” al usuario para que piense que está navegando entre pantallas y que la URL, en la parte superior del navegador, vaya cambiando según la pantalla en la que está. Pero, por atrás, lo que hace es solamente decirle qué tiene que mostrar y qué no tiene que mostrar. O sea, va a desarmar o va a armar, o renderizar, algún componente en particular y cambiar la URL para que parezca que está navegando.

Bueno, y por un lado, con Axios lo que van a hacer es crear un service, básicamente como se hacía con Retrofit en Android. Va a estar la URL base a la que se van a conectar para conectarse a la API; en este caso va a ser un localhost nomás. Y después, un interceptor, para que en todos los requests, siempre que exista un token guardado en el localStorage, lo inyecte a la petición de Axios. Entonces, siempre va a mandar el token.

Y después, lo que estaría faltando en todo esto es la parte donde ustedes tendrían que hacer un login, que se me olvidó agregarles. Como eso va a ir también como parte del TPI, anótense el tema. Última de las últimas, se lo agrego mañana, o en algún momento ahí.

Porque van a necesitar el token y van a necesitar guardarlo en localStorage, así que eso se pueden anotar, como para investigar cómo usar localStorage en una web. Les digo que es una pavada. Es como el Data Storage que teníamos en Android, donde guardábamos una key-value. La key sería “token” y el value sería el valor del token que nos va a devolver el response de la API.

Y ahí automáticamente, en el ejemplo de Axios que tienen, van a ver que siempre lo va a inyectar en caso de que exista.

Después, con React Router DOM van a definir dónde van a estar las rutas, cómo se van a llamar, todo eso. Y, por último, van a tener que hacer el CRUD, que si bien en el backend no tenemos un CRUD muy extenso de proveedores, creo que las APIs son solamente... teníamos crear proveedor, obtener proveedor y actualizar calificaciones. Una calificación, una nota, se puede hacer con algún componente que te muestre una estrellita o algo para darle una puntuación.

Fíjense cómo está en el backend, o sea, qué información recibe el backend, que ese es el backend de ejemplo con el que veníamos trabajando.

Y, bueno, cualquier cosa me pueden preguntar por acá, o por privado, o por donde quieran.

---

## Aclaraciones técnicas al cotejar el código del backend

- El docente alterna en su explicación “localhost” (la dirección del servidor) y “localStorage” (almacenamiento web). La clave del token es `token` en `localStorage`.
- El backend implementa las acciones de proveedores: listar, crear y actualizar calificación. No existen rutas de actualización general ni de eliminación.
- El audio anuncia que el login se agregaría a la guía o al TPI; el frontend de este TP lo incluye como funcionalidad complementaria.
