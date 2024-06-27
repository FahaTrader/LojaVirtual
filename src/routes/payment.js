const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { total, userId } = req.body; // Recebe userId opcionalmente no body da requisição

  try {
    const newOrder = await Order.create({ total, userId: userId || null });
    res.status(201).json({ orderId: newOrder.id });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
