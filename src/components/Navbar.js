import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import '../styles/styles.css';
import { useEffect, useRef  } from "react";
import React, { useState } from "react";
import axios_api from '../axios_api';
import axios from "axios";
import CartPanel from "./CartPanel";

const Navbar = () => {
  // React States
  const [isAdmin, setIsAdmin] = useState(false);
  const [visibleCartPanel, setVisibleCartPanel] = useState(false);
  const cartPanelRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const toggleCartPanel = () => {
    setVisibleCartPanel(prevState => !prevState);
  };

  const closeCartPanel = () => {
    setVisibleCartPanel(false);
    console.log("Function" + visibleCartPanel)
  };

  useEffect(() => async () => {
    // Check if the user has admin permission
    axios_api.get("http://127.0.0.1:8000/check_permissions", {withCredentials: true}).then((response) => {
      if (localStorage.getItem('token') && response.data['isAdmin']) {
        setIsAdmin(true);
        console.log("User has admin permissions");
      }
    }).catch((error) => {
      console.log("Error:", error);
    });
  }, []);

  console.log(visibleCartPanel)

  return (
    <div className="shadow-lg backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
      <nav className="flex items-center container mx-auto">
        <div>
          <Link to="/" className="navbar-text">
            SilverCare
          </Link>
        </div>
        <ul className="navbar-custom-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/login">Sign in</NavLink>
          </li>
            <button
              onClick={toggleCartPanel}
            >
              {<FaShoppingCart />}
            </button>
          {isAdmin && ( // Conditionally render the "Admin" link based on user permission
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          )}
        </ul>
      </nav>
      {visibleCartPanel && <CartPanel onClose={closeCartPanel}></CartPanel>}
    </div>
  );
};

export default Navbar;
