const express = require('express');
const {
  createAlert,
  getMyAlerts,
  deleteAlert
} = require('../controllers/priceAlert.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/', createAlert);
router.get('/', getMyAlerts);
router.delete('/:id', deleteAlert);

module.exports = router;
