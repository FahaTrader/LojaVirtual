import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState({ username: '', email: '', profile_picture: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5003/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUploadPicture = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      const response = await axios.post('http://localhost:5003/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      setUserData(prevState => ({ ...prevState, profile_picture: response.data.profile_picture }));
    } catch (error) {
      console.error('Erro ao fazer upload da foto de perfil:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile-container'>
      <h2>Perfil</h2>
      <div className='profile-details'>
        {userData.profile_picture && (
          <img src={`http://localhost:5003${userData.profile_picture}`} alt="Profile" />
        )}
        <p>Nome: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <input type="file" accept="image/*" onChange={handleUploadPicture} />
        <button className='btn-logout' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
