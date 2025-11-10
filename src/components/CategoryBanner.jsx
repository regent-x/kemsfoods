// src/components/CategoryGrid.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryBanner.css";

export default function Category() {
  const navigate = useNavigate();
  
  // State to track which images have loaded
  // Why? To show loading skeleton while images are downloading
  const [loadedImages, setLoadedImages] = useState({});

  // ============================================
  // CATEGORIES DATA
  // Why array of objects? Easy to add/remove categories and keeps data organized
  // ============================================
  const categories = [
    {
      name: "Grains & Flours",
      // Why local path? For images stored in your project
      image: "../assets/veggies.webp",
      // Why icon? Adds visual identification (using emoji for simplicity)
      icon: "🌾",
      // Why count? Shows how many products in category
      count: 45,
      // Why badge? Highlights special categories
      badge: "Popular"
    },
    {
      name: "Spices & Seasonings",
      image: "../assets/photo-14.webp",
      icon: "🌶️",
      count: 67,
      badge: null // No badge for this category
    },
    {
      name: "Snacks & Drinks",
      // Why Unsplash URL? Free high-quality images for prototyping
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800",
      icon: "🍿",
      count: 89,
      badge: "New"
    },
    {
      name: "Frozen Foods",
      image: "https://images.unsplash.com/photo-1589984662646-512a89b94bd6?w=800",
      icon: "🧊",
      count: 34,
      badge: null
    },
    {
      name: "Fresh Vegetables",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
      icon: "🥬",
      count: 56,
      badge: "Hot"
    },
    {
      name: "Meat & Seafood",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800",
      icon: "🍖",
      count: 42,
      badge: null
    },
    {
      name: "Dairy & Eggs",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800",
      icon: "🥛",
      count: 38,
      badge: null
    },
    {
      name: "Bakery & Bread",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
      icon: "🍞",
      count: 52,
      badge: "Popular"
    }
  ];

  // ============================================
  // CLICK HANDLER
  // Why separate function? Keeps JSX clean and logic reusable
  // Why pass state? Allows Shop page to filter by category
  // ============================================
  const handleCategoryClick = (catName) => {
    // Navigate to shop page
    navigate("/shop", {
      // Why state? Passes data to the next page without URL params
      state: { category: catName }
    });
  };

  // ============================================
  // IMAGE LOAD HANDLER
  // Why? To remove loading skeleton when image finishes loading
  // ============================================
  const handleImageLoad = (index) => {
    // Why callback function? To properly update state based on previous state
    setLoadedImages(prev => ({
      ...prev, // Why spread? Keeps existing loaded images
      [index]: true // Why [index]? Computed property name (ES6 feature)
    }));
  };

  // ============================================
  // BADGE COLOR LOGIC
  // Why function? Reusable logic for different badge types
  // ============================================
  const getBadgeStyle = (badgeText) => {
    // Why switch? Clean way to handle multiple conditions
    switch(badgeText) {
      case "New":
        return { background: "linear-gradient(135deg, #3498db, #2980b9)" };
      case "Hot":
        return { background: "linear-gradient(135deg, #e74c3c, #c0392b)" };
      case "Popular":
        return { background: "linear-gradient(135deg, #f39c12, #e67e22)" };
      default:
        return { background: "linear-gradient(135deg, #95a5a6, #7f8c8d)" };
    }
  };

  // ============================================
  // KEYBOARD ACCESSIBILITY
  // Why? Allows keyboard users to navigate with Enter/Space
  // ============================================
  const handleKeyPress = (event, catName) => {
    // Check if Enter or Space key was pressed
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent page scroll on Space
      handleCategoryClick(catName);
    }
  };

  return (
    <section className="categories">
      {/* ============================================
          SECTION HEADER
          Why semantic HTML? h2 tells screen readers this is a heading
          ============================================ */}
      <h2 data-text="Shop by Category">Shop by Category</h2>
      <p>Discover authentic African groceries and ingredients</p>

      {/* ============================================
          CATEGORY GRID
          Why map? Dynamically creates cards from array data
          ============================================ */}
      <div className="category-grid">
        {/* 
          Why .map()? Iterates over array and returns JSX for each item
          Why (cat, index)? cat = current item, index = position in array
        */}
        {categories.map((cat, index) => (
          <div
            // Why key? React needs unique identifier for list items
            // MISTAKE TO AVOID: Never use index as key in real apps if list can be reordered
            // Better: Use unique ID like cat.id if available
            key={index}
            
            // Why template literal? Combines multiple classes dynamically
            // Why conditional class? Adds 'loading' class if image hasn't loaded yet
            className={`category-card ${!loadedImages[index] ? 'loading' : ''}`}
            
            // Why onClick? Makes card clickable
            onClick={() => handleCategoryClick(cat.name)}
            
            // ACCESSIBILITY: Makes div keyboard accessible
            // Why tabIndex? Allows keyboard focus
            tabIndex={0}
            // Why onKeyPress? Handles keyboard interaction
            onKeyPress={(e) => handleKeyPress(e, cat.name)}
            
            // ACCESSIBILITY: Tells screen readers this is clickable
            role="button"
            aria-label={`Browse ${cat.name} category with ${cat.count} items`}
          >
            
            {/* ============================================
                CATEGORY IMAGE
                ============================================ */}
            <img
              src={cat.image}
              alt={cat.name}
              // Why onLoad? Triggers when image finishes downloading
              onLoad={() => handleImageLoad(index)}
              // PERFORMANCE: Lazy loading - images load only when near viewport
              loading="lazy"
            />

            {/* ============================================
                ICON OVERLAY (Top Right)
                Why? Adds visual identification and polish
                ============================================ */}
            <div className="category-icon" aria-hidden="true">
              {cat.icon}
            </div>

            {/* ============================================
                BADGE (Top Left)
                Why conditional render? Only show if badge exists
                Why && operator? Short-circuit evaluation - if cat.badge 
                is truthy, render the element after &&
                ============================================ */}
            {cat.badge && (
              <div
                className="category-badge"
                style={getBadgeStyle(cat.badge)}
              >
                {cat.badge}
              </div>
            )}

            {/* ============================================
                CATEGORY NAME & COUNT (Bottom)
                ============================================ */}
            <div className="category-name">
              {/* Display category name */}
              {cat.name}
              
              {/* Display product count */}
              <span className="category-count">
                {/* Why backticks? Template literals for string interpolation */}
                {cat.count} items
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================
   KEY CONCEPTS EXPLAINED:

   1. COMPONENT STRUCTURE:
   - Import dependencies at top
   - Define component function
   - Set up state (if needed)
   - Define helper functions
   - Return JSX

   2. STATE MANAGEMENT:
   - useState hook for reactive data
   - State updates trigger re-renders
   - Always use setter function to update state

   3. EVENT HANDLERS:
   - onClick, onKeyPress for interactions
   - Arrow functions to pass parameters
   - Prevent default behaviors when needed

   4. MAPPING DATA:
   - .map() creates array of JSX elements
   - Each element needs unique 'key' prop
   - Use index only for static lists

   5. CONDITIONAL RENDERING:
   - && operator for simple conditionals
   - ? : (ternary) for if-else
   - Template literals for dynamic classes

   6. ACCESSIBILITY:
   - role, aria-label for screen readers
   - tabIndex for keyboard navigation
   - onKeyPress for keyboard interaction
   - alt text for images

   7. PERFORMANCE:
   - lazy loading for images
   - Avoid inline object creation in render
   - Use callbacks for state updates

   COMMON MISTAKES TO AVOID:
   ❌ Using index as key when list can change
   ❌ Mutating state directly (state.value = x)
   ❌ Forgetting to bind event handlers
   ❌ Not providing alt text for images
   ❌ Missing key prop in mapped elements
   ❌ Inline functions in props (causes re-renders)
   ❌ Not handling loading/error states
   ❌ Forgetting keyboard accessibility
   ============================================ */