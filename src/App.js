import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminAddService from "./pages/AdminAddService";
import Product from "./pages/Product";
import Notfound from "./pages/404";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import CartPanel from "./components/CartPanel";
import RegistrationService from "./components/RegistrationService";
import PaymentSuccess from "./pages/PaymentSuccess"
import PaymentFail from "./pages/PaymentFail"
import Categories from "./pages/Categories";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import CheckoutDetails from "./components/CheckoutDetails";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const App = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:category" element={<Product />} />
          <Route path="/product/search/:search_input" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartPanel" element={<CartPanel />} />
          <Route path="/checkoutDetails" element={<Elements stripe={stripePromise}><CheckoutDetails /></Elements>} />
          <Route path="/cartPanel" element={<CartPanel />} />
          <Route path="/checkout-success" element={<PaymentSuccess />} />
          <Route path="/checkout-fail" element={<PaymentFail />} />
          <Route path="/adminPage" element={<Admin />} />
          <Route path="/adminAddService" element={<AdminAddService />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>

      <Footer />
    </section>
  );
};

export default App;
