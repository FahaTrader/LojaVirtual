import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <div className='inner-content'>
        <div className='left-side'>
          <h2>Dê Um Novo Estilo Ao Seu Trabalho!</h2>
          <p>Sucesso nem sempre tem haver com grandeza. 
            Tem haver com consistência e trabalho duro. 
            Consistência supera o sucesso. A grandeza virá.
          </p>
          <Link to="/produts" className='see-more-btn'>
            <span>Ver Mais</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className='right-side'>
          <img src='/images/header-image.png' alt='Products' />
        </div>
      </div>
    </header>
  )
}
