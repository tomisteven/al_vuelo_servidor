const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discount.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Rutas públicas (para validar cupones en el checkout)
router.post('/validate', (req, res, next) => {
    // Intentar proteger pero no obligar si el cupón es público
    // Para simplificar, usamos protect y permitimos que el controlador maneje la lógica
    next();
}, protect, discountController.validateDiscount);

// Rutas protegidas (Admin)
router.post('/', protect, authorize('admin'), discountController.createDiscount);
router.get('/', protect, authorize('admin'), discountController.getDiscounts);
router.put('/:id', protect, authorize('admin'), discountController.updateDiscount);
router.delete('/:id', protect, authorize('admin'), discountController.deleteDiscount);

module.exports = router;
