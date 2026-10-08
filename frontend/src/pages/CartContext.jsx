import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "perfume-store-cart";

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function lineKey(id, size) {
  return `${id}::${size || ""}`;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  const addToCart = (product, options = {}) => {
    const size = options.size || product.sizes?.[0] || "";
    const qty = Math.max(1, Number(options.qty) || 1);
    const key = lineKey(product._id, size);

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: Math.min(item.qty + qty, 10) } : item
        );
      }
      return [
        ...prev,
        {
          key,
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images || [],
          size,
          qty: Math.min(qty, 10),
        },
      ];
    });
  };

  const updateQty = (key, qty) => {
    const next = Math.max(1, Math.min(10, Number(qty) || 1));
    setCart((prev) => prev.map((item) => (item.key === key ? { ...item, qty: next } : item)));
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const count = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, count, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }
  return value;
}
