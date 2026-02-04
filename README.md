# Exclusive Backend API

The RESTful API for the Exclusive E-commerce application, built with Express and MongoDB.

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **File Uploads**: Multer + Cloudinary
- **Security**: JWT (Json Web Token) & BcryptJS

## 🚀 Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root of the server directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_string
   ADMIN_SECRET=your_secret_for_admin_registration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🛣 API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user.
- `POST /api/auth/login` - Authenticate user & get token.

### Products
- `GET /api/products` - Get all products.
- `POST /api/products` - Create a product (Admin only, requires Multipart/FormData).

## 🛡 Security

- **Authentication**: `protect` middleware ensures users are logged in.
- **Authorization**: `authorize('admin')` middleware restricts access to administrative routes.
- **Environment**: Sensitive data is managed via `dotenv`.

## 📦 Database Schema

- **User**: Stores name, email, password, and role.
- **Product**: Stores name, description, price, stock, category, and an array of image objects (URL + Public ID).
