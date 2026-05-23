const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getFeaturedProducts,
  getTrendingProducts,
  getBestSellers,
  getNewArrivals,
  getTopDeals,
  getRelatedProducts
} = require('../controllers/product.controller');
const protect = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

const router = express.Router();

// Public routes
router.get('/featured', getFeaturedProducts);
router.get('/trending', getTrendingProducts);
router.get('/best-sellers', getBestSellers);
router.get('/new-arrivals', getNewArrivals);
router.get('/deals', getTopDeals);
router.get('/categories', getCategories);
router.get('/:id/related', getRelatedProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin only routes
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
