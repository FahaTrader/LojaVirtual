import React from 'react'
import Products from './Products'

export default function PoductsList({ products, addProductToCart }) {
  return (
    <div className='product-list'>
      {products.map((product) => <Products key={product.id} {...product} addProductToCart={addProductToCart} />)}
    </div>
  )
}
