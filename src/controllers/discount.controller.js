const Discount = require('../models/Discount.model');

exports.createDiscount = async (req, res, next) => {
    try {
        const discount = await Discount.create(req.body);
        res.status(201).json({
            success: true,
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

exports.getDiscounts = async (req, res, next) => {
    try {
        const discounts = await Discount.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: discounts.length,
            data: discounts
        });
    } catch (error) {
        next(error);
    }
};

exports.validateDiscount = async (req, res, next) => {
    try {
        const { code, cartTotal, isAuthenticated } = req.body;
        const discount = await Discount.findOne({ code: code.toUpperCase() });

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Cupón no encontrado'
            });
        }

        if (!discount.isValid()) {
            return res.status(400).json({
                success: false,
                message: 'El cupón ha expirado o ya no es válido'
            });
        }

        // Verificar si el cupón está asignado a un usuario específico
        if (discount.assignedTo && (!req.user || discount.assignedTo.toString() !== req.user.id.toString())) {
            return res.status(403).json({
                success: false,
                message: 'Este cupón no es válido para tu cuenta'
            });
        }

        // Verificar targetAudience (mayorista/minorista)
        if (discount.targetAudience === 'mayorista' && !isAuthenticated) {
            return res.status(403).json({
                success: false,
                message: 'Este cupón es exclusivo para clientes mayoristas registrados'
            });
        }

        if (discount.targetAudience === 'minorista' && isAuthenticated) {
            return res.status(403).json({
                success: false,
                message: 'Este cupón es solo para clientes minoristas'
            });
        }

        if (cartTotal < discount.minPurchase) {
            return res.status(400).json({
                success: false,
                message: `La compra mínima para este cupón es de $${discount.minPurchase}`
            });
        }

        let discountAmount = 0;
        if (discount.type === 'fixed') {
            discountAmount = discount.value;
        } else if (discount.type === 'percentage') {
            discountAmount = (cartTotal * discount.value) / 100;
        } else if (discount.type === 'shipping') {
            discountAmount = 0; // Se maneja en el front como envío gratis o descuento fijo de envío
        }

        res.status(200).json({
            success: true,
            data: {
                code: discount.code,
                type: discount.type,
                value: discount.value,
                discountAmount,
                finalTotal: cartTotal - (discount.type === 'shipping' ? 0 : discountAmount),
                targetAudience: discount.targetAudience
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateDiscount = async (req, res, next) => {
    try {
        const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Cupón no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteDiscount = async (req, res, next) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Cupón no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Cupón eliminado'
        });
    } catch (error) {
        next(error);
    }
};
