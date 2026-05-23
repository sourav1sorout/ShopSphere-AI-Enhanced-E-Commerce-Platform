const { Product, PriceAlert, Notification } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all products (with search, filter, pagination)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    let where = {};

    // Search by name or description
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { brand: { [Op.like]: `%${search}%` } }
      ];
    }

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    // Filter by rating
    if (req.query.minRating) {
      where.ratings = { [Op.gte]: Number(req.query.minRating) };
    }

    // Sort options
    let order = [['createdAt', 'DESC']]; // Default: newest first
    if (sort === 'price_low') order = [['price', 'ASC']];
    if (sort === 'price_high') order = [['price', 'DESC']];
    if (sort === 'rating') order = [['ratings', 'DESC']];
    if (sort === 'name') order = [['name', 'ASC']];

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order,
      offset: skip,
      limit: Number(limit)
    });

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(count / Number(limit)),
        totalProducts: count,
        hasMore: skip + products.length < count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Store old price for price alert checking
    const oldPrice = product.price;

    await product.update(req.body);

    // Check price alerts if price decreased
    if (req.body.price && req.body.price < oldPrice) {
      await checkPriceAlerts(req.params.id, req.body.price);
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
exports.getCategories = async (req, res) => {
  try {
    const categoriesRows = await Product.findAll({
      attributes: ['category'],
      group: ['category']
    });
    const categories = categoriesRows.map(row => row.category);
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
exports.getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.findAll({
      where: { isFeatured: true },
      limit: Number(limit),
      order: [['ratings', 'DESC']]
    });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching featured products', error: error.message });
  }
};

// @desc    Get trending products
// @route   GET /api/products/trending
exports.getTrendingProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.findAll({
      where: { sold: { [Op.gt]: 50 } },
      limit: Number(limit),
      order: [['sold', 'DESC']]
    });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching trending products', error: error.message });
  }
};

// @desc    Get best seller products
// @route   GET /api/products/best-sellers
exports.getBestSellers = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.findAll({
      where: { sold: { [Op.gt]: 100 } },
      limit: Number(limit),
      order: [['sold', 'DESC'], ['ratings', 'DESC']]
    });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching best sellers', error: error.message });
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
exports.getNewArrivals = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.findAll({
      limit: Number(limit),
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching new arrivals', error: error.message });
  }
};

// @desc    Get products with discount
// @route   GET /api/products/deals
exports.getTopDeals = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.findAll({
      where: { discountPercentage: { [Op.gt]: 0 } },
      limit: Number(limit),
      order: [['discountPercentage', 'DESC']]
    });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching deals', error: error.message });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
exports.getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 6 } = req.query;
    
    const currentProduct = await Product.findByPk(id);
    if (!currentProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const relatedProducts = await Product.findAll({
      where: {
        category: currentProduct.category,
        id: { [Op.ne]: id }
      },
      limit: Number(limit),
      order: [['ratings', 'DESC']]
    });

    res.json({ success: true, products: relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching related products', error: error.message });
  }
};

// Helper: Check and trigger price alerts when product price drops
async function checkPriceAlerts(productId, newPrice) {
  try {
    // Find all active alerts where target price >= new price
    const alerts = await PriceAlert.findAll({
      where: {
        ProductId: productId, // Using Sequelize relation column name
        targetPrice: { [Op.gte]: newPrice },
        notified: false,
        isActive: true
      },
      include: [{ model: Product, as: 'product', attributes: ['name'] }]
    });

    for (const alert of alerts) {
      // Create notification for the user
      await Notification.create({
        UserId: alert.UserId, // Using Sequelize relation column name
        title: 'Price Drop Alert! 🎉',
        message: `Great news! "${alert.product.name}" is now ₹${newPrice}. Your target was ₹${alert.targetPrice}.`,
        type: 'price_alert',
        data: JSON.stringify({ productId, newPrice, oldPrice: alert.currentPrice }) // Serialize JSON since data field might not be JSON in sqlite by default
      });

      // Mark alert as notified
      alert.notified = true;
      alert.currentPrice = newPrice;
      await alert.save();
    }
  } catch (error) {
    console.error('Error checking price alerts:', error.message);
  }
}
