import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const adminData = {
            name: 'Admin User',
            email: 'admin@exclusive.com',
            password: 'adminpassword123', // You should change this
            role: 'admin'
        };

        const userExists = await User.findOne({ email: adminData.email });
        if (userExists) {
            console.log('Admin already exists!');
            process.exit();
        }

        await User.create(adminData);
        console.log('Admin user created successfully!');
        console.log('Email: admin@exclusive.com');
        console.log('Password: adminpassword123');

        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error.message);
        process.exit(1);
    }
};

createAdmin();
