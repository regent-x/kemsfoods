import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Success from "./pages/Success";

const App = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} /> 
          <Route path="/product/:id" element={<ProductDetail />} /> 
          <Route path="/cart" element={<Cart/>} /> 
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/success" element={<Success/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
