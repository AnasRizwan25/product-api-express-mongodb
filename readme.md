# 🍎 Product CRUD API

A modular, RESTful Product Management API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. This API allows you to create, retrieve, update, delete, search, and categorize product data efficiently.

---

## 📌 Overview

This API is designed for e-commerce platforms, inventory systems, or any application requiring structured product data management. It supports full CRUD operations, text search, category listing, and product filtering by category.

## 🚀 Features

- ✅ Create a new product  
- 📥 Get all products  
- 🔍 Search products by title  
- 🧾 Get product by ID  
- ✏️ Update product by ID  
- 🗑️ Delete product by ID  
- 🧹 Get all unique categories (with slugs and URLs)  
- 📂 Filter products by category  

## 🧱 Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Language   | JavaScript (ES6+) |
| Runtime    | Node.js           |
| Framework  | Express.js        |
| Database   | MongoDB           |
| ODM        | Mongoose          |

## 📂 Project Structure

```
project-root/
├── models/
│ └── Product.js # Mongoose schema
├── routes/
│ └── productRoutes.js # Express routes
├── server.js # API entry point
├── .env # Environment variables
└── package.json
```

## 📦 API Documentation

```bash
### 1. Create a New Product  
**POST** `/api/products`

#### Request Body

{
  "title": "iPhone 15 Pro",
  "description": "Latest Apple smartphone",
  "price": 1299,
  "category": "electronics"
}

2. Get All Products
GET /api/products

3. Get Product by ID
GET /api/products/:_id

4. Update Product by ID
PUT /api/products/:_id

5. Delete Product by ID
DELETE /api/products/:_id

6. Search Products by Title
GET /api/products/search?q=keyword

7. Get Formatted Category List
GET /api/products/categories

 
Response Example
[
  {
    "slug": "electronics",
    "name": "Electronics",
    "url": "/products/category/electronics"
  }
]
8. Get Raw Category List
GET /api/products/category-list

9. Get Products by Category
GET /api/products/category/:category

```

``` bash
⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/product-crud-api.git
cd product-crud-api

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file and add:
MONGO_URI=your_mongo_db_connection_string

4. Start the Server
npm start
🧺 Example Product Schema
{
  title: String,
  description: String,
  price: Number,
  category: String
}
```

# 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.