const { Order, OrderItem, Cart, CartItem, Product, User } = require('../models');

// @desc    Place a new order
// @route   POST /api/orders
exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty'
      });
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city ||
        !shippingAddress.state || !shippingAddress.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a complete shipping address'
      });
    }

    // Build order items and calculate total
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of cart.items) {
      if (!item.product) continue;

      // Check stock
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `"${item.product.name}" has only ${item.product.stock} items in stock`
        });
      }

      orderItemsData.push({
        ProductId: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity
      });

      totalAmount += item.product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      UserId: req.user.id,
      shippingStreet: shippingAddress.street,
      shippingCity: shippingAddress.city,
      shippingState: shippingAddress.state,
      shippingPincode: shippingAddress.pincode,
      shippingCountry: shippingAddress.country || 'India',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      totalAmount,
      status: 'Pending'
    });

    // Create order items
    for (const itemData of orderItemsData) {
      await OrderItem.create({
        OrderId: order.id,
        ...itemData
      });

      // Reduce stock for each product
      const product = await Product.findByPk(itemData.ProductId);
      if (product) {
        await product.update({
          stock: product.stock - itemData.quantity,
          // note: Mongoose model had 'sold', but we didn't see 'sold' in Product Sequelize model. If it exists, we can add it.
        });
      }
    }

    // Clear cart after order
    await CartItem.destroy({ where: { CartId: cart.id } });

    // Refetch order with items to return
    const createdOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items' }]
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: createdOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error placing order',
      error: error.message
    });
  }
};

// @desc    Get user's order history
// @route   GET /api/orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: OrderItem, as: 'items' }]
    });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Get single order details
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: OrderItem, as: 'items' }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Ensure user can only see their own orders (unless admin)
    if (order.UserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};
