const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    nombre: String,
    precio: Number,
    quantity: Number,
    type: {
        type: String,
        enum: ['product', 'combo'],
        default: 'product'
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    subtotal: {
        type: Number,
        required: true
    },
    discountCode: String,
    discountValue: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    // Nuevos campos para persistencia de Pesos y Cotización
    exchangeRate: Number,
    subtotalARS: Number,
    totalARS: Number,
    shippingData: {
        name: String,
        phone: String,
        email: String,
        city: String
    },
    paymentMethod: String,
    surcharge: {
        type: Number,
        default: 0
    },
    observations: String,
    status: {
        type: String,
        enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    whatsappSent: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
