import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Products({ id, image, name, rate, price, addProductToCart }) {
  return (
    <div className='product'>
      <img src={image} alt={name} />
      <p className='name'>{name}</p>
      <p className='rate'>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
      <p className='price'>{price} <span>R$</span></p>

      <div className='buttons'>
        <Link to={`/products/${id}`} className='btn-icon'>
          <span>Detalhes</span>
        </Link>
        <button className='btn-icon add-to-cart-btn' onClick={() => addProductToCart(id)}>
          <span>Adicionar ao Carrinho</span>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  )
}
