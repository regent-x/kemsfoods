import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
  const menuRef = useRef(null); // 🔹 reference to the mobile menu

  const toggleMenu = () => setMenuOpen((s) => !s);
  const closeMenu = () => setMenuOpen(false);

  // 🔸 Focus trap + ESC key logic
  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    const focusableEls = menu.querySelectorAll("a, button");
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    firstEl?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      } else if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`nav-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <span>Kems African Foods</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" role="menubar">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
          </ul>

          {/* Actions: cart + hamburger */}
          <div className="nav-actions">
            <Link to="/cart" className="cart-link" onClick={closeMenu} aria-label={`Cart: ${itemCount} items`}>
              <ShoppingCart size={22} />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>

            <button
              className="hamburger-btn"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <aside
          ref={menuRef}
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          aria-hidden={!menuOpen}
        >
          <nav className="mobile-nav">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/shop" onClick={closeMenu}>Shop</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/cart" onClick={closeMenu}>Cart</Link>
            <Link to="/admin" onClick={closeMenu}>Admin</Link>
          </nav>
        </aside>
      </nav>
    </>
  );
}
