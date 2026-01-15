const ProductService = require('../services/product.service');

const createProduct = async (req, res, next) => {
    try {
        // Si se envía una nueva categoría, se usa directamente
        // ya que las categorías son strings almacenados en los productos
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// Endpoint para crear/validar una nueva categoría
const createCategory = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }

        const categoryName = nombre.trim();

        // Verificar si ya existe
        const existingCategories = await ProductService.getCategories();
        const exists = existingCategories.some(
            cat => cat.toLowerCase() === categoryName.toLowerCase()
        );

        if (exists) {
            return res.status(409).json({
                message: 'La categoría ya existe',
                categoria: existingCategories.find(cat => cat.toLowerCase() === categoryName.toLowerCase())
            });
        }

        // Retornamos la categoría como válida para usar
        res.status(201).json({
            message: 'Categoría válida para usar',
            categoria: categoryName
        });
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
    createCategory,
    getAllProducts,
    getProductBySlug,
    getCategories,
    updateProduct,
    deleteProduct,
    toggleStatus
};
