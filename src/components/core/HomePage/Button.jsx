import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div className={`custom-button ${active ? 'active-button' : 'inactive-button'}`}>
        {children}
      </div>
    </Link>
  )
}

export default Button
