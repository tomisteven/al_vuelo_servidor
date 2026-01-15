const Product = require('../models/Product.model');

class ProductService {
    async createProduct(productData) {
        // Generar slug si no existe
        if (!productData.slug) {
            productData.slug = productData.nombre.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        return await Product.create(productData);
    }

    async getAllProducts(query = {}) {
        const { search, categoria, sort, page = 1, limit = 12, isAdmin = false, exclusive, sellType, excludeCategoria } = query;
        const filter = { isDeleted: false };

        // Si no es admin, solo mostrar activos
        if (!isAdmin) {
            filter.isActive = true;
        }

        // Filtrar productos exclusivos
        if (exclusive === 'true' || exclusive === true) {
            filter.isExclusive = true;
        }

        if (search) {
            // Usar regex para búsqueda más flexible (parcial e insensible a mayúsculas)
            const searchRegex = new RegExp(search, 'i');
            filter.$or = [
                { nombre: { $regex: searchRegex } },
                { descripcion: { $regex: searchRegex } },
                { categoria: { $regex: searchRegex } }
            ];
        }

        if (categoria) {
            filter.categoria = categoria;
        }

        // Excluir categoría específica (ej: NICHO en Home) - case insensitive
        if (excludeCategoria && !categoria) {
            filter.categoria = { $not: { $regex: new RegExp(`^${excludeCategoria}$`, 'i') } };
        }

        // Filtrar por tipo de venta (perfume, decant, both)
        if (sellType && ['perfume', 'decant', 'both'].includes(sellType)) {
            filter.sellType = sellType;
        }

        const sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1;
        }

        let queryBuilder = Product.find(filter).sort(sortOptions);

        if (limit && parseInt(limit) !== 0) {
            queryBuilder = queryBuilder.limit(limit * 1).skip((page - 1) * limit);
        }

        const products = await queryBuilder.exec();

        const count = await Product.countDocuments(filter);

        return {
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalResults: count
        };
    }

    async getCategories() {
        // Obtenemos categorías de productos que no estén eliminados y tengan categoría definida
        const categories = await Product.find({
            isDeleted: false,
            categoria: { $exists: true, $ne: '' }
        }).distinct('categoria');

        return categories.filter(c => c && typeof c === 'string' && c.trim() !== '');
    }

    async getProductBySlug(slug) {
        const product = await Product.findOne({ slug, isDeleted: false });
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }

    async updateProduct(id, updateData) {
        const product = await Product.findById(id);
        if (!product) throw new Error('Producto no encontrado');

        // Actualizar campos permitidos
        const allowedFields = ['nombre', 'descripcion', 'sku', 'precio', 'precioCard', 'stock', 'categoria', 'imagenes', 'bulkPrices', 'isActive', 'isExclusive', 'precioExclusivo', 'sellType', 'decantOptions'];
        allowedFields.forEach(field => {
            if (updateData[field] !== undefined) {
                product[field] = updateData[field];
            }
        });

        // Actualizar slug si cambió el nombre
        if (updateData.nombre && updateData.nombre !== product.nombre) {
            product.slug = updateData.nombre.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        return await product.save();
    }

    async deleteProduct(id) {
        // Soft delete
        const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }

    async toggleStatus(id) {
        const product = await Product.findById(id);
        if (!product) throw new Error('Producto no encontrado');
        product.isActive = !product.isActive;
        return await product.save();
    }

    // Calcular precio aplicable según cantidad (lógica mayorista)
    calculateBulkPrice(product, quantity) {
        if (!product.bulkPrices || product.bulkPrices.length === 0) {
            return product.precio;
        }

        // Buscar el tramo más alto que se cumpla
        const applicablePrice = product.bulkPrices
            .filter(bp => quantity >= bp.minQuantity)
            .sort((a, b) => b.minQuantity - a.minQuantity)[0];

        return applicablePrice ? applicablePrice.price : product.precio;
    }

    // Calcular precio de decant según tamaño seleccionado
    calculateDecantPrice(product, size) {
        if (!product.decantOptions || !product.decantOptions.sizes || product.decantOptions.sizes.length === 0) {
            return null;
        }

        const decantSize = product.decantOptions.sizes.find(s => s.size === size);
        return decantSize ? decantSize.price : null;
    }

    // Obtener stock de un tamaño de decant específico
    getDecantStock(product, size) {
        if (!product.decantOptions || !product.decantOptions.sizes || product.decantOptions.sizes.length === 0) {
            return 0;
        }

        const decantSize = product.decantOptions.sizes.find(s => s.size === size);
        return decantSize ? decantSize.stock : 0;
    }
}

module.exports = new ProductService();
