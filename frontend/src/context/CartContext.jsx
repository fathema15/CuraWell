
import React, { createContext, useState } from "react";

// Create CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (drug) => {
    const existing = cartItems.find((item) => item._id === drug._id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item._id === drug._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...drug, quantity: 1 }]);
    }
  };

  const removeFromCart = (drugId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== drugId));
  };

  const updateQuantity = (drugId, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === drugId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
