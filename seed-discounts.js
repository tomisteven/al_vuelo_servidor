const mongoose = require('mongoose');
const Discount = require('./src/models/Discount.model');
const dotenv = require('dotenv');

dotenv.config();

const seedDiscounts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfumeria-importadora');
        console.log('Conectado a MongoDB');

        // Limpiar descuentos existentes (opcional, pero ayuda a testear)
        // await Discount.deleteMany({});

        const coupons = [
            {
                code: 'BIENVENIDO10',
                type: 'percentage',
                value: 10,
                minPurchase: 0,
                usageLimit: 100,
                isActive: true
            },
            {
                code: 'ENVIO-GRATIS',
                type: 'shipping',
                value: 0,
                minPurchase: 50, // Ejemplo: Envío gratis a partir de $50
                usageLimit: null,
                isActive: true
            },
            {
                code: 'FESTIVAL20',
                type: 'percentage',
                value: 20,
                minPurchase: 100,
                usageLimit: 50,
                isActive: true
            },
            {
                code: 'REGALO5',
                type: 'fixed',
                value: 5,
                minPurchase: 30,
                usageLimit: 200,
                isActive: true
            },
            {
                code: 'SUPERMAYORISTA',
                type: 'percentage',
                value: 15,
                minPurchase: 250,
                usageLimit: null,
                isActive: true
            }
        ];

        for (const coupon of coupons) {
            await Discount.findOneAndUpdate(
                { code: coupon.code },
                coupon,
                { upsert: true, new: true }
            );
        }

        console.log('Descuentos base creados exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding discounts:', error);
        process.exit(1);
    }
};

seedDiscounts();
