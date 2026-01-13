const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/order.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);

router.get('/', authorize('admin'), getAllOrders);
router.put('/:id', authorize('admin'), updateOrderStatus);

module.exports = router;
