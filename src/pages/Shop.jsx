import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import "../styles/Shop.css";

// 🎨 Design mindset: clean layout, top controls, responsive grid
// 🧠 UX: make it easy to find & explore products

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // 🧠 Filtering logic: filter first, then search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-container">
      <h1 className="shop-title">Shop Our Products</h1>

      {/* 🔍 Search + Filter Controls */}
      <div className="shop-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="snacks">Snacks</option>
          <option value="spices">Spices</option>
          <option value="oils">Oils</option>
          <option value="grains">Grains</option>
        </select>
      </div>

      {/* 🧩 Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              {/* 🖼️ Clickable image */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </Link>

              <h2>{product.name}</h2>
              <p className="price">${product.price.toFixed(2)}</p>

              {/* 👇 Dedicated View button */}
              <Link to={`/product/${product.id}`} className="view-btn">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No products match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
