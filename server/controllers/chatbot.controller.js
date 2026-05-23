const { Product } = require('../models');
const { Op } = require('sequelize');

// ============================================
// CHATBOT SERVICE - Rule-based AI Assistant
// ============================================

// Predefined FAQ responses
const faqs = {
  'shipping': 'We offer free shipping on orders above ₹500. Standard delivery takes 3-5 business days.',
  'return': 'You can return products within 7 days of delivery. Items must be unused and in original packaging.',
  'payment': 'We accept Cash on Delivery and Online Payment methods.',
  'contact': 'You can reach us at support@shopsphere.com or call us at +91-9876543210.',
  'discount': 'Check our featured products for the best deals! Use code WELCOME10 for 10% off your first order.',
  'track': 'You can track your order from the Order History section in your profile.',
  'cancel': 'Orders can be cancelled before they are shipped. Go to Order History and click Cancel.',
  'refund': 'Refunds are processed within 5-7 business days after we receive the returned item.',
  'account': 'You can update your profile, change password, and manage addresses from the Profile page.',
  'help': 'I can help you find products, compare prices, answer FAQs, and suggest items based on your budget. Try asking "Show shoes under ₹2000" or "What electronics do you have?"'
};

// Parse user message and generate response
function parseMessage(message) {
  const lowerMsg = message.toLowerCase().trim();

  // Check for FAQ keywords
  for (const [key, answer] of Object.entries(faqs)) {
    if (lowerMsg.includes(key)) {
      return { type: 'faq', response: answer };
    }
  }

  // Check for greeting
  if (/^(hi|hello|hey|good morning|good evening)/.test(lowerMsg)) {
    return {
      type: 'greeting',
      response: 'Hello! 👋 Welcome to ShopSphere. I can help you find products, check prices, and answer questions. What are you looking for today?'
    };
  }

  // Check for product search with budget
  // Pattern: "show X under ₹Y" or "X below Y" or "X under Y rupees"
  const budgetMatch = lowerMsg.match(
    /(?:show|find|get|suggest|recommend)?\s*(.+?)(?:\s+under|\s+below|\s+within|\s+less than)\s*(?:₹|rs\.?|inr)?\s*(\d+)/
  );

  if (budgetMatch) {
    return {
      type: 'product_search',
      searchTerm: budgetMatch[1].trim(),
      maxPrice: parseInt(budgetMatch[2]),
      response: null  // Will be filled with actual products
    };
  }

  // Check for category query
  // Pattern: "what X do you have" or "show me X"
  const categoryMatch = lowerMsg.match(
    /(?:what|show|list|get|any|do you have)\s+(.+?)(?:\s+do you have|\s+available|\s+in stock)?$/
  );

  if (categoryMatch) {
    return {
      type: 'product_search',
      searchTerm: categoryMatch[1].trim(),
      maxPrice: null,
      response: null
    };
  }

  // Check for price query
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
    return {
      type: 'product_search',
      searchTerm: lowerMsg.replace(/(what|how much|is the|price|cost|of|does)/g, '').trim(),
      maxPrice: null,
      response: null
    };
  }

  // Default response
  return {
    type: 'default',
    response: 'I\'m not sure I understand. Try asking me to:\n• Find products (e.g., "Show shoes under ₹2000")\n• Answer questions (e.g., "What is your return policy?")\n• Suggest items (e.g., "What electronics do you have?")\n\nType "help" for more options!'
  };
}

// @desc    Process chatbot message
// @route   POST /api/chatbot/message
exports.processMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a message'
      });
    }

    const parsed = parseMessage(message);

    // If it's a product search, query the database
    if (parsed.type === 'product_search') {
      let where = {};

      if (parsed.searchTerm) {
        where[Op.or] = [
          { name: { [Op.like]: `%${parsed.searchTerm}%` } },
          { category: { [Op.like]: `%${parsed.searchTerm}%` } },
          { brand: { [Op.like]: `%${parsed.searchTerm}%` } },
          { tags: { [Op.like]: `%${parsed.searchTerm}%` } }
        ];
      }

      if (parsed.maxPrice) {
        where.price = { [Op.lte]: parsed.maxPrice };
      }

      const products = await Product.findAll({
        where,
        order: [['ratings', 'DESC'], ['price', 'ASC']],
        limit: 5
      });

      if (products.length > 0) {
        const priceInfo = parsed.maxPrice ? ` under ₹${parsed.maxPrice}` : '';
        return res.json({
          success: true,
          reply: `I found ${products.length} product(s) matching "${parsed.searchTerm}"${priceInfo}:`,
          products,
          type: 'product_list'
        });
      } else {
        return res.json({
          success: true,
          reply: `Sorry, I couldn't find products matching "${parsed.searchTerm}"${parsed.maxPrice ? ` under ₹${parsed.maxPrice}` : ''}. Try a different search term or increase your budget.`,
          products: [],
          type: 'no_results'
        });
      }
    }

    // Return text response for non-product queries
    res.json({
      success: true,
      reply: parsed.response,
      products: [],
      type: parsed.type
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chatbot error',
      error: error.message
    });
  }
};

// @desc    Get product suggestions (similar / recommended)
// @route   GET /api/chatbot/suggestions/:productId
exports.getSuggestions = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find similar products in same category, different from current
    const suggestions = await Product.findAll({
      where: {
        id: { [Op.ne]: product.id },
        category: product.category,
      },
      order: [['ratings', 'DESC']],
      limit: 4
    });

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching suggestions',
      error: error.message
    });
  }
};
