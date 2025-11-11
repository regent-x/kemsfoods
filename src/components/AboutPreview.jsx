import React from "react";
import { Link } from "react-router-dom";
import "aboutpreview.css";

const AboutPreview = () => {
  return (
    <section className="about-preview">
      <div className="about-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/03/05/22/45/spices-1236680_1280.jpg"
          alt="African spices and ingredients"
        />
      </div>

      <div className="about-text">
        <h2>Discover the Taste of Africa</h2>
        <p>
          At <strong>Kems African Foods & More</strong>, we celebrate the rich
          culinary traditions of Africa. From vibrant spices to hearty snacks,
          each product brings you a taste of home — crafted with love, heritage,
          and authenticity.
        </p>
        <Link to="/about" className="learn-btn">
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
