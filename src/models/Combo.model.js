const mongoose = require('mongoose');

const comboProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const comboSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del combo es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    products: [comboProductSchema],
    basePrice: {
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    finalPriceWithCard: {
        type: Number,
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    isExclusive: {
        type: Boolean,
        default: false
    },
    exclusiveFinalPrice: {
        type: Number,
        min: 0,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Combo = mongoose.model('Combo', comboSchema);

module.exports = Combo;
