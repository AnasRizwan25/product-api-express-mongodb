import express from 'express';
import Product from '../models/Product.js'; // Adjust the path as necessary
import mongoose from 'mongoose';

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  const allProducts = await Product.find();
  res.json(allProducts);
});

// Search products by title (case-insensitive)
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Search query (q) is required' });

  try {
    const matchedProducts = await Product.find({
      title: { $regex: query, $options: 'i' }
    });
    res.json(matchedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during product search' });
  }
});

// Get all categories formatted with slugs and URLs
router.get('/categories', async (req, res) => {
  try {
    const rawCategories = await Product.distinct('category');

    // Format each category to have slug, name with capitalized first letter, and URL
    const formattedCategories = rawCategories.map(categoryName => {
      const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
      const formattedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      return {
        slug,
        name: formattedName,
        url: `/products/category/${slug}`
      };
    });

    res.json(formattedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Update a product by ID
router.put('/:_id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// Delete a product by ID
router.delete('/:_id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params._id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product successfully deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// Get simple list of categories (just names)
router.get('/category-list', async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

// Get products by category name
router.get('/category/:category', async (req, res) => {
  const categoryName = req.params.category;
  const productsInCategory = await Product.find({ category: categoryName });
  res.json(productsInCategory);
});

// Get a single product by ID
router.get('/:_id', async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

export default router;
