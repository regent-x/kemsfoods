import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./success.css";

export default function Success() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  // 🧹 Clear cart after checkout success
  useEffect(() => {
    if (cartItems.length > 0) {
      setTimeout(() => {
        setCartItems([]);
      }, 1000); // delay so user still sees summary briefly
    }
  }, [cartItems, setCartItems]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping with us. Your order has been placed successfully.</p>

        <div className="summary">
          {cartItems.length > 0 ? (
            <div>
              <h4>Order Summary</h4>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Your order is being processed.</p>
          )}
        </div>

        <button onClick={() => navigate("/success")} className="btn-continue">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
