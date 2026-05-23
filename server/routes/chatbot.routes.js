const express = require('express');
const {
  processMessage,
  getSuggestions
} = require('../controllers/chatbot.controller');

const router = express.Router();

router.post('/message', processMessage);
router.get('/suggestions/:productId', getSuggestions);

module.exports = router;
