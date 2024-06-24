// src/pages/CheckoutPage.js
import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Container, Title } from '../styles';

const CheckoutPage = () => {
  return (
    <Container>
      <Title>Checkout</Title>
      <CheckoutForm />
    </Container>
  );
};

export default CheckoutPage;
