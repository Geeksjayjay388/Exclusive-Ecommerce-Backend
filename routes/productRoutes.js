import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';
import { upload } from '../config/cloudinary.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, authorize('admin'), upload.array('images', 5), createProduct);

export default router;
