import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Product', productSchema);
