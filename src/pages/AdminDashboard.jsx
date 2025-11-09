import React, { useState } from "react";
import "./AdminDashboard.css";
import { PlusCircle, Tag, Package, Percent } from "lucide-react";

// 🎨 Admin Dashboard — clean, boxy, minimal UI
// 🧠 Focused on clarity & control

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="admin-container">
      {/* 🧭 Sidebar Navigation */}
      <aside className="admin-sidebar">
        <h2>Kems Admin</h2>
        <nav>
          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            <Package size={18} /> Products
          </button>
          <button
            className={activeTab === "add" ? "active" : ""}
            onClick={() => setActiveTab("add")}
          >
            <PlusCircle size={18} /> Add Product
          </button>
          <button
            className={activeTab === "coupons" ? "active" : ""}
            onClick={() => setActiveTab("coupons")}
          >
            <Percent size={18} /> Coupons
          </button>
        </nav>
      </aside>

      {/* 🧩 Main Dashboard Area */}
      <main className="admin-main">
        {activeTab === "products" && (
          <section>
            <h2>Product Inventory</h2>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Palm Oil</td>
                  <td>$10.99</td>
                  <td>24</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "add" && (
          <section>
            <h2>Add New Product</h2>
            <form className="admin-form">
              <label>
                Name:
                <input type="text" placeholder="Product name" />
              </label>
              <label>
                Price:
                <input type="number" step="0.01" placeholder="Price" />
              </label>
              <label>
                Stock:
                <input type="number" placeholder="Available quantity" />
              </label>
              <label>
                Image URL:
                <input type="text" placeholder="https://..." />
              </label>
              <button type="submit" className="save-btn">
                Save Product
              </button>
            </form>
          </section>
        )}

        {activeTab === "coupons" && (
          <section>
            <h2>Manage Coupons</h2>
            <form className="admin-form">
              <label>
                Coupon Code:
                <input type="text" placeholder="SUMMER20" />
              </label>
              <label>
                Discount (%):
                <input type="number" placeholder="20" />
              </label>
              <button type="submit" className="save-btn">
                Add Coupon
              </button>
            </form>

            <div className="coupon-list">
              <h3>Existing Coupons</h3>
              <ul>
                <li>
                  <Tag size={16} /> SUMMER20 - 20%
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
