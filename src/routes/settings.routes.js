const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/Settings.controller');
// const { protect, admin } = require('../middlewares/auth'); // If I want to protect it, but current app seems to use different auth or direct routes

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

module.exports = router;
