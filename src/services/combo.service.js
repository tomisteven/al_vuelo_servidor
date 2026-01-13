const Combo = require('../models/Combo.model');
const Product = require('../models/Product.model');

class ComboService {
    async createCombo(comboData) {
        await this.calculatePrices(comboData);
        const combo = new Combo(comboData);
        return await combo.save();
    }

    async getAllCombos() {
        return await Combo.find().populate('products.product');
    }

    async getComboById(id) {
        const combo = await Combo.findById(id).populate('products.product');
        if (!combo) throw new Error('Combo no encontrado');
        return combo;
    }

    async updateCombo(id, updateData) {
        if (updateData.products) {
            await this.calculatePrices(updateData);
        }
        const combo = await Combo.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!combo) throw new Error('Combo no encontrado');
        return combo;
    }

    async deleteCombo(id) {
        const combo = await Combo.findByIdAndDelete(id);
        if (!combo) throw new Error('Combo no encontrado');
        return combo;
    }

    async calculatePrices(comboData) {
        let basePrice = 0;

        for (const item of comboData.products) {
            const product = await Product.findById(item.product);
            if (!product) throw new Error(`Producto ${item.product} no encontrado`);
            if (product.stock < item.quantity) {
                throw new Error(`Stock insuficiente para el producto ${product.nombre}`);
            }
            basePrice += (product.precio * item.quantity);
        }

        comboData.basePrice = basePrice;

        // Si no se proporcionó un precio final con descuento, calculamos según el porcentaje
        if (!comboData.finalPrice && comboData.discountPercentage) {
            comboData.finalPrice = basePrice * (1 - comboData.discountPercentage / 100);
        } else if (!comboData.finalPrice) {
            comboData.finalPrice = basePrice;
        }

        // Precio con tarjeta (si no se envía, se puede aplicar un recargo base o dejar igual)
        if (!comboData.finalPriceWithCard) {
            comboData.finalPriceWithCard = comboData.finalPrice * 1.1; // Ejemplo: 10% recargo
        }
    }
}

module.exports = new ComboService();
