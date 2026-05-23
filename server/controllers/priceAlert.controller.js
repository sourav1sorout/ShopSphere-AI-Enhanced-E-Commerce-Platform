const { PriceAlert, Product } = require('../models');

// @desc    Create a price alert
// @route   POST /api/price-alerts
exports.createAlert = async (req, res) => {
  try {
    const { productId, targetPrice } = req.body;

    // Validate
    if (!productId || !targetPrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide productId and targetPrice'
      });
    }

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if target price makes sense
    if (targetPrice >= product.price) {
      return res.status(400).json({
        success: false,
        message: `Target price must be less than current price (₹${product.price})`
      });
    }

    // Check if alert already exists for this user + product
    const existingAlert = await PriceAlert.findOne({
      where: {
        UserId: req.user.id,
        ProductId: productId
      }
    });

    if (existingAlert) {
      // Update existing alert
      existingAlert.targetPrice = targetPrice;
      existingAlert.currentPrice = product.price;
      existingAlert.notified = false;
      existingAlert.isActive = true;
      await existingAlert.save();

      return res.json({
        success: true,
        message: 'Price alert updated!',
        alert: existingAlert
      });
    }

    // Create new alert
    const alert = await PriceAlert.create({
      UserId: req.user.id,
      ProductId: productId,
      targetPrice,
      currentPrice: product.price
    });

    res.status(201).json({
      success: true,
      message: `Price alert set! We'll notify you when "${product.name}" drops below ₹${targetPrice}.`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating price alert',
      error: error.message
    });
  }
};

// @desc    Get user's price alerts
// @route   GET /api/price-alerts
exports.getMyAlerts = async (req, res) => {
  try {
    const alerts = await PriceAlert.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Product, as: 'product', attributes: ['name', 'price', 'image'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: alerts.length,
      alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alerts',
      error: error.message
    });
  }
};

// @desc    Delete a price alert
// @route   DELETE /api/price-alerts/:id
exports.deleteAlert = async (req, res) => {
  try {
    const alert = await PriceAlert.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    await alert.destroy();

    res.json({
      success: true,
      message: 'Price alert removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting alert',
      error: error.message
    });
  }
};
