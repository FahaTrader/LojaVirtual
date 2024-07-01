import React from 'react';


function LoginPage() {

  return (
    <div className='container-login'>
      <div className='login-container'>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nome"
        />
        <input
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Senha"
        />
        <div className='container-button'>
          <button className='btn-login'>Login</button>
          <button className='btn-register'>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
