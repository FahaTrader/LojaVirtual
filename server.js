const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = user.id;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    console.log('User registered:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', { email, password });
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('User logged in:', user);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/profile/upload', authenticateToken, upload.single('profile_picture'), async (req, res) => {
  const userId = req.userId;
  const profilePicturePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  try {
    await pool.query('UPDATE users SET profile_picture = $1 WHERE id = $2', [profilePicturePath, userId]);
    res.status(200).json({ message: 'Foto de perfil atualizada com sucesso' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Erro ao atualizar foto de perfil' });
  }
});

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/purchase-history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM purchases WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.userId;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Simulação de decodificação de token para obter userId
  try {
    const decoded = jwt.verify(token, 'seu_segredo'); // 'seu_segredo' deve ser sua chave secreta
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
