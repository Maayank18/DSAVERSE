import React from "react"
import "./IconBtn.css"

export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`icon-btn ${outline ? "icon-btn-outline" : "icon-btn-filled"} ${customClasses}`}
      type={type}
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
