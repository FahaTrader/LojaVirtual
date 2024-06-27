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
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [showSidebarCart, setShowSidebarCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showconfirmationMessage, setConfirmationMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleFinalizePurchase = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post('http://localhost:5000/payment/checkout', {
        total: cartTotal,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Compra finalizada!', response.data.orderId);
      setSelectedProducts([]);
      setCartTotal(0);
    } catch (error) {
      console.error('Erro ao finalizar compra', error);
    }
  };
  

  return (
    <Router>
      <div className="App">
        <Navbar 
          selectedProducts={selectedProducts} 
          setShowSidebarCart={setShowSidebarCart} 
          setSearchQuery={setSearchQuery} 
          isLoggedIn={isLoggedIn}
        />
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
            <Route
              path="/review"
              element={<ReviewPage
                selectedProducts={selectedProducts}
                cartTotal={cartTotal}
                handleFinalizePurchase={handleFinalizePurchase}
              />}
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage
              addProductToCart={addProductToCart}
              products={products} />} 
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
