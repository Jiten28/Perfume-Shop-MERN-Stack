import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClosingBand from "./components/ClosingBand";
import MarginMarks from "./components/MarginMarks";
import { ToastProvider } from "./components/Toast";
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./pages/CartContext";
import CartPage from "./pages/CartPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastProvider>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col text-ink">
            <MarginMarks />
            <Navbar />
            <main className="flex-1 pt-[4.5rem]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <ClosingBand />
            <Footer />
          </div>
        </ToastProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
