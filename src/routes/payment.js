const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/checkout', authenticate, async (req, res) => {
  const { total } = req.body;

  try {
    const newOrder = await Order.create({ total, userId: req.userId });
    res.status(201).json({ orderId: newOrder.id });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
