import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./pages/CartContext";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-rose-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
