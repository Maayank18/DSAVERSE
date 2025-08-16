// import { useEffect, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { Link, matchPath, useLocation } from "react-router-dom";

// import Logo from "../../assets/Images/WebsiteLogo.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI"; // ✅ updated import
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

//   useEffect(() => {
//     // ✅ fetch categories using fetchCategories function
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await fetchCourseCategories(); // ✅ using fetchCategories
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
//                   <div className={`dropdown-group ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}>
//                     <p>{link.title}</p>
//                     <BsChevronDown />

//                     {/* ✅ DROPDOWN CONTENT */}
//                     <div className="dropdown-content">
//                       <div className="dropdown-arrow" />
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : subLinks && subLinks.length > 0 ? (
//                         subLinks.map((subLink, i) => (
//                           <Link
//                             to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
//                             className="dropdown-item"
//                             key={i}
//                           >
//                             <p>{subLink.name}</p>
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
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

import { useEffect, useState } from "react";
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
                  <div
                    className={`dropdown-group ${matchRoute("/catalog/:catalogName") ? "active" : ""}`}
                    tabIndex={0}
                  >
                    <p className="dropdown-trigger">{link.title}</p>
                    <BsChevronDown className="dropdown-chevron" />

                    <div className="dropdown-content" role="menu">
                      <div className="dropdown-arrow" />
                      {loading ? (
                        <p className="text-center dropdown-status">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="dropdown-item"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center dropdown-status">No Courses Found</p>
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
