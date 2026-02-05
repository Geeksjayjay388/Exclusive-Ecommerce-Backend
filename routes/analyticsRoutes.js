import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard-stats', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const recentUsers = await User.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });

        res.json({
            totalProducts,
            totalUsers,
            recentUsers,
            revenue: 0, // Placeholder for future order integration
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get recent members
router.get('/recent-members', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const recentMembers = await User.find()
            .select('name email createdAt role')
            .sort({ createdAt: -1 })
            .limit(limit);

        res.json(recentMembers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get most liked products
router.get('/most-liked-products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const products = await Product.find()
            .select('name images likes category price')
            .sort({ 'likes': -1 })
            .limit(limit);

        // Map products with like count
        const productsWithCount = products.map(product => ({
            _id: product._id,
            name: product.name,
            image: product.images && product.images.length > 0 ? product.images[0].url : null,
            category: product.category,
            price: product.price,
            likeCount: product.likes ? product.likes.length : 0,
        }));

        res.json(productsWithCount);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
