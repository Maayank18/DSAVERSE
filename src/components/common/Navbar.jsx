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

//   // Desktop catalog dropdown
//   const dropdownRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);

//   // Mobile menu
//   const mobileMenuRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

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

//   // Close desktop dropdown when clicking outside
//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // Close mobile menu on outside click
//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // Close both menus on navigation (route change)
//   useEffect(() => {
//     setIsOpen(false);
//     setIsMenuOpen(false);
//   }, [location]);

//   // Close menus on Escape
//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key === "Escape") {
//         setIsOpen(false);
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, []);

//   return (
//     <div
//       className={`navbar-wrapper ${
//         location.pathname !== "/" ? "navbar-colored" : ""
//       }`}
//     >
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo-wrapper">
//           <img src={Logo} alt="Logo" className="navbar-logo" loading="lazy" />
//         </Link>

//         {/* Desktop links */}
//         <nav className="navbar-links" aria-label="Main navigation">
//           <ul>
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div
//                     ref={dropdownRef}
//                     className={`dropdown-group ${
//                       isOpen ? "open" : ""
//                     } ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}
//                     role="button"
//                     tabIndex={0}
//                     aria-haspopup="menu"
//                     aria-expanded={isOpen}
//                     onClick={(e) => {
//                       const el = e.target;
//                       const clickedItem =
//                         typeof el.closest === "function"
//                           ? el.closest(".dropdown-item")
//                           : null;
//                       if (clickedItem) return;
//                       setIsOpen((s) => !s);
//                     }}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" || e.key === " ") {
//                         e.preventDefault();
//                         setIsOpen((s) => !s);
//                       } else if (e.key === "Escape") {
//                         setIsOpen(false);
//                       }
//                     }}
//                   >
//                     <div className="dropdown-trigger-wrapper">
//                       <p className="dropdown-trigger">{link.title}</p>
//                       <BsChevronDown className="dropdown-chevron" />
//                     </div>

//                     <div className="dropdown-content" role="menu">
//                       <div className="dropdown-arrow" />
//                       {loading ? (
//                         <p className="text-center dropdown-status">Loading...</p>
//                       ) : subLinks && subLinks.length > 0 ? (
//                         subLinks.map((subLink, i) => (
//                           <Link
//                             to={`/catalog/${subLink.name
//                               .split(" ")
//                               .join("-")
//                               .toLowerCase()}`}
//                             className="dropdown-item"
//                             key={i}
//                             onClick={() => {
//                               setIsOpen(false);
//                             }}
//                           >
//                             <p>{subLink.name}</p>
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="text-center dropdown-status">
//                           No Courses Found
//                         </p>
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

//         {/* Mobile menu button */}
//         <button
//           className="menu-icon"
//           aria-label="Toggle menu"
//           aria-expanded={isMenuOpen}
//           aria-controls="mobile-menu"
//           onClick={() => setIsMenuOpen((s) => !s)}
//         >
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>

//       {/* Mobile menu (responsive) */}
//       <div
//         id="mobile-menu"
//         ref={mobileMenuRef}
//         className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
//         aria-hidden={!isMenuOpen}
//       >
//         <nav aria-label="Mobile navigation">
//           <ul className="mobile-links">
//             {NavbarLinks.map((link, idx) => (
//               <li key={idx} className="mobile-link-item">
//                 {link.title === "Catalog" ? (
//                   <div className="mobile-catalog">
//                     <button
//                       className="mobile-catalog-trigger"
//                       onClick={(e) => {
//                         // toggle a simple local collapse per click - use data attribute
//                         const el = e.currentTarget;
//                         const parent = el.closest(".mobile-link-item");
//                         if (parent) parent.classList.toggle("expanded");
//                       }}
//                       aria-expanded={false}
//                     >
//                       <span>{link.title}</span>
//                       <BsChevronDown />
//                     </button>

//                     <div className="mobile-catalog-panel">
//                       {loading ? (
//                         <p className="dropdown-status">Loading...</p>
//                       ) : subLinks && subLinks.length > 0 ? (
//                         subLinks.map((sub, si) => (
//                           <Link
//                             key={si}
//                             to={`/catalog/${sub.name.split(" ").join("-").toLowerCase()}`}
//                             className="mobile-subitem"
//                             onClick={() => setIsMenuOpen(false)}
//                           >
//                             {sub.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="dropdown-status">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="mobile-simple-link"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {link.title}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <div className="mobile-menu-divider" />

//           <div className="mobile-account">
//             {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//               <Link
//                 to="/dashboard/cart"
//                 className="mobile-account-row"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <AiOutlineShoppingCart /> <span>Cart</span>
//                 {totalItems > 0 && <span className="cart-count-inline">{totalItems}</span>}
//               </Link>
//             )}

//             {token === null ? (
//               <div className="mobile-auth-buttons">
//                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-auth">
//                   Log in
//                 </Link>
//                 <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="mobile-auth signup">
//                   Sign up
//                 </Link>
//               </div>
//             ) : (
//               <>
//                 <Link to="/dashboard/profile" onClick={() => setIsMenuOpen(false)} className="mobile-account-row">
//                   Profile
//                 </Link>
//                 <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="mobile-account-row">
//                   Dashboard
//                 </Link>
//               </>
//             )}
//           </div>
//         </nav>
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

  // Desktop catalog dropdown
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Mobile menu
  const mobileMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close both menus on navigation (route change)
  useEffect(() => {
    setIsOpen(false);
    setIsMenuOpen(false);
  }, [location]);

  // Close menus on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsMenuOpen(false);
      }
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

        {/* Desktop links */}
        <nav className="navbar-links" aria-label="Main navigation">
          <ul>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
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
                      const el = e.target;
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
          {/* TOP CART: visible on desktop, hidden on mobile via CSS class hide-on-mobile */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="cart-icon hide-on-mobile">
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

        {/* Mobile menu button */}
        <button
          className="menu-icon"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((s) => !s)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile menu (responsive) */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-links">
            {NavbarLinks.map((link, idx) => (
              <li key={idx} className="mobile-link-item">
                {link.title === "Catalog" ? (
                  <div className="mobile-catalog">
                    <button
                      className="mobile-catalog-trigger"
                      onClick={(e) => {
                        // toggle a simple local collapse per click - use data attribute
                        const el = e.currentTarget;
                        const parent = el.closest(".mobile-link-item");
                        if (parent) parent.classList.toggle("expanded");
                      }}
                      aria-expanded={false}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown />
                    </button>

                    <div className="mobile-catalog-panel">
                      {loading ? (
                        <p className="dropdown-status">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks.map((sub, si) => (
                          <Link
                            key={si}
                            to={`/catalog/${sub.name.split(" ").join("-").toLowerCase()}`}
                            className="mobile-subitem"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))
                      ) : (
                        <p className="dropdown-status">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="mobile-simple-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-menu-divider" />

          <div className="mobile-account">
            {/* MOBILE: show cart inside the hamburger (only here) */}
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                className="mobile-account-row"
                onClick={() => setIsMenuOpen(false)}
              >
                <AiOutlineShoppingCart /> <span style={{ marginLeft: 8 }}>Cart</span>
                {totalItems > 0 && <span className="cart-count-inline">{totalItems}</span>}
              </Link>
            )}

            {token === null ? (
              <div className="mobile-auth-buttons">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-auth">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="mobile-auth signup">
                  Sign up
                </Link>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;

