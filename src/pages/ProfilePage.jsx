import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile data:', response.data);
        setUser(response.data);
      } catch (error) {
        setError('Erro ao buscar perfil');
        console.error('Erro ao buscar perfil', error);
      }
    };
  
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/profile/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // Fetch updated profile after upload
      const response = await axios.get('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem', error);
      setError('Erro ao fazer upload da imagem');
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='container-profile'>
      <h1>Perfil</h1>
      {error && <p>{error}</p>}
      {user.profile_picture && (
        <img className='img-profile' src={user.profile_picture} alt="Profile" />
      )}
      <p>Nome: {user.username}</p>
      <p>Email: {user.email}</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Foto de Perfil</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
