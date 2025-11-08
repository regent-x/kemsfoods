// src/components/CategoryGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CategoryBanner.css";

export default function Category() {
  const navigate = useNavigate();

  const categories = [
    { name: "Grains & Flours", image: "https://images.unsplash.com/photo-1604335399105-5c0f8a6baf45" },
    { name: "Spices & Seasonings", image: "https://images.unsplash.com/photo-1588167056544-2a2f2ee6b72a" },
    { name: "Snacks & Drinks", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f" },
    { name: "Frozen Foods", image: "https://images.unsplash.com/photo-1589984662646-512a89b94bd6" },
  ];

  const handleCategoryClick = (catName) => {
    navigate("/shop", { state: { category: catName } });
  };

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img src={cat.image} alt={cat.name} />
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
