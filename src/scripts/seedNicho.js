/**
 * Script para cargar productos de la categoría Nicho
 * Ejecutar con: node src/scripts/seedNicho.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product.model');

const nichoData = [{
    "Nombre del Perfume": "Valentino Born In Roma",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/born-in-roma-c2c6cf3e2b50fac29317520986707166-480-0.webp",
    "Precio Regular (ARS)": "335000",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Azzaro Forever Wanted Elixir",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/forever-wanted-elix-e0e113159132c647e917520986858095-480-0.webp",
    "Precio Regular (ARS)": "401125",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Azzaro Wanted By Night",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "343875",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Jean Paul Gaultier Scandal Pour Femme",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "280625",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Emporio Armani Stronger With You Absolutely",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "304125",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Valentino Born In Roma Donna",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "330625",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Paco Rabanne Black XS Her",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "257125",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Carolina Herrera Good Girl",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "294000",
    "Mililitros (ml)": "80"
}, {
    "Nombre del Perfume": "Moschino Toy Boy",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "249875",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Sabrina Carpenter Caramel Dream Sweet Tooth",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "122125",
    "Mililitros (ml)": "75"
}, {
    "Nombre del Perfume": "Carolina Herrera 212 Men Heroes Forever Young",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "240250",
    "Mililitros (ml)": "90"
}, {
    "Nombre del Perfume": "Carolina Herrera Bad Boy Sparkling Ice",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "288125",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Jean Paul Gaultier Le Male Elixir",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/jpg-le-male-elixir-32d3cc17aef26a2e9917521634896274-480-0.webp",
    "Precio Regular (ARS)": "346750",
    "Mililitros (ml)": "125"
}, {
    "Nombre del Perfume": "Thierry Mugler A Men EDT",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/a-men-mugler-b0d7de839fe3ad32f417521640773808-480-0.webp",
    "Precio Regular (ARS)": "257125",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Paco Rabanne Black XS EDT",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "273375",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Ralph Lauren Polo Red 125 EDT",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "213125",
    "Mililitros (ml)": "125"
}, {
    "Nombre del Perfume": "Burberry Hero Eau de Parfum",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "238125",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Carolina Herrera 212 NYC",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "271875",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Issey Miyake EDT 125ML",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "303125",
    "Mililitros (ml)": "125"
}, {
    "Nombre del Perfume": "Jo Milano Game Of Spades Yellow Sapphire",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "285125",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Carolina Herrera 212 VIP Rosé Rodeo",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "285125",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Dolce & Gabbana Light Blue Summer Vibes",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Dior Homme Intense",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "335000",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Carolina Herrera 212 VIP Black Elixir",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "289500",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Carolina Herrera 212 VIP Black NY Rodeo",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/nyc-rodeo-1a6e49c3e1d72a0b9e17559763401241-480-0.webp",
    "Precio Regular (ARS)": "296875",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Carolina Herrera Very Good Girl Elixir",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/good-girl-elixir-ba5ef115bd0c6d82e417562258943649-480-0.webp",
    "Precio Regular (ARS)": "325250",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Carolina Herrera Bad Boy Cobalt Parfum Electrique",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "274875",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Tom Ford Black Orchid",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "568625",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Dolce & Gabbana Light Blue Summer Vibes Fem",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "260750",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "VALENTINO DONNA BORN IN ROMA GREEN STRAVAGANZE FEM",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "VALENTINO UOMO 100ML",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": "100"
}, {
    "Nombre del Perfume": "Mugler Alien Godess EDP",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Thierry Mugler Alien Hypersense EDP",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Dior J' Adore EDP",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "MUGLE ANGEL FANTASM EDP",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Mugle Angel EDP",
    "Imagen del Perfume": "",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "Givenchy Ou Demon EDP",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/ange-ou-demon-fa97832cf70ede360817595293392377-480-0.webp",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": ""
}, {
    "Nombre del Perfume": "DOLCE & GABBANA LIGHT BLUE 100ML KIT + 10 ML + CREMA",
    "Imagen del Perfume": "https://acdn-us.mitiendanube.com/stores/005/020/587/products/combo-dolce-9c195b91f304bdefd317603707057166-480-0.webp",
    "Precio Regular (ARS)": "0",
    "Mililitros (ml)": "100"
}];

const seedNicho = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conectado a MongoDB');

        const productsToImport = [];

        for (const item of nichoData) {
            const nombre = item["Nombre del Perfume"];
            const precioRaw = item["Precio Regular (ARS)"];
            const precio = precioRaw && precioRaw !== "" ? parseFloat(precioRaw) : 0;
            const imagen = item["Imagen del Perfume"];
            const ml = item["Mililitros (ml)"];

            // Generar slug
            let slug = nombre.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            // Generar SKU único basado en el nombre
            const sku = `NIC-${slug.substring(0, 20)}-${Math.floor(Math.random() * 1000)}`;

            // Verificar si ya existe por nombre o SKU o slug
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
                precioCard: precio * 1.15,
                stock: 15, // Stock inicial para nicho
                categoria: 'Nicho',
                imagenes: imagen ? [imagen] : [],
                descripcion: `Fragancia de lujo ${nombre}${ml ? ` de ${ml}ml` : ''}. Calidad premium y exclusividad garantizada.`,
                isActive: true
            });
        }

        if (productsToImport.length > 0) {
            await Product.insertMany(productsToImport);
            console.log(`✅ ${productsToImport.length} productos nicho cargados exitosamente.`);
        } else {
            console.log('ℹ️ No hay productos nicho nuevos para cargar.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedNicho();
