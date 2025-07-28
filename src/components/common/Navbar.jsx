import React, { useEffect, useState } from 'react'
import { Link, useLocation, matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDropdownCircle } from "react-icons/io"

import Logo from '../../assets/Images/WebsiteLogo.png'
import { NavbarLinks } from '../../data/navbar-links'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import ProfileDropDown from '../core/Auth/ProfileDropDown'

import './Navbar.css'

const Navbar = ({ children }) => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.auth)
  const location = useLocation()
  const [subLinks, setSubLinks] = useState([])

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      console.log("printing sublinks result:", result)
      setSubLinks(result.data.data)
    } catch (error) {
      console.log("could not fetch category list")
    }
  }

  useEffect(() => {
    fetchSubLinks()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} width={160} height={42} alt="Logo" />
          </Link>

          {/* Navigation links */}
          <nav>
            <ul className="nav-links">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="catalog-dropdown">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />
                      <div className="dropdown-content">
                        <div className="dropdown-arrow">
                          {subLinks.length > 0
                            ? subLinks.map((subLink, i) => (
                                <Link to={`${subLink.link}`} key={i}>
                                  <p>{subLink.title}</p>
                                </Link>
                              ))
                            : <div></div>
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p className={matchRoute(link.path) ? "active-link" : "inactive-link"}>
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth buttons / Cart / Profile */}
          <div className="auth-section">
            {user && user.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="cart-icon">
                <AiOutlineShoppingCart />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            )}
            {token === null ? (
              <>
                <Link to="/login">
                  <button className="auth-button">Log In</button>
                </Link>
                <Link to="/signup">
                  <button className="auth-button">Sign In</button>
                </Link>
              </>
            ) : (
              <ProfileDropDown />
            )}
          </div>
        </div>
      </div>

      {/* Render your Routes (or any children) here */}
      <main className="page-content">
        {children}
      </main>
    </>
  )
}

export default Navbar
