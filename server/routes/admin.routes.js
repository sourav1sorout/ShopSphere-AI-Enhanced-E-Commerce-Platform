const express = require('express');
const {
  getDashboard,
  getAllUsers,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/admin.controller');
const protect = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

const router = express.Router();

// All admin routes require authentication AND admin role
router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
