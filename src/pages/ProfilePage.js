import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleUploadPhoto = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const response = await axios.put('http://localhost:5000/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        }
      });
      console.log('Foto enviada com sucesso:', response.data);
      // Atualize o estado do usuário com a nova foto, se necessário
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
      // Tratamento de erro, como exibir mensagem para o usuário
    }
  };

  return (
    <div className="profile-page">
      <h2>Perfil</h2>
      <div className="profile-info">
        <img src={user.photo || 'default-photo-url'} alt="Profile" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUploadPhoto}>Enviar Foto de Perfil</button>
      </div>
    </div>
  );
};

export default ProfilePage;
