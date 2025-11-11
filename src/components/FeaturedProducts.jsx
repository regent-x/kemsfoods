import React from "react";
import "./featuredproducts.css";
import ProductCard from "./ProductCard";
import products from "../products.json";

const FeaturedProducts = () => {
  const featured = products.slice(0, 4); // pick first 4 items

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
