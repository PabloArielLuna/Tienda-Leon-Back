🛠️ API REST – Node.js + Express + Firebase (Firestore)

Este proyecto es una API REST desarrollada con Node.js + Express que utiliza Firebase Firestore como base de datos y JWT (Bearer Token) para autenticación.
Sirve como backend para un eCommerce u otra aplicación que necesite un CRUD de productos.

🚀 Tecnologías utilizadas

Node.js

Express

Firebase Admin SDK (Firestore)

JSON Web Tokens (JWT)

dotenv

CORS

Middlewares personalizados

📁 Estructura del proyecto
/backend
 ├── controllers/
 ├── routes/
 ├── services/
 ├── middlewares/
 ├── server.js
 ├── serviceAccountKey.json
 ├── .env
 └── package.json

🔥 Configuración de Firebase

Crear un proyecto en Firebase Console.

Ir a Project Settings → Service Accounts.

Generar clave privada y descargar serviceAccountKey.json.

Guardar el archivo dentro de /backend/ (no subirlo a GitHub).

Inicialización en el proyecto:
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;

⚙️ Variables de entorno

Crear un archivo .env en /backend:

PORT=4000
JWT_SECRET=tu_clave_secreta

▶️ Instalación y ejecución

Instalar dependencias:

npm install


Levantar el servidor:

npm start


El backend queda disponible en:

http://localhost:4000

🔒 Autenticación (JWT – Bearer Token)

La API utiliza JWT para validar usuarios.

✔ Registro

POST /api/auth/register

✔ Login

POST /api/auth/login

El login devuelve un token:

{
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}

✔ Rutas protegidas

Las rutas protegidas requieren:

Authorization: Bearer <token>

Ejemplo desde JavaScript:
fetch("/api/products", {
  headers: {
    Authorization: "Bearer TU_TOKEN",
  },
});

📦 Endpoints principales
📌 Productos
✔ Obtener todos
GET /api/products

✔ Obtener uno
GET /api/products/:id

✔ Crear producto (requiere token)
POST /api/products


Body:

{
  "title": "Mouse Gamer",
  "price": 25000,
  "description": "RGB 7200 DPI",
  "stock": 15
}

✔ Editar producto (requiere token)
PUT /api/products/:id

✔ Eliminar producto (requiere token)
DELETE /api/products/:id

🧱 Middlewares utilizados
auth.middleware.js

Valida token Bearer.

Si falta o es inválido → 401 Unauthorized.

notFound.middleware.js

Para rutas inexistentes → 404 Not Found.

error.middleware.js

Maneja errores internos → 500 Internal Server Error.

Si un error lanza err.status, usa ese código.

Ejemplo:

const error = new Error("No autorizado");
error.status = 403;
throw error;

🛡️ Manejo de errores (HTTP)
Código	Situación
400	Validación fallida / parámetros inválidos
401	Token faltante o inválido
403	Acceso prohibido (roles, si se implementa)
404	Ruta no encontrada
500	Error interno
🧪 Test básico de la API
1) Levantar servidor
npm start

2) Probar en navegador
http://localhost:4000/api/products

3) Probar autenticación en Postman

Registrar usuario

Loguearse

Copiar token

Crear producto enviando:

Authorization: Bearer <token>

✔ Estado del proyecto

 API en Express

 Base de datos Firebase Firestore

 Autenticación JWT

 CRUD completo

 Middlewares de errores y protección

 Tests automatizados (opcional)

 Deploy en Render/Netlify (opcional)

👨‍💻 Autor

Pablo Luna
API REST – Node + Firebase
