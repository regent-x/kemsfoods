import React, { createContext, useContext, useState, useEffect } from "react";

// 🧠 Create a new context
const CartContext = createContext();

// 🧩 Provider component that wraps the entire app
export function CartProvider({ children }) {
  // 🧮 State to hold cart items
  const [cartItems, setCartItems] = useState(() => {
    // 🗄️ Load from localStorage if available
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      // 🧐 Check if already in cart
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // 🔁 Increment quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // 🆕 Add new item
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ❌ Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔁 Update item quantity
  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
      )
    );
  };

  // 🧾 Calculate total number of items
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // 🚀 Export all data and functions
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 🪄 Simple hook to use the cart anywhere
export const useCart = () => useContext(CartContext);
