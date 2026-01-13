const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

const { protect, authorize } = require('../middlewares/auth.middleware');

router.post(
    '/subscribe',
    [
        body('email').isEmail().withMessage('Debe proporcionar un email válido').normalizeEmail(),
        validateRequest
    ],
    emailController.subscribeEmail
);

router.get('/', protect, authorize('admin'), emailController.getAllSubscribers);

router.post('/unsubscribe', emailController.unsubscribeEmail);

module.exports = router;
