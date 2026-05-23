const { User, Product, Order } = require('../models');
const { Op, fn, col } = require('sequelize');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const lowStockProducts = await Product.count({ where: { stock: { [Op.lte]: 5 } } });

    // Calculate total revenue
    const revenueResult = await Order.sum('totalAmount', {
      where: { status: { [Op.ne]: 'Cancelled' } }
    });
    const totalRevenue = revenueResult || 0;

    // Recent orders
    const recentOrders = await Order.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Orders by status
    const ordersByStatus = await Order.findAll({
      attributes: ['status', [fn('COUNT', col('status')), 'count']],
      group: ['status']
    });

    // Top selling products
    const topProducts = await Product.findAll({
      order: [['sold', 'DESC']],
      limit: 5,
      attributes: ['id', 'name', 'price', 'sold', 'image']
    });

    res.json({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        lowStockProducts,
        recentOrders,
        ordersByStatus,
        topProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let where = {};
    if (status) where.status = status;

    const orders = await Order.findAll({
      where,
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']]
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

// @desc    Update order status (Admin)
// @route   PUT /api/admin/orders/:id
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    if (status === 'Delivered') order.deliveredAt = new Date();
    if (status === 'Cancelled') order.cancelledAt = new Date();

    await order.save();

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};
