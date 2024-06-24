import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Container, Title } from '../styles';

const Checkout = () => {
  return (
    <Container>
      <Title>Checkout</Title>
      <CheckoutForm />
    </Container>
  );
};

export default Checkout;
