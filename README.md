## M8-4-Autenticacion y Autorización con JWT en Express

## Descripción

Este proyecto es un ejemplo práctico de autenticación y autorización usando Node.js, Express y JWT. Permite que usuarios se registren (opcional), inicien sesión y accedan a rutas protegidas según su rol (user o admin).

El frontend incluye páginas HTML de login y perfil que interactúan con la API mediante fetch y gestionan el token en localStorage.

## Tecnologías utilizadas
- Node.js.
- Express.
- JSON Web Token(jsonwebtoken).
- Bcryptjs.
- dotenv.
- HTML, CSS y JavaScript (frontend básico).
- LocalStorage para almacenar token en el cliente.


## Estructura Proyecto
![Texto alternativo](     )


## Funcionalidades
- Registro de usuario con validación de contraseña (máx. 6 caracteres).
- Login con verificación de credenciales y generación de JWT.
- Almacena el token y rol en `localStorage`.
- Vista de perfil protegida: muestra ID, email y rol del usuario.
- Mensajes de feedback:
  - **Error:** texto en rojo.
  - **Éxito:** texto en verde.
- Logout con limpieza de token y rol en `localStorage`.



## Usuarios de prueba
| Email                  | Contraseña | Rol   |
|------------------------|------------|-------|
| demo@gmail.com          | 234567     | user  |
| administrador@gmail.com | admin1234    | admin |

> Nota: estos usuarios permiten probar la diferencia de roles y el mensaje especial para administradores.

## Endpoints
| Método | Ruta           | Descripción                                | Body / Headers                                      | Respuesta                    |
|--------|----------------|--------------------------------------------|----------------------------------------------------|-------------------------------|
| POST   | /auth/register | Registrar nuevo usuario                     | `{ email, password, role }`                        | 201 `{ ok: true }` o 409 / error |
| POST   | /auth/login    | Login usuario                               | `{ email, password }`                              | 200 `{ ok: true, token }` o 401 / error |
| GET    | /api/perfil    | Obtener información del usuario autenticado | Header: `Authorization: Bearer <token>`           | 200 `{ ok: true, data: {...} }` o 401 / error | |



## Instrucciones de ejecución

1. Instalar dependencias: **npm install**
2. Ejecutar servidor:**npm start**
3. Abrir en el navegador: http://localhost:3000
4. usuario de prueba 


## Notas
- El token JWT expira según la variable JWT_EXPIRES definida en .env (ej: 15m)
- Roles permiten diferenciar permisos si se implementa lógica adicional (user / admin)
- Todos los endpoints devuelven JSON coherente con { ok: true/false, mensaje }



## Autor
Fernanda Álvarez para curso Fullstack Javascript Sence.
