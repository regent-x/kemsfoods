import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import "/src/components/navbar.css";

export default function Navbar() {
  // State to control mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Get cart items from context
  const { cartItems } = useCart();
  
  // Calculate total number of items in cart (sum of all quantities)
  const itemCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
  
  // Reference to the mobile menu element for focus management
  const menuRef = useRef(null);

  // Toggle menu open/closed
  const toggleMenu = () => setMenuOpen((s) => !s);
  
  // Close menu explicitly
  const closeMenu = () => setMenuOpen(false);

  // Focus trap and keyboard navigation for accessibility
  useEffect(() => {
    // Only run this effect when menu is open
    if (!menuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    // Get all focusable elements (links and buttons) inside the menu
    const focusableEls = menu.querySelectorAll("a, button");
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    
    // Automatically focus the first element when menu opens
    firstEl?.focus();

    // Handle keyboard events for accessibility
    const handleKeyDown = (e) => {
      // Close menu when ESC key is pressed
      if (e.key === "Escape") {
        closeMenu();
        document.querySelector(".hamburger-btn")?.focus(); // Return focus to hamburger button
      } 
      // Handle TAB key for focus trap (keep focus within menu)
      else if (e.key === "Tab") {
        // If SHIFT+TAB on first element, loop to last element
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } 
        // If TAB on last element, loop to first element
        else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    // Add event listener for keyboard navigation
    document.addEventListener("keydown", handleKeyDown);
    
    // Cleanup: remove event listener when component unmounts or menu closes
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]); // Re-run effect when menuOpen changes

  // Lock body scroll when menu is open (prevents scrolling background content)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup: restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      {/* BACKDROP: Dark overlay behind mobile menu */}
      <div
        className={`nav-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={closeMenu} // Click backdrop to close menu
        aria-hidden={!menuOpen} // Hide from screen readers when closed
      />

      {/* MAIN NAVIGATION BAR */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* LOGO / BRAND */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <span className="logo-text">Kems African Foods</span>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <ul className="nav-links" role="menubar">
            <li role="none">
              <Link to="/" role="menuitem">Home</Link>
            </li>
            <li role="none">
              <Link to="/shop" role="menuitem">Shop</Link>
            </li>
            <li role="none">
              <Link to="/about" role="menuitem">About</Link>
            </li>
            <li role="none">
              <Link to="/admin" role="menuitem">Admin</Link>
            </li>
          </ul>

          {/* ACTION BUTTONS: Search, Cart, Mobile Menu Toggle */}
          <div className="nav-actions">
            {/* Search Button */}
            <Link 
              to="/shop" 
              className="search-btn" 
              aria-label="Search products"
            >
              <Search size={22} />
            </Link>

            {/* Cart Button with Item Count Badge */}
            <Link 
              to="/cart" 
              className="cart-link" 
              onClick={closeMenu} 
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart size={22} />
              {/* Show badge only if cart has items */}
              {itemCount > 0 && (
                <span className="cart-badge" aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="hamburger-btn"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {/* Toggle between Menu and X icon */}
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-OUT MENU */}
        <aside
          id="mobile-menu"
          ref={menuRef}
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          aria-hidden={!menuOpen}
          aria-label="Mobile navigation menu"
        >
          {/* Close button inside mobile menu */}
          <button 
            className="mobile-close-btn" 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Mobile Navigation Links */}
          <nav className="mobile-nav">
            <Link to="/" onClick={closeMenu}>
              <span>Home</span>
            </Link>
            <Link to="/shop" onClick={closeMenu}>
              <span>Shop</span>
            </Link>
            <Link to="/about" onClick={closeMenu}>
              <span>About</span>
            </Link>
            <Link to="/admin" onClick={closeMenu}>
              <span>Admin</span>
            </Link>
          </nav>
        </aside>
      </nav>
    </>
  );
}