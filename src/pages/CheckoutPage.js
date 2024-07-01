import React from 'react';
import { Container, Title } from '../styles';
import CheckoutForm from '../components/CheckoutForm'

function CheckoutPage({ addToCartTotal, removeProductFromCart, selectedProducts, setShowSidebarCart, showSidebarCart, products, cartTotal }) {

  return (
    <Container>
      <Title>Checkout</Title>
      <CheckoutForm />
    </Container>
  );
}

export default CheckoutPage;
