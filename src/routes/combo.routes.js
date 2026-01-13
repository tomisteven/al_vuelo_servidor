const express = require('express');
const { body } = require('express-validator');
const comboController = require('../controllers/combo.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const comboValidation = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('products').isArray({ min: 1 }).withMessage('El combo debe tener al menos un producto'),
    body('products.*.product').isMongoId().withMessage('ID de producto no válido'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
    validateRequest
];

router.post('/', comboValidation, comboController.createCombo);
router.get('/', comboController.getAllCombos);
router.get('/:id', comboController.getComboById);
router.put('/:id', comboController.updateCombo);
router.delete('/:id', comboController.deleteCombo);

module.exports = router;
