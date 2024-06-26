const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const authenticateToken = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');

// Finalizar Compra
router.post('/checkout', authenticateToken, async (req, res) => {
  const { total } = req.body;

  try {
    const orderId = uuidv4();
    await Order.create({ userId: req.user.id, total, orderId });
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

module.exports = router;
