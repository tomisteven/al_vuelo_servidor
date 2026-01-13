const mongoose = require('mongoose');

const bulkPriceSchema = new mongoose.Schema({
    minQuantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio minorista es obligatorio'],
        min: 0
    },
    precioCard: {
        type: Number,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        index: true
    },
    imagenes: [{
        type: String
    }],
    isExclusive: {
        type: Boolean,
        default: false
    },
    precioExclusivo: {
        type: Number,
        min: 0,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    bulkPrices: [bulkPriceSchema]
}, {
    timestamps: true
});

// Validar y ordenar precios por mayor antes de guardar
productSchema.pre('save', function () {
    if (this.bulkPrices && this.bulkPrices.length > 1) {
        // Ordenar por minQuantity
        this.bulkPrices.sort((a, b) => a.minQuantity - b.minQuantity);

        // Validar que no haya cantidades duplicadas
        const quantities = this.bulkPrices.map(bp => bp.minQuantity);
        const hasDuplicates = quantities.some((q, index) => quantities.indexOf(q) !== index);

        if (hasDuplicates) {
            throw new Error('No se pueden repetir las cantidades mínimas en los precios por mayor');
        }
    }
});

// Índice para búsqueda de texto
productSchema.index({ nombre: 'text', descripcion: 'text', categoria: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
