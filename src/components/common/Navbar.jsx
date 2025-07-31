// import React, { useEffect, useState } from 'react'
// import { Link, useLocation, matchPath } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { AiOutlineShoppingCart } from "react-icons/ai"
// import { IoIosArrowDropdownCircle } from "react-icons/io"

// import Logo from '../../assets/Images/WebsiteLogo.png'
// import { NavbarLinks } from '../../data/navbar-links'
// import { apiConnector } from '../../services/apiconnector'
// import { categories } from '../../services/apis'
// import ProfileDropDown from '../core/Auth/ProfileDropDown'

// import './Navbar.css'

// const Navbar = ({ children }) => { // changed durinf the debugging
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.auth)
//   const location = useLocation()
//   const [subLinks, setSubLinks] = useState([])

//   const fetchSubLinks = async () => {
//     try {
//       const result = await apiConnector("GET", categories.CATEGORIES_API)
//       console.log("printing sublinks result:", result)
//       setSubLinks(Array.isArray(result.data.data) ? result.data.data : [])
//     } catch (error) {
//       console.log("could not fetch category list")
//     }
//   }

//   useEffect(() => {
//     fetchSubLinks()
//   }, [])

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <>
//       <div className="navbar">
//         <div className="navbar-container">
//           {/* Logo */}
//           <Link to="/">
//             <img src={Logo} width={160} height={42} alt="Logo" />
//           </Link>

//           {/* Navigation links */}
//           <nav>
//             <ul className="nav-links">
//               {NavbarLinks.map((link, index) => (
//                 <li key={index}>
//                   {link.title === "Catalog" ? (
//                     <div className="catalog-dropdown">
//                       <p>{link.title}</p>
//                       <IoIosArrowDropdownCircle />
//                       <div className="dropdown-content">
//                         <div className="dropdown-arrow">
//                           {Array.isArray(subLinks) && subLinks.length > 0
//                             ? subLinks.map((subLink, i) => (
//                                 <Link to={`${subLink.link}`} key={i}>
//                                   <p>{subLink.title}</p>
//                                 </Link>
//                               ))
//                             : <div></div>
//                           }
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <Link to={link.path}>
//                       <p className={matchRoute(link.path) ? "active-link" : "inactive-link"}>
//                         {link.title}
//                       </p>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Auth buttons / Cart / Profile */}
//           <div className="auth-section">
//             {user && user.accountType !== "Instructor" && (
//               <Link to="/dashboard/cart" className="cart-icon">
//                 <AiOutlineShoppingCart />
//                 {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
//               </Link>
//             )}
//             {token === null ? (
//               <>
//                 <Link to="/login">
//                   <button className="auth-button">Log In</button>
//                 </Link>
//                 <Link to="/signup">
//                   <button className="auth-button">Sign In</button>
//                 </Link>
//               </>
//             ) : (
//               <ProfileDropDown />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Render your Routes (or any children) here */}
//       <main className="page-content">
//         {children}
//       </main>
//     </>
//   )
// }

// export default Navbar


import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import Logo from "../../assets/Images/WebsiteLogo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import "./Navbar.css";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className={`navbar-wrapper ${location.pathname !== "/" ? "navbar-colored" : ""}`}>
      <div className="navbar-container">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="navbar-logo"
            loading="lazy"
          />
        </Link>


        <nav className="navbar-links">
          <ul>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className={`dropdown-group ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}>
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="dropdown-content">
                      <div className="dropdown-arrow" />
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="dropdown-item"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path} className={matchRoute(link.path) ? "active" : ""}>
                    <p>{link.title}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-auth">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="cart-icon">
              <AiOutlineShoppingCart className="icon" />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="auth-button">Log in</button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="auth-button">Sign up</button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>

        <button className="menu-icon">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;