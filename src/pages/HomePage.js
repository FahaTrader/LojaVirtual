import React from 'react'
import Header from '../components/Header'
import SidebarCart from '../components/SidebarCart'
import ExclusiveSection from '../components/ExclusiveSection'
import TestimonialList from '../components/TestimonialList'
import ProductsList from '../components/PoductsList'

export default function HomePage({ 
  products,
  addProductToCart, 
}) {
  return ( 
    <>
      <Header />
      <div className="page-inner-content">
        <div className="section-title">
          <h3>Produtos Selecionados</h3>
          <div className="underline"></div>
        </div>

        <div className="main-content">
          <ProductsList addProductToCart={addProductToCart} products={products} />
        </div>
      </div>
      <ExclusiveSection />
      <TestimonialList />
    </>

  )
}
