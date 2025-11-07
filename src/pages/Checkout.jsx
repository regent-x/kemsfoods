import React from "react";
import { useCart } from "../context/CartContext"; // ✅ make sure useCart is defined
import "../styles/Checkout.css";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        {/* 🧾 LEFT: Billing Form */}
        <form className="checkout-form">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email address" />

          <label>Address</label>
          <input type="text" placeholder="Shipping address" />

          <label>City</label>
          <input type="text" placeholder="City" />

          <label>Country</label>
          <input type="text" placeholder="Country" />

          <button type="submit" className="checkout-btn">
            Place Order
          </button>
        </form>

        {/* 🧺 RIGHT: Order Summary */}
        <div className="order-summary">
          <h2>Your Order</h2>

          {cartItems.length === 0 ? (
            <p>No items in your cart.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="total">
            <strong>Total:</strong> $
            {typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
