import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailsPage({ addProductToCart, products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === parseInt(id));

  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    addProductToCart(product.id);
    navigate('/checkout');
  }

  return (
    <div className='container-details'>
      <div className='left-side'>
        <img src={product.image} alt={product.name} />
      </div>
      <div className='right-side'>
        <h1>{product.name}</h1>
        <p className='desc-details'>{product.desc}</p>
        <div className='card-details'>
          <p className='price-details'>R$ {product.price}</p>
          <div className='buttons'>
            <button className='btn-buy' onClick={handleAddToCart}>Buy Now</button>
            <button className='btn-add' onClick={() => addProductToCart(product.id)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
