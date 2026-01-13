const Order = require('../models/Order.model');
const User = require('../models/User.model');

// @desc    Crear un nuevo pedido
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user._id
        };

        const order = await Order.create(orderData);

        // Opcional: Sumar puntos al usuario según la compra
        const pointsToEarn = Math.floor(req.body.total / 100); // 1 punto por cada 100 unidades de moneda
        if (pointsToEarn > 0) {
            await User.findByIdAndUpdate(req.user._id, {
                $inc: { points: pointsToEarn }
            });
        }

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Obtener pedidos del usuario actual
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Obtener todos los pedidos (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'nombre email').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Actualizar estado del pedido (Admin)
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
