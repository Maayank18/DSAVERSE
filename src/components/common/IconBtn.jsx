import React from "react"
import "./IconBtn.css"

export default function IconBtn({
  text,
  onClick,  // debug change 
  children,
  disabled,
  outline = false,
  customClasses,
  type="button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`icon-btn ${outline ? "icon-btn-outline" : "icon-btn-filled"} ${customClasses}`}
    >
      {children ? (
        <>
          <span className={outline ? "icon-btn-outline-text" : ""}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
