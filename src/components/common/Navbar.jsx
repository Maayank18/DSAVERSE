// import { useEffect, useRef, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { Link, matchPath, useLocation } from "react-router-dom";

// import Logo from "../../assets/Images/WebsiteLogo.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
// import { ACCOUNT_TYPE } from "../../utils/constants";
// import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import "./Navbar.css";

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const location = useLocation();

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // --- NEW: local UI state and ref to control dropdown open/close ---
//   const dropdownRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await fetchCourseCategories();
//         setSubLinks(res || []);
//       } catch (error) {
//         console.log("Could not fetch Categories.", error);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // Close dropdown when location changes (navigations)
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location]);

//   // Close on Escape key
//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key === "Escape") setIsOpen(false);
//     };
//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, []);

//   return (
//     <div className={`navbar-wrapper ${location.pathname !== "/" ? "navbar-colored" : ""}`}>
//       <div className="navbar-container">
//         <Link to="/">
//           <img
//             src={Logo}
//             alt="Logo"
//             className="navbar-logo"
//             loading="lazy"
//           />
//         </Link>

//         <nav className="navbar-links">
//           <ul>
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div
//                     ref={dropdownRef}
//                     className={`dropdown-group ${isOpen ? "open" : ""} ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}
//                     tabIndex={0}
//                   >
//                     {/* Make trigger interactive - click toggles open state */}
//                     <p
//                       className="dropdown-trigger"
//                       role="button"
//                       tabIndex={0}
//                       onClick={(e) => {
//                         // toggle only when clicking trigger
//                         setIsOpen((s) => !s);
//                       }}
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter" || e.key === " ") {
//                           e.preventDefault();
//                           setIsOpen((s) => !s);
//                         }
//                       }}
//                     >
//                       {link.title}
//                     </p>

//                     <BsChevronDown className="dropdown-chevron" />

//                     <div className="dropdown-content" role="menu">
//                       <div className="dropdown-arrow" />
//                       {loading ? (
//                         <p className="text-center dropdown-status">Loading...</p>
//                       ) : subLinks && subLinks.length > 0 ? (
//                         subLinks.map((subLink, i) => (
//                           <Link
//                             to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
//                             className="dropdown-item"
//                             key={i}
//                             onClick={() => {
//                               // close immediately on click (route change also closes via effect)
//                               setIsOpen(false);
//                             }}
//                           >
//                             <p>{subLink.name}</p>
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="text-center dropdown-status">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link.path} className={matchRoute(link.path) ? "active" : ""}>
//                     <p>{link.title}</p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="navbar-auth">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="cart-icon">
//               <AiOutlineShoppingCart className="icon" />
//               {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="auth-button">Log in</button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="auth-button">Sign up</button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropDown />}
//         </div>

//         <button className="menu-icon">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import Logo from "../../assets/Images/WebsiteLogo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
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

  // --- NEW: local UI state and ref to control dropdown open/close ---
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchCourseCategories();
        setSubLinks(res || []);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close dropdown when location changes (navigations)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={`navbar-wrapper ${
        location.pathname !== "/" ? "navbar-colored" : ""
      }`}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-wrapper">
          <img src={Logo} alt="Logo" className="navbar-logo" loading="lazy" />
        </Link>

        <nav className="navbar-links">
          <ul>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  /* interactive wrapper is the dropdownRef */
                  <div
                    ref={dropdownRef}
                    className={`dropdown-group ${
                      isOpen ? "open" : ""
                    } ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      // If click originated from a dropdown item (a Link), don't toggle here.
                      // Let the link's onClick handle closing and navigation.
                      const el = e.target;
                      // Support environments without closest by guarding:
                      const clickedItem =
                        typeof el.closest === "function"
                          ? el.closest(".dropdown-item")
                          : null;
                      if (clickedItem) return;
                      setIsOpen((s) => !s);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsOpen((s) => !s);
                      } else if (e.key === "Escape") {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="dropdown-trigger-wrapper">
                      <p className="dropdown-trigger">{link.title}</p>
                      <BsChevronDown className="dropdown-chevron" />
                    </div>

                    <div className="dropdown-content" role="menu">
                      <div className="dropdown-arrow" />
                      {loading ? (
                        <p className="text-center dropdown-status">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="dropdown-item"
                            key={i}
                            onClick={() => {
                              // close immediately on click (route change also closes via effect)
                              setIsOpen(false);
                            }}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center dropdown-status">
                          No Courses Found
                        </p>
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
