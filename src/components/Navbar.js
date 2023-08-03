import { Link, NavLink } from "react-router-dom";
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
        <div>
          <Link to="/" className="text-gray-700 italic ml-5 text-3xl lg:text-8xl">
            SilverCare
          </Link>
        </div>


        {/* Larger Screen Navbar Components */}
  
        <div className="ml-auto mr-70 max-lg:hidden">
        <ul className="list-none flex justify-center items-center px-10 ml-auto mr-70 gap-7 text-xl">
          <li>
            <NavLink to="/">Pagina principală </NavLink>
          </li>
          <li>
            <NavLink to="/product">Servicii </NavLink>
          </li>
          <li>
            <NavLink to="/about">Despre noi </NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            {isLoggedIn ? <NavLink to="#" onClick={handleLogout}>Logout</NavLink>:<NavLink to="/login">Autentificare</NavLink>}
          </li>
            <button
              onClick={toggleCartPanel}
            >
              {<FaShoppingCart />}
            </button>
          {isAdmin && ( // Conditionally render the "Admin" link based on user permission
            <li>
              <NavLink to="/adminPage">Admin</NavLink>
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
    {verticalMenu && <ul className="flex flex-col lg:hidden border-b ">
            <button className="flex items-center px-4 py-2 border-t-2 border-b-2 bg-gray-50 hover:bg-gray-200"
                onClick={() => navigate("/")}>
                <span>Pagina principală</span>
            </button>
            <button className="flex items-center px-4 py-2 border-b-2 bg-gray-50 hover:bg-gray-200"
              onClick={() => navigate("/product")}>
              <span>Servicii</span>
            </button>
            <button className="flex items-center px-4 py-2 border-b-2 bg-gray-50 hover:bg-gray-200"
              onClick={() => navigate("/about")}>
              <span>Despre noi</span>
            </button>
            <button className="flex items-center px-4 py-2 border-b-2 bg-gray-50 hover:bg-gray-200"
              onClick={() => navigate("/contact")}>
              <span>Contact</span>
            </button>
            <button className="flex items-center px-4 py-2 border-b-2 bg-gray-50 hover:bg-gray-200"
              onClick={() => navigate("/login")}>
              <span>Autentificare</span>
            </button>
            <button className="flex items-center px-4 py-2 border-b-2 bg-gray-50 hover:bg-gray-200"
              onClick={toggleCartPanel}>
              {<FaShoppingCart className="mr-2" /> }
              <span>Coș de cumpărături</span>
            </button>
            {isAdmin && ( // Conditionally render the "Admin" link based on user permission
              <li className="px-4 py-2 bg-gray-50 hover:bg-gray-200">
                <NavLink to="/adminPage">Admin</NavLink>
              </li>
            )}
          </ul>} 
    </div>
  );
};

export default Navbar;
