const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Conexão com o banco de dados
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

// Inicializando o Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const authRoutes = require('./src/routes/auth');
const paymentRoutes = require('./src/routes/payment');
const profileRoutes = require('./src/routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/profile', profileRoutes);

// Servindo arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
