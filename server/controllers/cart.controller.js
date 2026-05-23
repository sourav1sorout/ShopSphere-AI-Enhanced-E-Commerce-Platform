const { Cart, CartItem, Product } = require('../models');

// @desc    Get user's cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price', 'image', 'stock'] }]
        }
      ]
    });

    if (!cart) {
      cart = { items: [] };
    }

    // Calculate total
    let totalAmount = 0;
    if (cart.items && cart.items.length > 0) {
      totalAmount = cart.items.reduce((sum, item) => {
        if (item.product) {
          return sum + (item.product.price * item.quantity);
        }
        return sum;
      }, 0);
    }

    res.json({
      success: true,
      cart: cart.items || [],
      totalAmount,
      itemCount: cart.items ? cart.items.length : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ where: { UserId: req.user.id } });

    if (!cart) {
      cart = await Cart.create({ UserId: req.user.id });
    }

    // Check if item already in cart
    let existingItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        CartId: cart.id,
        ProductId: productId,
        quantity
      });
    }

    // Refetch cart
    cart = await Cart.findOne({
      where: { id: cart.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price', 'image', 'stock'] }]
        }
      ]
    });

    res.json({
      success: true,
      message: 'Item added to cart',
      cart: cart.items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:itemId
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ where: { UserId: req.user.id } });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = await CartItem.findOne({
      where: { id: req.params.itemId, CartId: cart.id }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.quantity = quantity;
    await item.save();

    // Refetch cart
    const updatedCart = await Cart.findOne({
      where: { id: cart.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price', 'image', 'stock'] }]
        }
      ]
    });

    res.json({
      success: true,
      message: 'Cart updated',
      cart: updatedCart.items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { UserId: req.user.id } });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = await CartItem.findOne({
      where: { id: req.params.itemId, CartId: cart.id }
    });

    if (item) {
      await item.destroy();
    }

    // Refetch cart
    const updatedCart = await Cart.findOne({
      where: { id: cart.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price', 'image', 'stock'] }]
        }
      ]
    });

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: updatedCart ? updatedCart.items : []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { UserId: req.user.id } });
    if (cart) {
      await CartItem.destroy({ where: { CartId: cart.id } });
    }

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};
