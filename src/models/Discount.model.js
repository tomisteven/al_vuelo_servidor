const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'El código de descuento es obligatorio'],
        unique: true,
        uppercase: true,
        trim: true
    },
    type: {
        type: String,
        required: [true, 'El tipo de descuento es obligatorio'],
        enum: ['fixed', 'percentage', 'shipping'],
        default: 'percentage'
    },
    value: {
        type: Number,
        required: [true, 'El valor del descuento es obligatorio'],
        min: 0
    },
    minPurchase: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date
    },
    usageLimit: {
        type: Number,
        default: null // null significa sin límite
    },
    usageCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    targetAudience: {
        type: String,
        enum: ['all', 'mayorista', 'minorista'],
        default: 'all' // 'all' = todos, 'mayorista' = solo registrados, 'minorista' = solo no registrados
    }
}, {
    timestamps: true
});

// Método para verificar si el cupón es válido
discountSchema.methods.isValid = function () {
    if (!this.isActive) return false;
    if (this.expiryDate && new Date() > this.expiryDate) return false;
    if (this.usageLimit !== null && this.usageCount >= this.usageLimit) return false;
    return true;
};

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
