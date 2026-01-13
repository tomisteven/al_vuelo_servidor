const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    suggestedPricePercentage: {
        type: Number,
        default: 10,
        min: 0
    }
}, {
    timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
