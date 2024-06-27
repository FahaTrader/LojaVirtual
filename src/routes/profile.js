const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authenticate');
const { User, Order } = require('../models');

// Rota para obter dados do perfil do usuário
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json({ user, orders });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter perfil do usuário' });
  }
});

// Rota para atualizar foto e nome do usuário
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, photo } = req.body;
    await User.update({ name, photo }, { where: { id: req.user.id } });
    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

module.exports = router;
