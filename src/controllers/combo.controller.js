const ComboService = require('../services/combo.service');

const createCombo = async (req, res, next) => {
    try {
        const combo = await ComboService.createCombo(req.body);
        res.status(201).json(combo);
    } catch (error) {
        next(error);
    }
};

const getAllCombos = async (req, res, next) => {
    try {
        const combos = await ComboService.getAllCombos();
        res.json(combos);
    } catch (error) {
        next(error);
    }
};

const getComboById = async (req, res, next) => {
    try {
        const combo = await ComboService.getComboById(req.params.id);
        res.json(combo);
    } catch (error) {
        next(error);
    }
};

const updateCombo = async (req, res, next) => {
    try {
        const combo = await ComboService.updateCombo(req.params.id, req.body);
        res.json(combo);
    } catch (error) {
        next(error);
    }
};

const deleteCombo = async (req, res, next) => {
    try {
        await ComboService.deleteCombo(req.params.id);
        res.json({ message: 'Combo eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCombo,
    getAllCombos,
    getComboById,
    updateCombo,
    deleteCombo
};
