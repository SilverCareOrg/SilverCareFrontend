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
import cart_svg from "../styles/icons/cart.svg";
import user_svg from "../styles/icons/user.svg";
import command_svg from "../styles/icons/command.svg";
import chat_svg from "../styles/icons/chat.svg";


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
  //   <div className="relative flex-column items-center">
  //   <div className="lg:shadow-lg max-lg:items-start max-lg:flex-column backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
  //     <nav className="mt-30 max-lg:flex-columns max-lg:items-start flex items-center container mx-auto">
  //       <div className="ml-5">
  //         <Link to="/">
  //           <img src={logo_img} alt="logo" className="object-contain max-w-full max-h-full w-32"/>
  //         </Link>
  //       </div>


  //       {/* Larger Screen Navbar Components */}
  
        
  //       <div className="ml-auto mr-70 max-lg:hidden">
  //     <ul className="list-none flex justify-center items-center px-10 ml-auto mr-70 gap-7 text-xl">
  //       <li>
  //         <NavLink
  //           to="/"
  //           className="nav-link" //{`nav-link ${location.pathname === "/" ? "active" : ""}`}
  //         >
  //           Pagina principală
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink
  //           to="/product"
  //           className="nav-link"
  //         >
  //           Experiențe
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink
  //           to="/about"
  //           className="nav-link"
  //         >
  //           Despre noi
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink
  //           to="/contact"
  //           className="nav-link"
  //         >
  //           Contact
  //         </NavLink>
  //       </li>
  //       <li>
  //         {isLoggedIn ? (
  //           <NavLink
  //             to="#"
  //             onClick={handleLogout}
  //             className="nav-link"
  //           >
  //             Logout
  //           </NavLink>
  //         ) : (
  //           <NavLink
  //             to="/login"
  //             className="nav-link"
  //           >
  //             Autentificare
  //           </NavLink>
  //         )}
  //       </li>
  //       <button onClick={toggleCartPanel}>
  //         <FaShoppingCart />
  //       </button>
  //       {isAdmin && (
  //         <li>
  //           <NavLink
  //             to="/adminPage"
  //             className="nav-link"
  //           >
  //             Admin
  //           </NavLink>
  //         </li>
  //       )}
  //     </ul>
  //   </div>

  //       {/* Smaller Screen Navbar Components */}
  //       <div className="mt-auto px-8 ml-auto mr-70 lg:hidden flex-column items-start">
  //         <button onClick={toggleVerticalMenu}>
  //             {!verticalMenu ? <LuMenu className="h-7 w-7 "/>: <AiOutlineClose className="h-7 w-7"/>}
  //         </button>  
  //       </div>

  //     </nav>
  //     {visibleCartPanel && <CartPanel onClose={closeCartPanel}></CartPanel>}
  //   </div>
  //   {verticalMenu && (
  //   <ul className="lg:hidden border-b">
  //     <li className="relative group">
  //       <button
  //         className="flex items-center justify-between w-full px-4 py-3 border-t-2 border-b-2 bg-gray-100 hover:bg-gray-300"
  //         onClick={() => navigate("/")}
  //       >
  //         <span>Pagina principală</span>
  //       </button>
  //     </li>
  //     <li className="relative group">
  //       <button
  //         className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
  //         onClick={() => navigate("/product")}
  //       >
  //         <span>Experiențe</span>
  //       </button>
  //     </li>
  //     <li className="relative group">
  //       <button
  //         className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
  //         onClick={() => navigate("/about")}
  //       >
  //         <span>Despre noi</span>
  //       </button>
  //     </li>
  //     <li className="relative group">
  //       <button
  //         className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
  //         onClick={() => navigate("/contact")}
  //       >
  //         <span>Contact</span>
  //       </button>
  //     </li>
  //     <li className="relative group">
  //       {isLoggedIn ? (
  //           <button
  //           className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
  //           onClick={handleLogout}
  //         >
  //           <span>Logout</span>
  //         </button> ) : (
  //           <button
  //           className="flex items-center justify-between w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
  //           onClick={() => navigate("/login")}
  //         >
  //           <span>Autentificare</span>
  //         </button>
  //         )}
  //     </li>
  //     <li className="relative group">
  //       <button
  //         className="flex items-center w-full px-4 py-3 border-b-2 bg-gray-100 hover:bg-gray-300"
  //         onClick={toggleCartPanel}
  //       >
  //         {<FaShoppingCart className="mr-2" /> }
  //         <span className="">
  //           Coș de cumpărături
  //         </span>
  //       </button>
  //     </li>
  //     {isAdmin && (
  //       <li className="relative group">
  //         <NavLink
  //           to="/adminPage"
  //           className="block w-full px-4 py-3 bg-gray-100 hover:bg-gray-300"
  //         >
  //           Admin
  //         </NavLink>
  //       </li>
  //     )}
  //   </ul>
  // )}
  //   </div>
  <div className="relative left-[calc(50%_-_720px)] w-[90rem] flex flex-col items-center justify-start text-center text-[0.88rem]">
  <div className="bg-white w-[90rem] h-[5rem] overflow-hidden shrink-0 flex flex-row items-center justify-center py-[0rem] px-[1.5rem] box-border">
    <div className="w-[77rem] flex flex-row items-center justify-center">
      <div className="flex-1 flex flex-row items-center justify-between">
        <div className="flex flex-row items-start justify-start">
        <NavLink
            to="/"
            >
          <div className="flex flex-row items-center justify-center">
            <img
              className="relative w-[7.72rem] h-[2.5rem]"
              alt=""
              src={logo_img}
            />
          </div>
          </NavLink>
        </div>
        <div className="w-[66.91rem] overflow-hidden shrink-0 flex flex-row items-center justify-end gap-[1rem]">
          {/* <div className="flex-1 hidden flex-col items-center justify-end py-[0rem] px-[2rem] text-left text-[1rem] text-text-fields-grey">
            <div className="self-stretch rounded bg-white box-border h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] gap-[1rem] border-[1px] border-solid border-black">
              <div className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]">
                Cauta o experienta
              </div>
              <img
                className="relative w-[1.5rem] h-[1.5rem]"
                alt=""
                src={command_svg}
              />
            </div>
          </div> */}
          {/* <div className="flex flex-row items-center justify-start">
            <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center w-[6.44rem] h-[2rem] shrink-0">
              RO/EN
            </b>
          </div> */}

        <NavLink
            to="/product"
            >
          <div className="rounded bg-white h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border gap-[0.5rem] text-accent">
            <div className="flex flex-row items-center justify-start relative gap-[0.63rem]">
              <div className="relative rounded-3xl bg-white w-[3rem] h-[3rem] z-[0]" />
              <img
                className="absolute my-0 mx-[!important] h-[43.33%] w-8/12 top-[37.33%] right-[25%] bottom-[33.33%] left-[25%] max-w-full overflow-hidden max-h-full z-[1]"
                alt=""
                src={command_svg}
              />
            </div>
            <b className="relative tracking-[0.15em] leading-[120%] uppercase">
              rezerva acum
            </b>
          </div>
          </NavLink>

          <NavLink
            to="/contact"
            >
          <div className="rounded bg-white h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border gap-[0.5rem]">
            <div className="flex flex-row items-center justify-start relative gap-[0.63rem]">
              <div className="relative rounded-3xl bg-white w-[3rem] h-[3rem] z-[0]" />
              <img
                className="absolute my-0 mx-[!important] h-[43.74%] w-8/12 top-[29.17%] right-[25%] bottom-[27.09%] left-[25%] max-w-full overflow-hidden max-h-full z-[1]"
                alt=""
                src={chat_svg}
              />
            </div>
            <b className="relative tracking-[0.15em] leading-[120%] uppercase">
              CONTACT
            </b>
          </div>
          </NavLink>

          <NavLink
            to="/login"
            >
              <div className="rounded bg-white h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border gap-[0.5rem]">
                <div className="flex flex-row items-center justify-start relative gap-[0.63rem]">
                  <div className="relative rounded-3xl bg-white w-[3rem] h-[3rem] z-[0]" />
                  <img
                    className="absolute my-0 mx-[!important] h-3/6 w-[50.75%] top-[22.82%] right-[29.17%] bottom-[27.18%] left-[27.08%] max-w-full overflow-hidden max-h-full z-[1]"
                    alt=""
                    src={user_svg}
                  />
                </div>
                <b className="relative tracking-[0.15em] leading-[120%] uppercase">
                  Autentifica-te
                </b>
              </div>
          </NavLink>

          <button
            className="relative group"
            onClick={toggleCartPanel}
          >
            <div className="rounded-31xl bg-accent overflow-hidden flex flex-row items-center justify-start relative gap-[0.63rem]">
              <div className="relative bg-accent w-[3rem] h-[3rem] z-[0]" />
              <img
                className="absolute my-0 mx-[!important] top-[0.27rem] left-[0.04rem] w-[3rem] h-[2.5rem] z-[1]"
                alt=""
                src={cart_svg}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-white w-[90rem] h-[3.5rem] overflow-hidden shrink-0 flex flex-row items-center justify-center py-[0rem] px-[1.5rem] box-border">
    <div className="w-[77rem] flex flex-row items-center justify-center">
      <div className="flex-1 flex flex-row items-start justify-start py-[0rem] px-[12rem] gap-[2rem]">
      
      <NavLink to="/category">
        <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center w-[6rem] h-[2rem] shrink-0">
          EXPERIENTE
        </b>
        </NavLink>

        {/* <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center w-[6rem] h-[2rem] shrink-0">
          LOCATIE
        </b> */}

      <NavLink to="/category">
        <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center w-[6rem] h-[2rem] shrink-0">
          OCAZIE
        </b>
        </NavLink>

        <NavLink to="/category">
        <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center w-[5rem] h-[2rem] shrink-0">
          CADOU
        </b>
        </NavLink>

      </div>
    </div>
  </div>
  {visibleCartPanel && <CartPanel onClose={closeCartPanel}></CartPanel>}
</div>
  );
};

export default Navbar;
