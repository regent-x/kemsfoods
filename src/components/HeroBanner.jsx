import React from "react";
import "/src/components/herobanner.css";

const HeroBanner = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Discover Authentic African Flavors</h1>
          <p>From rich spices to tasty snacks, delivered fresh to your door.</p>
          <a href="/shop" className="hero-btn">Shop Now</a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
