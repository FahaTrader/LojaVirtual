import { faBagShopping, faMoneyBill, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SidebarProducts from './SidebarProducts';
import { Link } from 'react-router-dom';
import { calcularFrete } from '../utils/frete';

export default function SidebarCart({
  setShowSidebarCart,
  showSidebarCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
}) {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);

  const handleCalcularFrete = async () => {
    const valorFrete = await calcularFrete(cep);
    setFrete(valorFrete);
  };

  const totalComFrete = cartTotal + (frete || 0);

  return (
    <aside className={`sidebar-cart ${showSidebarCart && "show"}`}>
      <div className='top'>
        <h3>Seu Carrinho</h3>
        <button onClick={() => setShowSidebarCart(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className='sidebar-products-list'>
        {selectedProducts.map(product => (
          <SidebarProducts
            key={product.id}
            {...product}
            removeProductFromCart={removeProductFromCart}
            addToCartTotal={addToCartTotal}
          />
        ))}
      </div>

      {cartTotal === 0 ? (
        <div className='cart-none'>
          <FontAwesomeIcon icon={faBagShopping} className='icon' />
          <i>Seu carrinho está vazio</i>
        </div>
      ) : (
        <>
          <div className='total-container'>
            <b>Total: </b> R$ {cartTotal}
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

          <div className='total-container'>
            <b>Total com Frete: </b> R$ {totalComFrete}
          </div>

          <Link to="/checkout" className='btn-icon' onClick={() => setShowSidebarCart(false)}>
            Finalizar Compra
            <FontAwesomeIcon icon={faMoneyBill} />
          </Link>
        </>
      )}
    </aside>
  );
}
