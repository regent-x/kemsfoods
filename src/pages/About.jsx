import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

// 🎨 Story-driven layout
// 🧠 Builds brand connection & trust

const About = () => {
  return (
    <div className="about-container">
      {/* 🌅 Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story, Our Heritage</h1>
          <p>
            Kems African Foods and More is your trusted source for authentic African foods and products in Canada. We are passionate about bringing the rich flavors, diverse ingredients, and cultural essence of Africa closer to home for Africans in the diaspora and everyone who appreciates the vibrant taste of African cuisine.
          </p>

        </div>
      </section>

      {/* 🧾 Story Section */}
      <section className="about-story">
        <h2>Bringing Africa to Your Table</h2>
        <p>
          At Kems African Foods and More, we offer a wide range of raw African foods — from fresh produce, grains, spices, and traditional condiments to specialty items that reflect the heart of African cooking. Every product is carefully selected to maintain authenticity, quality, and freshness, giving our customers the true taste of home</p>
        <p>
          We partner with trusted African suppliers and artisans to bring
          high-quality ingredients that remind you of home — or introduce you to
          it for the first time.
        </p>
      </section>

      {/* 🌿 Values Section */}
      <section className="about-values">
        <h2>Our Commitment to Serving You Better</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3> Providing Quality and Authenticity:</h3>
            <p>We partner with trusted suppliers and farmers to ensure that every item we offer meets the highest standards of quality and authenticity..</p>
          </div>
          <div className="value-card">
            <h3>  Convenient Shopping Experience:</h3>
            <p>Whether you prefer shopping in-store or online, our goal is to make your experience smooth, easy, and enjoyable. We offer reliable delivery options across Canada so you can enjoy your favorite African foods wherever you are</p>
          </div>
          <div className="value-card">
            <h3> Affordable Prices:</h3>
            <p>We believe everyone should have access to authentic African products without breaking the bank. Our pricing is fair and competitive to ensure value for ever</p>
          </div>
          <div className="value-card">
            <h3> Excellent Customer Service::</h3>
            <p>Our friendly and knowledgeable team is always ready to assist — from helping you find specific ingredients to offering cooking tips or recommendation</p>
          </div>
          <div className="value-card">
            <h3>Community Connection:</h3>
            <p>We are more than a store; we’re a community hub. Kems African Foods and More celebrates African heritage, supports local events, and helps build connections among Africans and friends of Africa in Canada.</p>
          </div>
        </div>
      </section>

      {/* 🛒 Call-to-Action Section */}
      <section className="about-cta">
        <h2>Ready to Taste Africa?</h2>
        <Link to="/shop" className="shop-now-btn">
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default About;
