# E-commerce Backend - Perfumería Importadora

Backend profesional desarrollado con Node.js, Express y MongoDB para la gestión de un catálogo de productos con precios mayoristas y combos dinámicos.

## 🚀 Tecnologías
- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework web.
- **MongoDB + Mongoose**: Base de datos y modelado.
- **Express-validator**: Validaciones de datos.
- **MVC Architecture**: Separación clara de responsabilidades.

## 📁 Estructura del Proyecto
```text
/src
 ├── config/          # Configuración de DB
 ├── models/          # Modelos de datos (Mongoose)
 ├── controllers/     # Controladores de peticiones
 ├── routes/          # Definición de rutas API
 ├── middlewares/     # Middlewares (Error Handler, Validations)
 ├── services/        # Lógica de negocio
 ├── app.js           # Configuración de Express
 └── server.js        # Punto de entrada del servidor
```

## 🛠 Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Configurar variables de entorno en el archivo `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tu-db
   NODE_ENV=development
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Productos (`/api/products`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/` | Obtener todos los productos (soporta pagination/filtros) |
| GET | `/:id_o_slug` | Obtener producto por ID o Slug |
| POST | `/` | Crear un nuevo producto |
| PUT | `/:id` | Editar un producto |
| DELETE | `/:id` | Soft delete de un producto |
| PATCH | `/:id/status` | Activar/Desactivar producto |

**Ejemplo de creación (JSON):**
```json
{
  "name": "Perfume Chanel N5",
  "sku": "CH-001",
  "description": "Fragancia clásica floral",
  "price": 45000,
  "priceWithCard": 49500,
  "stock": 50,
  "category": "Fragancias Femeninas",
  "bulkPrices": [
    { "minQuantity": 5, "price": 40000 },
    { "minQuantity": 10, "price": 38000 }
  ]
}
```

### Combos (`/api/combos`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/` | Obtener todos los combos |
| GET | `/:id` | Obtener combo por ID |
| POST | `/` | Crear un nuevo combo (recalcula precios auto) |
| PUT | `/:id` | Editar un combo |
| DELETE | `/:id` | Eliminar un combo |

**Ejemplo de creación (JSON):**
```json
{
  "name": "Combo Verano",
  "description": "Pack de 2 fragancias frescas",
  "products": [
    { "product": "ID_DEL_PRODUCTO_1", "quantity": 1 },
    { "product": "ID_DEL_PRODUCTO_2", "quantity": 1 }
  ],
  "discountPercentage": 15
}
```

## 🔐 Seguridad y Performance
- **Soft Delete**: Los productos no se borran físicamente, solo se marcan como `isDeleted`.
- **Validaciones**: Se validan tipos de datos y campos obligatorios antes de procesar cualquier request.
- **Indexes**: Uso de índices para búsquedas rápidas por `slug`, `category` y búsqueda de texto.
- **Error Handling**: Manejo centralizado de errores para respuestas consistentes.
