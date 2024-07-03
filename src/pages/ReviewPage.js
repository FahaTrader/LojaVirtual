import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, ReviewSection, ProductItem, Button } from '../styles';

const ReviewPage = ({ selectedProducts, cartTotal, handleFinalizePurchase }) => {
  const navigate = useNavigate();

  const finalizePurchase = async () => {
    try {
      await handleFinalizePurchase(); // Chama a função que finaliza a compra
      navigate('/confirmation'); // Redireciona para a página de confirmação após finalizar
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      // Tratar erros de finalização de compra, se necessário
    }
  };

  return (
    <Container>
      <Title>Revisão do Pedido</Title>
      <ReviewSection>
        {selectedProducts.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          selectedProducts.map(product => (
            <ProductItem key={product.id}>
              <img className='img-review' src={product.image} alt={product.name} />
              <div className='desc-review'>
                <span className='title-review'>{product.name}</span>
                <span>R$ {product.price.toFixed(2)}</span>
              </div>
            </ProductItem>
          ))
        )}
      </ReviewSection>
      <h3>Total: R$ {cartTotal.toFixed(2)}</h3>
      <Button onClick={finalizePurchase}>Finalizar Compra</Button>
    </Container>
  );
};

export default ReviewPage;
