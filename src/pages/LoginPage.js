import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); // Salva o userId para uso futuro
      setIsLoggedIn(true);
      setMessage('Logado com sucesso');
      navigate('/profile'); // Navega para a página de perfil
    } catch (error) {
      setMessage('Falha ao Logar');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    setIsLoggedIn(false);
    navigate('/login'); // Redireciona para a página de login após logout
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/auth/register', {
        name,
        email,
        password,
      });
      setMessage('Registrado com sucesso');
    } catch (error) {
      setMessage('Falha ao registrar');
    }
  };

  return (
    <div className='container-login'>
      <div className='login-container'>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='container-button'>
          <button className='btn-login' onClick={handleLogin}>Login</button>
          <button className='btn-register' onClick={handleRegister}>Register</button>
        </div>
        {message && <p>{message}</p>}
        <button className='logout' onClick={handleLogout}></button>
      </div>
    </div>
  );
}

export default LoginPage;
