const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getOrderById
} = require('../controllers/order.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.post('/', placeOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);

module.exports = router;
