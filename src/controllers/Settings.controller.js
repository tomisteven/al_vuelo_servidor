const Settings = require('../models/Settings.model');

const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ suggestedPricePercentage: 10 });
        }
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        const { suggestedPricePercentage } = req.body;
        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings({ suggestedPricePercentage });
        } else {
            settings.suggestedPricePercentage = suggestedPricePercentage;
        }

        await settings.save();
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
