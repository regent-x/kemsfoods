import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./productdetail.css";
import products from "../data/products"; 

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found.</h2>
        <p>The item you’re looking for doesn’t exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
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
    </div>
  );
};

export default ProductDetail;
