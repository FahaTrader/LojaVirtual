import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SidebarCart from "./components/SidebarCart";
import ConfirmationPage from "./pages/ConfirmationPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const [products, setProducts] = useState([]);
  const [showSidebarCart, setShowSidebarCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showconfirmationMessage, setConfirmationMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('');

  const addToCartTotal = (value) => setCartTotal(cartTotal + value);

  useEffect(() =>{
    fetch('/db.json').then((res) => res.json())
    .then((data) => setProducts(data.products));
  }, [])

  const addProductToCart = (id) => {
    const productToAdd = products.filter((product) => product.id === id)[0];
    if(selectedProducts.includes(productToAdd)) return;
    setSelectedProducts(selectedProducts.concat(productToAdd));
    setCartTotal(cartTotal + productToAdd.price);
    showConfirmationMessage('Item adicionado com sucesso');
  }

  const removeProductFromCart = (id) => {
    const newSelectedProduct = selectedProducts.filter((product) => product.id !== id);
    setSelectedProducts(newSelectedProduct);
  }

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setTimeout(() => {
      setConfirmationMessage('');
    }, 3000);
  }

  return (
    <Router>
      <div className="App">
        <Navbar selectedProducts={selectedProducts} setShowSidebarCart={setShowSidebarCart} setSearchQuery={setSearchQuery} />
        <SidebarCart
          addToCartTotal={addToCartTotal}
          removeProductFromCart={removeProductFromCart}
          cartTotal={cartTotal}
          selectedProducts={selectedProducts}
          setShowSidebarCart={setShowSidebarCart}
          showSidebarCart={showSidebarCart} 
        />
        <main>
          {showconfirmationMessage && <div className="confirmation-message">{showconfirmationMessage}</div>}
          <Routes>
            <Route path="/" element={<HomePage 
              addToCartTotal={addToCartTotal}
              removeProductFromCart={removeProductFromCart}
              selectedProducts={selectedProducts}
              addProductToCart={addProductToCart}
              setShowSidebarCart={setShowSidebarCart} 
              showSidebarCart={showSidebarCart} products={products} 
              cartTotal={cartTotal}
            />} 
            />
            <Route path="/products" element={<ProductsPage
              addProductToCart={addProductToCart}
              products={products} 
              searchQuery={searchQuery} />} 
            />
            <Route path="/checkout" element={<CheckoutPage
              addToCartTotal={addToCartTotal}
              removeProductFromCart={removeProductFromCart}
              selectedProducts={selectedProducts}
              setShowSidebarCart={setShowSidebarCart}
              showSidebarCart={showSidebarCart}
              products={products}
              cartTotal={cartTotal}
            />}
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage
              addProductToCart={addProductToCart}
              products={products} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
