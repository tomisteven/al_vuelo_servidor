const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/product.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const productValidation = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('sku').notEmpty().withMessage('El SKU es obligatorio'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isNumeric().withMessage('El stock debe ser un número'),
    body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
    validateRequest
];

router.post('/', productValidation, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.post('/categories', productController.createCategory);
router.get('/:slug', productController.getProductBySlug);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/status', productController.toggleStatus);

module.exports = router;
