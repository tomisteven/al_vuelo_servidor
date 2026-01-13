const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// Obtener token JWT
const getSignedJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_123', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// Enviar respuesta con token
const sendTokenResponse = (user, statusCode, res) => {
    const token = getSignedJwtToken(user._id);

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            nombre: user.nombre,
            email: user.email,
            role: user.role,
            points: user.points
        }
    });
};

exports.register = async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'El usuario ya existe'
            });
        }

        // Crear usuario
        const user = await User.create({
            nombre,
            email,
            password
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validar email y password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor proporcione un email y contraseña'
            });
        }

        // Verificar usuario
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Verificar si la contraseña coincide
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            nombre: req.body.nombre
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtener todos los usuarios (Admin)
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
    try {
        // Incluir plainPassword para que el admin pueda verla
        const users = await User.find().select('+plainPassword').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Actualizar puntos de un usuario (Admin)
// @route   PUT /api/auth/users/:id/points
// @access  Private/Admin
exports.updateUserPoints = async (req, res, next) => {
    try {
        const { points } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { points },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Crear un usuario mayorista (Admin)
// @route   POST /api/auth/users
// @access  Private/Admin
exports.createUser = async (req, res, next) => {
    try {
        const { nombre, email, password, role = 'user' } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'El usuario ya existe con ese email'
            });
        }

        const user = await User.create({
            nombre,
            email,
            password,
            role,
            plainPassword: password // Guardar copia para referencia del admin
        });

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Actualizar un usuario (Admin)
// @route   PUT /api/auth/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
    try {
        const { nombre, email, role, isActive } = req.body;

        const updateData = {};
        if (nombre) updateData.nombre = nombre;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (typeof isActive === 'boolean') updateData.isActive = isActive;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Eliminar un usuario (Admin)
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cambiar estado activo de usuario (Admin)
// @route   PATCH /api/auth/users/:id/status
// @access  Private/Admin
exports.toggleUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Use findByIdAndUpdate to avoid triggering password middleware
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: !user.isActive },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

