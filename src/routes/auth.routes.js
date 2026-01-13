const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

router.post(
    '/register',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('Debe proporcionar un email válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        validateRequest
    ],
    authController.register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Debe proporcionar un email válido'),
        body('password').exists().withMessage('La contraseña es obligatoria'),
        validateRequest
    ],
    authController.login
);

router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);

// Admin routes
router.get('/users', protect, authorize('admin'), authController.getAllUsers);
router.post('/users', protect, authorize('admin'), authController.createUser);
router.put('/users/:id', protect, authorize('admin'), authController.updateUser);
router.delete('/users/:id', protect, authorize('admin'), authController.deleteUser);
router.put('/users/:id/points', protect, authorize('admin'), authController.updateUserPoints);
router.patch('/users/:id/status', protect, authorize('admin'), authController.toggleUserStatus);

module.exports = router;
