const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product.routes');
const comboRoutes = require('./routes/combo.routes');
const emailRoutes = require('./routes/email.routes');
const authRoutes = require('./routes/auth.routes');
const discountRoutes = require('./routes/discount.routes');
const orderRoutes = require('./routes/order.routes');
const settingsRoutes = require('./routes/settings.routes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date() });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/combos', comboRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
