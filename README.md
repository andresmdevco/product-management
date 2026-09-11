# 📦 Administrador de Productos
 
Aplicación Full Stack(PERN) para la administración de productos: registro, edición, eliminación y control de disponibilidad. El frontend está construido con **React**, **TypeScript** y **Tailwind CSS**, y el backend es una **REST API** con **Node.js**, **Express** y **TypeScript**, usando **PostgreSQL** como base de datos a través de **Sequelize**. El frontend está desplegado en **Vercel** y el backend junto con la base de datos en **Render**.
 
## 🌐 Demo
 
🔗 [https://product-management-andresmdevco.vercel.app/](https://product-management-andresmdevco.vercel.app/)
 
## 🛠️ Tecnologías Utilizadas
 
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/render-%23000000.svg?style=for-the-badge&logo=render&logoColor=white)
 
**Frontend (`client`)**
- React 19 con `react-router-dom` (Data APIs: `loader`, `action`, `useFetcher`)
- Tailwind CSS
- **Valibot** — validación en tiempo de ejecución de los datos antes de enviarlos o al recibirlos de la API
- **Axios** — cliente HTTP para consumir la API
**Backend (`server`)**
- Node.js, Express y TypeScript
- **Sequelize** (`sequelize-typescript`) — ORM sobre PostgreSQL, con modelos definidos mediante decoradores
- **express-validator** — validación de datos de entrada en las rutas
- **Swagger** (`swagger-jsdoc` + `swagger-ui-express`) — documentación interactiva de la API en `/docs`
- **Morgan** — logging de peticiones HTTP
- **CORS** — configurado para aceptar únicamente el origen del frontend
- **Jest** + **Supertest** — pruebas de integración de los endpoints
## ✨ Características
 
- 📋 Listado de productos con nombre, precio formateado y disponibilidad.
- ➕ Registro de nuevos productos, con validación de campos obligatorios.
- ✏️ Edición de productos existentes, incluyendo su disponibilidad.
- 🗑️ Eliminación de productos con confirmación previa.
- 🔁 Cambio rápido de disponibilidad (Disponible / No Disponible) desde el listado, sin recargar la página.
- ✅ Validación de datos tanto en el frontend (Valibot) como en el backend (express-validator).
- 📖 Documentación de la API generada automáticamente con Swagger.
- 🧪 Suite de pruebas automatizadas para todos los endpoints de la API.
- 🔒 API protegida con CORS, aceptando únicamente peticiones desde el frontend autorizado.
## 📂 Archivos principales
 
**Frontend (`client/src`)**
 
| Archivo | Descripción |
|---|---|
| `router.tsx` | Define las rutas con `createBrowserRouter`, asociando a cada una su `loader` y/o `action` (patrón ROA - Resource-oriented design) |
| `layouts/Layout.tsx` | Layout raíz con el encabezado de la aplicación y el `Outlet` de las vistas |
| `views/Products.tsx` | Vista principal; su `loader` obtiene los productos y su `action` actualiza la disponibilidad al enviarse el formulario correspondiente |
| `views/NewProduct.tsx` | Vista de registro de producto; su `action` valida que ningún campo esté vacío y llama a `addProduct` |
| `views/EditProduct.tsx` | Vista de edición; su `loader` obtiene el producto por `id` y su `action` valida y llama a `updateProduct` |
| `components/ProductForm.tsx` | Formulario reutilizado por registro y edición, con `defaultValue` precargado cuando recibe un producto |
| `components/ProductDetails.tsx` | Fila de la tabla de productos; incluye el botón de disponibilidad (con `useFetcher`), el enlace a edición y el formulario de eliminación (con confirmación) |
| `components/ErrorMessage.tsx` | Componente reutilizable para mostrar mensajes de error de validación |
| `services/ProductService.ts` | Encapsula las llamadas a la API (`get`, `post`, `put`, `patch`, `delete`) y valida cada entrada/salida con Valibot |
| `types/index.ts` | Esquemas de Valibot (`DraftProductSchema`, `ProductSchema`, `ProductsSchema`) y el tipo `Product` inferido |
| `utils/index.ts` | Funciones `formatCurrency` (formato de moneda) y `toBoolean` (conversión de string a booleano) |
 
**Backend (`server/src`)**
 
| Archivo | Descripción |
|---|---|
| `server.ts` | Configura la instancia de Express: conexión a la base de datos, CORS restringido al `FRONTEND_URL`, parseo de JSON, logging con Morgan, archivos estáticos, rutas de la API y documentación en `/docs` |
| `router.ts` | Define los endpoints (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) de `/api/products`, con sus validaciones y anotaciones de Swagger para la documentación |
| `handlers/product.ts` | Controladores de cada endpoint: obtener todos, obtener por id, crear, actualizar, cambiar disponibilidad y eliminar |
| `middleware/index.ts` | Middleware `handleInputErrors`, que corta la petición con un `400` si `express-validator` encontró errores |
| `models/Product.model.ts` | Modelo de Sequelize (`sequelize-typescript`) que define la tabla `products` mediante decoradores (`@Table`, `@Column`, `@Default`) |
| `config/db.ts` | Instancia de Sequelize conectada mediante `DATABASE_URL`, con carga automática de modelos |
| `config/swagger.ts` | Configuración de `swagger-jsdoc` y del tema visual de Swagger UI |
| `data/index.ts` | Script de utilidad para limpiar la base de datos (`--clear`), pensado para uso en desarrollo/pruebas |
| `__tests__/` | Pruebas de integración con Jest y Supertest, tanto del arranque del servidor como de cada endpoint de `/api/products` |
 
## 🧠 Cómo funciona
 
**Flujo del frontend**

1. Al entrar a la página principal, el `loader` de `Products` llama a `getProducts`, que consulta la API y valida la respuesta con `ProductsSchema` antes de mostrarla.
2. La tabla renderiza un `ProductDetails` por cada producto, con su nombre, precio formateado y estado de disponibilidad.
3. Al presionar el botón de disponibilidad, se envía un formulario mediante `useFetcher` (sin recargar ni navegar), que dispara la `action` de `Products` y llama a `updateProductAvailability`.
4. Al registrar o editar un producto, el formulario (`ProductForm`) envía sus datos a la `action` correspondiente (`NewProduct` o `EditProduct`), que primero valida que ningún campo esté vacío y luego llama a `addProduct` o `updateProduct`.
5. Cada servicio (`addProduct`, `updateProduct`, `getProducts`, `getProductById`) valida los datos con Valibot antes de enviarlos o después de recibirlos; si la validación falla, la operación no se completa.
6. Al eliminar un producto, se pide confirmación con `confirm()`; si se acepta, se envía el formulario a la ruta `productos/:id/eliminar`, cuya `action` llama a `deleteProduct` y redirige al listado.

**Flujo del backend**

7. Cada petición a `/api/products` pasa primero por las validaciones de `express-validator` definidas en `router.ts` (tipo de dato, campos obligatorios, IDs numéricos, precios mayores a 0).
8. Si hay errores de validación, el middleware `handleInputErrors` responde con `400` y el detalle de los errores, sin llegar al controlador.
9. Si la validación es correcta, el handler correspondiente en `handlers/product.ts` consulta o modifica la base de datos a través del modelo `Product` de Sequelize.
10. Si el producto solicitado no existe, el handler responde con `404`; en caso contrario, responde con el producto (o la lista de productos) en formato JSON.
11. Toda la API queda documentada automáticamente en `/docs` a partir de los comentarios JSDoc definidos en `router.ts`.
 
## 📚 Conceptos aplicados
 
- **React Router Data APIs**: `loader` y `action` por ruta, con diseño orientado a recursos (ROA) en lugar de manejar peticiones manualmente dentro de los componentes.
- Actualizaciones sin navegación con `useFetcher`, para acciones puntuales como cambiar la disponibilidad de un producto.
- Validación de esquemas en tiempo de ejecución con **Valibot** en el frontend, tanto de los datos enviados como de las respuestas de la API.
- Capa de servicios (`services/`) que centraliza y tipa el acceso a la API, separada de la capa de vistas.
- **ORM con Sequelize** (`sequelize-typescript`) usando decoradores para definir el modelo y su tabla.
- Middleware de validación en Express con **express-validator**, encadenado antes de cada handler.
- **CORS** configurado dinámicamente para aceptar únicamente el origen definido en `FRONTEND_URL`.
- Documentación de API autogenerada con **Swagger** a partir de comentarios en el código.
- Pruebas de integración con **Jest** y **Supertest**, incluyendo mocking de la conexión a base de datos y verificación de casos de éxito y de error para cada endpoint.
- Separación clara de responsabilidades en el backend (`router`, `handlers`, `middleware`, `models`, `config`).
- Configuración de reescritura de rutas (`vercel.json`) para que el enrutamiento del lado del cliente funcione correctamente en Vercel.
- Variables de entorno separadas para frontend (`VITE_API_URL`) y backend (`DATABASE_URL`, `FRONTEND_URL`, `PORT`).
## 🧪 Swagger y tests
 
Para consultar la documentación de la API mediante Swagger y ejecutar los tests del backend, comenta temporalmente la siguiente línea en `server.ts`:
 
```ts
// server.use(cors(corsOptions));
```
 
Mientras CORS esté comentado:
- Se puede acceder a la documentación de Swagger en [http://localhost:4000/docs](http://localhost:4000/docs).
- Se pueden ejecutar los tests del backend con `npm test`.
- También puedes ejecutarlos con reporte de cobertura mediante `npm run test:coverage` (este comando limpia previamente la base de datos, ya que ejecuta el script `pretest` antes de correr los tests).
- El frontend no podrá realizar peticiones al backend desde el navegador.
Una vez termines de probar el backend, vuelve a descomentar la línea:
 
```ts
server.use(cors(corsOptions));
```
 
Esto vuelve a habilitar CORS y permite que el frontend se comunique con el backend normalmente.
 
## 🚀 Cómo ejecutar el proyecto
 
1. Clonar el repositorio:
```bash
   git clone https://github.com/andresmdevco/product-management.git
   cd product-management
```
 
**Backend**
 
2. Ingresar a la carpeta del servidor e instalar las dependencias:
```bash
   cd server
   npm install
```
3. Crear un archivo `.env` en la raíz de `server` con las siguientes variables:
```bash
   DATABASE_URL=tu_url_de_postgresql
   FRONTEND_URL=http://localhost:5173
```
4. Ejecutar el servidor en modo desarrollo:
```bash
   npm run dev
```
> Para ejecutar los tests o consultar la documentación de Swagger, sigue los pasos de la sección [🧪 Swagger y tests](#-swagger-y-tests).
 
**Frontend**
 
5. En otra terminal, ingresar a la carpeta del cliente e instalar las dependencias:
```bash
   cd client
   npm install
```
6. Crear un archivo `.env` en la raíz de `client` con la URL del backend:
```bash
   VITE_API_URL=http://localhost:4000
```
7. Ejecutar el proyecto en modo desarrollo:
```bash
   npm run dev
```
8. Abrir [http://localhost:5173](http://localhost:5173) en el navegador