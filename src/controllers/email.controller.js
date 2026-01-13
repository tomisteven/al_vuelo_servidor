const Email = require('../models/Email.model');

exports.subscribeEmail = async (req, res, next) => {
    try {
        const { email, source } = req.body;

        // Verificar si ya existe
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Este email ya está suscrito'
            });
        }

        const newEmail = await Email.create({
            email,
            source: source || 'popup'
        });
        console.log(newEmail);


        res.status(201).json({
            success: true,
            data: newEmail,
            message: 'Suscripción exitosa'
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Email.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: subscribers.length,
            data: subscribers
        });
    } catch (error) {
        next(error);
    }
};

exports.unsubscribeEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const subscriber = await Email.findOneAndUpdate(
            { email },
            { isActive: false },
            { new: true }
        );

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró el suscriptor'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Desuscrito correctamente'
        });
    } catch (error) {
        next(error);
    }
};
