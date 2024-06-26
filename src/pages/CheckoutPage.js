import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from '../styles';
import CheckoutForm from '../components/CheckoutForm'

function CheckoutPage({ addToCartTotal, removeProductFromCart, selectedProducts, setShowSidebarCart, showSidebarCart, products, cartTotal }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Resto do código da página de checkout

  return (
    <Container>
      <Title>Checkout</Title>
      <CheckoutForm />
    </Container>
  );
}

export default CheckoutPage;
