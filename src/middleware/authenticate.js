const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Certifique-se de que o pool está configurado corretamente

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = user.id;
    next();
  });
};


module.exports = { authenticateToken };
