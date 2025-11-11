import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./checkout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ✅ Payment Form Component
const PaymentForm = ({ totalPrice, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create a PaymentIntent via your backend
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Payment</h2>
      <CardElement className="card-element" />
      {error && <p className="error-msg">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="checkout-btn"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// ✅ Main Checkout Component
const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuccess = () => {
    navigate("/success");
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Secure Checkout</h1>

      <div className="checkout-grid">
        {/* 🧾 Billing Form */}
        <form className="checkout-form">
          <h2>Billing Details</h2>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street address"
            required
          />

          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />

          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
        </form>

        {/* 💳 Stripe Payment Section */}
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

          <Elements stripe={stripePromise}>
            <PaymentForm totalPrice={totalPrice} onSuccess={handleSuccess} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
