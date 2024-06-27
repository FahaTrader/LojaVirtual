import React, { useState } from 'react';
import { faBars, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Navbar({ setShowSidebarCart, selectedProducts, setSearchQuery, isLoggedIn }) {
  const [show, setShow] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderLoginLink = () => {
    if (isLoggedIn) {
      return <Link to="/profile" className="login-button">
        <FontAwesomeIcon icon={faUser} />
      </Link>;
    } else {
      return <Link to="/login" className="login-button">
        <FontAwesomeIcon icon={faUser} />
      </Link>;
    }
  };

  return (
    <div className="nav">
      <div className="inner-content">
        <h1 className="logo">Loja<span>Importadora</span></h1>
        <nav className={`${show && "show"}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Produtos</Link></li>
            <li><Link to="/about">Sobre</Link></li>
            <li><Link to="/contact">Contatos</Link></li>
          </ul>
        </nav>
        <div className="navs-icon-container">
          <div className="search-input-container">
            <input type="search" placeholder="Procurar" onChange={handleSearchChange} />
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <button className="shopping-cart" onClick={() => setShowSidebarCart(true)}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <div className="products-count">{selectedProducts.length}</div>
          </button>
          {renderLoginLink()}
          <button className="menu-button"
            onClick={() => setShow(!show)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  )
}
