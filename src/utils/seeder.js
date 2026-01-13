const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Product = require('../models/Product.model');
const connectDB = require('../config/db');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // Limpiar base de datos antes de cargar
        await Product.deleteMany();
        console.log('Base de datos de productos limpia.');

        const filePath = path.join(__dirname, 'categorias.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        const productsToImport = [];
        const usedSlugs = new Set();

        for (const item of data) {
            // Ignorar items con errores de Excel o sin nombre
            if (!item.Nombre || item.Nombre.includes('#REF!') || item.ID.includes('#REF!')) {
                continue;
            }

            // Limpiar precio: "$36,00" -> 36.00
            const rawPrice = item['Precio normal'] || item['Precio rebajado'] || '0';
            const cleanPrice = parseFloat(rawPrice.replace('$', '').replace(/\./g, '').replace(',', '.'));

            // Generar slug base
            let baseSlug = item.Nombre.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            if (!baseSlug) baseSlug = 'producto';

            let slug = `${baseSlug}-${item.ID}`;

            // Asegurar unicidad total
            let counter = 1;
            while (usedSlugs.has(slug)) {
                slug = `${baseSlug}-${item.ID}-${counter}`;
                counter++;
            }
            usedSlugs.add(slug);

            productsToImport.push({
                nombre: item.Nombre,
                slug: slug,
                descripcion: '',
                sku: item.ID,
                precio: isNaN(cleanPrice) ? 0 : cleanPrice,
                precioCard: isNaN(cleanPrice) ? 0 : cleanPrice * 1.1,
                stock: parseInt(item.stock) || 0,
                categoria: item['Categori­as'] || 'Sin Categoría',
                imagenes: item.Imagenes ? [item.Imagenes] : [],
                bulkPrices: []
            });
        }

        await Product.insertMany(productsToImport);

        console.log(`${productsToImport.length} productos cargados exitosamente.`);
        process.exit();
    } catch (error) {
        console.error('Error al importar datos:', error);
        process.exit(1);
    }
};

importData();
