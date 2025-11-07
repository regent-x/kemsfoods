import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetail.css";

// 🎨 Design mindset: 
// clean, centered layout, large image, subtle background.

import products from "../data/products"; 
// 🔍 Temporary static data (later you’ll fetch from backend)

// 💡 useParams gives us access to the product ID from the URL
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // 🧠 Find the product that matches the ID
  const product = products.find((item) => item.id === parseInt(id));

  // ⚠️ Safety check: If product not found (e.g., URL typo)
  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>Product not found.</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <img src={product.image} alt={product.name} className="product-detail-image" />
      </div>

      <div className="product-info-section">
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
