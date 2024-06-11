import React from 'react';
import Products from '../components/Products';

function ProductsPage({ products, addProductToCart, searchQuery }) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-inner-content">
      <div className="section-title">
        <h3>Nossos Produtos</h3>
        <div className="underline"></div>
      </div>
      <div className='products-page'>
        {filteredProducts.map(product => (
          <Products
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            rate={product.rate}
            price={product.price}
            addProductToCart={addProductToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
