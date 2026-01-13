const ProductService = require('../services/product.service');

const createProduct = async (req, res, next) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const result = await ProductService.getAllProducts(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await ProductService.getCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

const getProductBySlug = async (req, res, next) => {
    try {
        const product = await ProductService.getProductBySlug(req.params.slug);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.json({ message: 'Producto eliminado correctamente (soft delete)' });
    } catch (error) {
        next(error);
    }
};

const toggleStatus = async (req, res, next) => {
    try {
        const product = await ProductService.toggleStatus(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductBySlug,
    getCategories,
    updateProduct,
    deleteProduct,
    toggleStatus
};
