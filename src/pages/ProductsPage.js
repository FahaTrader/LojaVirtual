import React from 'react'
import ProductsList from '../components/PoductsList'

export default function ProductsPage({ products,addProductToCart }) {
  return (
<div className="page-inner-content">
        <div className="section-title">
          <h3>Nossos Produtos</h3>
          <div className="underline"></div>
        </div>

        <div className="main-content">
          <ProductsList addProductToCart={addProductToCart} products={products} />
        </div>
      </div>
  )
}
