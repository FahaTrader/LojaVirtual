import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o token está presente no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5003/register', { username, email, password });
      console.log('Usuário registrado:', response.data);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5003/login', { email, password });
      console.log('Usuário logado:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (error) {
      console.error('Erro ao logar:', error); // Adicione isso
    }
  };

  return (
    <div className='container-login'>
      <div className='login-container'>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nome"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
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
      </div>
    </div>
  );
}

export default LoginPage;
