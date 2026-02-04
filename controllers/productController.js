import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (To be implemented)
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const productData = {
            name,
            description,
            price,
            category,
            stock,
            images: req.files ? req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            })) : []
        };

        const product = await Product.create(productData);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
