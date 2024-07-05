require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5003;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors());
// Servir arquivos de upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Configurar o multer para armazenar imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Função para gerar um token JWT
const generateToken = (user) => {
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  return token;
};

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Rota de registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log('Campos obrigatórios ausentes');
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    console.log('Usuário registrado:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Campos obrigatórios ausentes');
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      console.log('Usuário logado:', user);
      res.json({ token });
    } else {
      console.log('Credenciais inválidas');
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter dados do perfil
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT username, email, profile_picture FROM users WHERE id = $1', [req.user.userId]);
    const user = result.rows[0];

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para fazer upload da imagem de perfil
app.post('/upload-profile-picture', authenticateToken, upload.single('profile_picture'), async (req, res) => {
  const profilePicturePath = `/uploads/${req.file.filename}`;

  try {
    await pool.query('UPDATE users SET profile_picture = $1 WHERE id = $2', [profilePicturePath, req.user.userId]);
    res.json({ profile_picture: profilePicturePath });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar imagem de perfil' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
