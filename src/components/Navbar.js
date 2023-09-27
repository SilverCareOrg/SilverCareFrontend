import { Link, NavLink, useLocation  } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import '../styles/styles.css';
import { useEffect, useRef  } from "react";
import React, { useState } from "react";
import axios_api from '../api/axios_api';
import axios from "axios";
import CartPanel from "./CartPanel";
import { LuMenu } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate   } from 'react-router-dom';
import logo_img from "../images/logo_sc.png";


const Navbar = () => {
  // React States
  const [isAdmin, setIsAdmin] = useState(false);
  const [verticalMenu, setVerticalMenu] = useState(false);
  const [visibleCartPanel, setVisibleCartPanel] = useState(false);
  const cartPanelRef = useRef(null);
  const navigate = useNavigate();
  const clickTimeoutRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios_api.post("/logout", {withCredentials: true}).then((response) => {
      setIsAdmin(false);
    }).catch((error) => {
      console.log("Error:", error);
    });

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleCartPanel = () => {
    setVisibleCartPanel(prevState => !prevState);
  };

  const closeCartPanel = () => {
    setVisibleCartPanel(false);
  };

  const toggleVerticalMenu = () => {
    setVerticalMenu(prevState => !prevState);
  };

  const closeVerticalMenu = () => {
    setVerticalMenu(false);
  };


  // Use useEffect to set the active link when the route changes
  useEffect(() => {
    // Get the current route
    const currentRoute = window.location.pathname;
    setActiveLink(currentRoute);
  }, []);

  useEffect(() => {
    // Check if the user has admin permission
    const trigger = async () => {
    axios_api.get("/check_permissions", {withCredentials: true}).then((response) => {
      if (localStorage.getItem('token') && response.data['isAdmin']) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }).catch((error) => {
      console.log("Error:", error);
    });
    };
    trigger();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="relative flex-column items-center">
    <div className="lg:shadow-lg max-lg:items-start max-lg:flex-column backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
      <nav className="mt-30 max-lg:flex-columns max-lg:items-start flex items-center container mx-auto">
        <div className="ml-5">
          <Link to="/">
            <img src={logo_img} alt="logo" className="object-contain max-w-full max-h-full w-32"/>
          </Link>
        </div>


        {/* Larger Screen Navbar Components */}
  
        
        <div className="ml-auto mr-70 max-lg:hidden">
      <ul className="list-none flex justify-center items-center px-10 ml-auto mr-70 gap-7 text-xl">
        <li>
          <NavLink
            to="/"
            className="nav-link" //{`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Pagina principală
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/product"
            className="nav-link"
          >
            Experiențe
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="nav-link"
          >
            Despre noi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="nav-link"
          >
            Contact
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink
              to="#"
              onClick={handleLogout}
              className="nav-link"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="nav-link"
            >
              Autentificare
            </NavLink>
          )}
        </li>
        <button onClick={toggleCartPanel}>
          <FaShoppingCart />
        </button>
        {isAdmin && (
          <li>
            <NavLink
              to="/adminPage"
              className="nav-link"
            >
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </div>

        {/* Smaller Screen Navbar Components */}
        <div className="mt-auto px-8 ml-auto mr-70 lg:hidden flex-column items-start">
          <button onClick={toggleVerticalMenu}>
              {!verticalMenu ? <LuMenu className="h-7 w-7 "/>: <AiOutlineClose className="h-7 w-7"/>}
          </button>  
        </div>

      </nav>
      {visibleCartPanel && <CartPanel onClose={closeCartPanel}></CartPanel>}
    </div>
    {verticalMenu && (
    <ul className="lg:hidden border-b">
      <li className="relative group">
        <button
          className="flex items-center justify-between w-full px-4 py-3 border-t-2 border-b-2 bg-gray-100 hover:bg-gray-300"
          onClick={() => navigate("/")}
        >
          <span>Pagina principală</span>
        </button>
      </li>
      <li className="relative group">
        <button
          className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
          onClick={() => navigate("/product")}
        >
          <span>Experiențe</span>
        </button>
      </li>
      <li className="relative group">
        <button
          className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
          onClick={() => navigate("/about")}
        >
          <span>Despre noi</span>
        </button>
      </li>
      <li className="relative group">
        <button
          className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
          onClick={() => navigate("/contact")}
        >
          <span>Contact</span>
        </button>
      </li>
      <li className="relative group">
        {isLoggedIn ? (
            <button
            className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </button> ) : (
            <button
            className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
            onClick={() => navigate("/login")}
          >
            <span>Autentificare</span>
          </button>
          )}
      </li>
      <li className="relative group">
        <button
          className="flex items-center w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
          onClick={toggleCartPanel}
        >
          {<FaShoppingCart className="mr-2" /> }
          <span className="">
            Coș de cumpărături
          </span>
        </button>
      </li>
      {isAdmin && (
        <li className="relative group">
          <NavLink
            to="/adminPage"
            className="block w-full px-4 py-3 bg-gray-100 hover:bg-gray-300"
          >
            Admin
          </NavLink>
        </li>
      )}
    </ul>
  )}
    </div>
  );
};

export default Navbar;
