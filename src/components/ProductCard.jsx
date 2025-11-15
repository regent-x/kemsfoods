import React from "react";
import "./productcard.css";

const ProductCard = ({ product }) => {


  return (
    <div className="product-card">
      {/* “NEW” or “SALE” badge */}
      {product.badge && <span className="product-badge">{product.badge}</span>}

      {/* Product image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      {/* Product info section */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-price">
          {product.discount ? (
            <>
              <span className="price-old">${product.price}</span>
              <span className="price-new">
                ${(product.price - product.discount).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="price-new">${product.price}</span>
          )}
        </div>
      </div>

      {/* Hover actions */}
      <div className="product-actions">
        <button className="btn-view">View</button>
        <button className="btn-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
