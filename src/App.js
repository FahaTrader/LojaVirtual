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
import ProfilePage from "./pages/ProfilePage";
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
    try {
      // Lógica para enviar os dados da compra para o backend
      const response = await ('http://localhost:5003/finalize-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6IlNyLiBBZ3VpYXIiLCJpYXQiOjE3MTk5NDg3MDksImV4cCI6MTcxOTk1MjMwOX0.ZViO3_9Is8HBEVDWQLXZOUEu7zyu-Z8vXS-lk3lM7Q8' // Inclua o token de autenticação JWT aqui
        },
        body: JSON.stringify({
          userId: 11, // Substitua com o ID do usuário logado
          products: selectedProducts,
          totalPrice: cartTotal,
          shippingInfo: {
            // Informações de envio, se necessário
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao finalizar compra');
      }

      // Limpar estado de produtos selecionados ou redirecionar para página de confirmação
      setSelectedProducts([]);
      setCartTotal(0);
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      // Tratar erros de finalização de compra, se necessário
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
            <Route path="/profile" element={<ProfilePage user={{ name: 'Nome do Usuário', email: 'email@exemplo.com', photo: 'url-da-foto' }} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
