// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, SectionTitle } from '../styles';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data: ', formData);
    navigate('/review');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SectionTitle>Informações Pessoais</SectionTitle>
      <Input
        type="text"
        name="name"
        placeholder="Nome Completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <SectionTitle>Endereço</SectionTitle>
      <Input
        type="text"
        name="address"
        placeholder="Endereço"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="city"
        placeholder="Cidade"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="zip"
        placeholder="CEP"
        value={formData.zip}
        onChange={handleChange}
        required
      />
      <SectionTitle>Informações de Pagamento</SectionTitle>
      <Input
        type="text"
        name="cardNumber"
        placeholder="Número do Cartão"
        value={formData.cardNumber}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="expiry"
        placeholder="Validade (MM/AA)"
        value={formData.expiry}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={formData.cvv}
        onChange={handleChange}
        required
      />
      <Button type="submit">Revisar Pedido</Button>
    </Form>
  );
};

export default CheckoutForm;
