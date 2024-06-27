import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Logado com sucesso');
    } catch (error) {
      setMessage('Falha ao Logar');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/auth/register', {
        username,
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
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      </div>
    </div>
  );
}

export default LoginPage;
