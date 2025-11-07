import React from "react";
import "./CategoryBanner.css";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Snacks",
    image: "/assets/category/snacks.jpg",
  },
  {
    name: "Spices",
    image: "/assets/category/spices.jpg",
  },
  {
    name: "Drinks",
    image: "/assets/category/drinks.jpg",
  },
  {
    name: "Beauty",
    image: "/assets/category/beauty.jpg",
  },
];

const CategoryBanner = () => {
  return (
    <section className="category-banner">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link
            to={`/shop?category=${cat.name}`}
            key={cat.name}
            className="category-card"
            style={{ backgroundImage: `url(${cat.image})` }}
          >
            <div className="overlay">
              <h3>{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryBanner;
