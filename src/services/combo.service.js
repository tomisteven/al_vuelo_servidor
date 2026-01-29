const Combo = require('../models/Combo.model');
const Product = require('../models/Product.model');

class ComboService {
    async createCombo(comboData) {
        await this.calculatePrices(comboData);
        const combo = new Combo(comboData);
        return await combo.save();
    }

    async getAllCombos() {
        const combos = await Combo.find().populate('products.product');
        // Recalcular precios para cada combo para asegurar que estén actualizados
        for (let combo of combos) {
            await this.recalculateComboPrices(combo);
        }
        return combos;
    }

    async getComboById(id) {
        const combo = await Combo.findById(id).populate('products.product');
        if (!combo) throw new Error('Combo no encontrado');

        // Recalcular precios antes de devolver
        await this.recalculateComboPrices(combo);
        return combo;
    }

    async updateCombo(id, updateData) {
        const combo = await Combo.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('products.product');
        if (!combo) throw new Error('Combo no encontrado');

        // Recalcular precios después de actualizar
        await this.recalculateComboPrices(combo);
        await combo.save();

        return combo;
    }

    async deleteCombo(id) {
        const combo = await Combo.findByIdAndDelete(id);
        if (!combo) throw new Error('Combo no encontrado');
        return combo;
    }

    /**
     * Recalcula los precios de un combo basado en los precios actuales de sus productos.
     * Esta función maneja tanto el objeto Mongoose como datos planos si fuera necesario.
     */
    async recalculateComboPrices(combo) {
        let basePrice = 0;

        for (const item of combo.products) {
            // El producto puede estar poblado o ser solo un ID
            const product = (item.product && item.product.precio !== undefined)
                ? item.product
                : await Product.findById(item.product);

            if (!product) continue; // O manejar error si el producto desapareció

            basePrice += (product.precio * item.quantity);
        }

        combo.basePrice = basePrice;

        // Recalcular precio final
        if (combo.discountPercentage > 0) {
            combo.finalPrice = basePrice * (1 - combo.discountPercentage / 100);
        } else {
            // Si no tiene porcentaje de descuento, el precio final debe ser el precio base
            // (a menos que se quiera permitir un precio fijo desvinculado, 
            // pero el requerimiento es que el precio esté actualizado)
            combo.finalPrice = basePrice;
        }

        // Precio con tarjeta: 10% recargo sobre el precio final calculado
        combo.finalPriceWithCard = combo.finalPrice * 1.1;

        return combo;
    }

    // Mantenemos calculatePrices para compatibilidad con createCombo si se prefiere
    async calculatePrices(comboData) {
        return this.recalculateComboPrices(comboData);
    }
}

module.exports = new ComboService();
