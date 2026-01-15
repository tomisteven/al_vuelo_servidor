# Backend API - Funcionalidad Decant para Productos

## Cambios Realizados en Backend

### Archivos Modificados
- `src/models/Product.model.js` - Nuevos campos en el schema
- `src/services/product.service.js` - Lógica y filtros

---

## Nuevos Campos del Modelo Product

```javascript
{
    // Campo existente: precio del perfume completo
    precio: Number,
    stock: Number,
    
    // NUEVOS CAMPOS:
    sellType: {
        type: String,
        enum: ['perfume', 'decant', 'both'],
        default: 'perfume'
    },
    
    decantOptions: {
        available: Boolean,        // default: false
        description: String,       // default: ''
        sizes: [
            {
                size: Number,      // ml (ej: 5, 10, 15)
                price: Number,     // precio de este tamaño
                stock: Number      // stock independiente del perfume
            }
        ]
    }
}
```

---

## Endpoints API

### Obtener productos con filtro por tipo de venta
```
GET /api/products?sellType=both
GET /api/products?sellType=decant
GET /api/products?sellType=perfume
```

### Crear producto con decant
```
POST /api/products
Content-Type: application/json

{
    "nombre": "Carolina Herrera Good Girl",
    "sku": "CH-GG-001",
    "precio": 50000,
    "stock": 10,
    "categoria": "Femenino",
    "sellType": "both",
    "decantOptions": {
        "available": true,
        "description": "Decant en atomizador de vidrio",
        "sizes": [
            { "size": 5, "price": 8000, "stock": 20 },
            { "size": 10, "price": 15000, "stock": 15 },
            { "size": 15, "price": 20000, "stock": 10 }
        ]
    }
}
```

### Actualizar producto existente con opciones de decant
```
PUT /api/products/:id
Content-Type: application/json

{
    "sellType": "both",
    "decantOptions": {
        "available": true,
        "description": "Decant disponible",
        "sizes": [
            { "size": 5, "price": 8000, "stock": 20 },
            { "size": 10, "price": 15000, "stock": 15 }
        ]
    }
}
```

---

## Respuesta de Producto

```json
{
    "_id": "...",
    "nombre": "Carolina Herrera Good Girl",
    "slug": "carolina-herrera-good-girl",
    "precio": 50000,
    "stock": 10,
    "sellType": "both",
    "decantOptions": {
        "available": true,
        "description": "Decant en atomizador de vidrio",
        "sizes": [
            { "size": 5, "price": 8000, "stock": 20 },
            { "size": 10, "price": 15000, "stock": 15 },
            { "size": 15, "price": 20000, "stock": 10 }
        ]
    }
}
```

---

## Valores de sellType

| Valor | Significado |
|-------|-------------|
| `perfume` | Solo se vende el perfume completo (default) |
| `decant` | Solo se vende como decant |
| `both` | Se vende perfume completo Y decant |

---

## Notas

1. **Productos existentes**: Tendrán `sellType: "perfume"` por defecto
2. **Stock independiente**: El stock de cada tamaño de decant es separado del stock del perfume
3. **Validación**: El backend valida que `sellType` sea uno de los 3 valores permitidos
4. **Sin nuevas rutas**: Se usan las mismas rutas existentes de productos
