import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { calcularFrete } from '../utils/frete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ProductDetailsPage({ addProductToCart, products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === parseInt(id));

  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    addProductToCart(product.id);
    navigate('/checkout');
  }

  const handleCalcularFrete = async () => {
    const valorFrete = await calcularFrete(cep);
    setFrete(valorFrete);
  };

  return (
    <div className='container-details'>
      <div className='left-side'>
        <img src={product.image} alt={product.name} />
      </div>
      <div className='right-side'>
        <h1>{product.name}</h1>
        <p className='desc-details'>{product.desc}</p>
        <div className='card-details'>
          <p className='price-details'>R$ {product.price.toFixed(2)}</p>
          <div className='buttons'>
            <button className='btn-buy' onClick={handleAddToCart}>
              Compra Agora
            </button>
            <button className='btn-add' onClick={() => addProductToCart(product.id)}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
        <div className='frete-calculator'>
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button onClick={handleCalcularFrete}>Calcular Frete</button>
          {frete !== null && <p>Frete: R$ {frete}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
