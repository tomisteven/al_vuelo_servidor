/**
 * Script para cargar productos de la categoría Miniaturas
 * Ejecutar con: node src/scripts/seedMiniaturas.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product.model');

const miniaturasData = [{
    "Nombre del Perfume": "Maison Alhambra Fusion Intense 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/fusion-intense-30-ee1bc5d39d5452dcd317571783184503-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Forbidden Love 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/forbidden-love-30-16145a76853643c68917571791603659-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Jean Lowe Noir 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Léonie Intense 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Alive Now 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra La Voie 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Glacier Gold 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Glacier Bella 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Glacier Pour Homme 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra La Vivacité Intensa 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Intrude 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra La Vivacité 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Opulence Leather 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/leather-30-ml-b3eb8ce9b112b0610d17562342401857-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Philos Rosso 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/philos-rosso-30-ml-fc4b854ad24d7daeff17562344061344-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Yeah! Men 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Victorioso 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Glacier \"Le Noir\" 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "50000"
}, {
    "Nombre del Perfume": "Maison Alhambra Victorioso Nero 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra No. 2 Men 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Glacier \"Ultra\" 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Bad Femme 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Pacific Blue 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Man Blac Edition 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Jean Lowe Immortal 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Jorge Di Profumo 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/jorge-di-profumo-30-08259024cf57b8047817594352049960-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Delilah 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/delilah-30-53e176dddaccd0711517594378025231-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Olivia 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Reyna 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Phanter 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Florenza 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Jardin De Reve 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Vip Pour Femme 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Chants Tenderina 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Pink Velvet 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Jubilant Oro 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Jubilant Noir 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Avant 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/avant-f14d06024330ac58a417594390251112-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra La Rouge Baroque 30ml.",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/la-rouge-baroque-30-ml-a3b3d1ce3fdfc98f5b17594390944134-480-0.webp",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Pink Shimmer secret 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}, {
    "Nombre del Perfume": "Maison Alhambra Pink Shimmer Secret Intense 30ml.",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "65000"
}];

const seedMiniaturas = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conectado a MongoDB');

        const productsToImport = [];

        for (const item of miniaturasData) {
            const nombre = item["Nombre del Perfume"];
            const precio = parseFloat(item["Precio Regular (ARS)"]);
            const imagen = item["Imagen del Perfume"];

            // Generar slug
            let slug = nombre.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            // Generar SKU único basado en el nombre
            const sku = `MIN-${slug.substring(0, 20)}-${Math.floor(Math.random() * 1000)}`;

            // Verificar si ya existe por nombre o SKU
            const existing = await Product.findOne({ $or: [{ nombre }, { sku }, { slug }] });
            if (existing) {
                console.log(`⚠️  Producto "${nombre}" ya existe o tiene SKU/Slug duplicado, saltando...`);
                continue;
            }

            productsToImport.push({
                nombre,
                slug,
                sku,
                precio,
                precioCard: precio * 1.15, // Ejemplo de recargo por tarjeta
                stock: 50,
                categoria: 'Miniaturas',
                imagenes: imagen ? [imagen] : [],
                descripcion: `Fragancia ${nombre} en formato miniatura de 30ml. Ideal para llevar con vos o probar nuevas esencias.`,
                isActive: true
            });
        }

        if (productsToImport.length > 0) {
            await Product.insertMany(productsToImport);
            console.log(`✅ ${productsToImport.length} miniaturas cargadas exitosamente.`);
        } else {
            console.log('ℹ️ No hay productos nuevos para cargar.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedMiniaturas();
