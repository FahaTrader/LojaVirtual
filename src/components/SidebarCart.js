import { faMoneyBill, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SidebarProducts from './SidebarProducts'
import { Link } from 'react-router-dom'

export default function SidebarCart({ setShowSidebarCart,
  showSidebarCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
}) {

  return (
    <aside className={`sidebar-cart ${showSidebarCart && "show"}`}>
      <div className='top'>
        <h3>Seu Carrinho</h3>
        <button onClick={() => setShowSidebarCart(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className='sidebar-products-list'>
        {selectedProducts.map(product => <SidebarProducts key={product.id} {...product}
        removeProductFromCart={removeProductFromCart} 
        addToCartTotal={addToCartTotal}
      />)}
      </div>

      {cartTotal === 0 ? (<i>Seu carringo está vazio</i>) : (<>
        <div className='total-container'>
          <b>Total: </b> R$ {cartTotal}
        </div>
        <Link to="/cart/checkout" className='btn-icon'>
          <span>Finalizar Compra</span>
          <FontAwesomeIcon icon={faMoneyBill} />
        </Link>
      </>)}

    </aside>
  )
}
