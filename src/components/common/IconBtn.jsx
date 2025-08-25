// import React from "react"
// import "./IconBtn.css"

// export default function IconBtn({
//   text,
//   onClick,  // debug change 
//   children,
//   disabled,
//   outline = false,
//   customClasses,
//   type="button",
// }) {
//   return (
//     <button
//       disabled={disabled}
//       onClick={onClick}
//       type={type}
//       className={`icon-btn ${outline ? "icon-btn-outline" : "icon-btn-filled"} ${customClasses}`}
//     >
//       {children ? (
//         <>
//           <span className={outline ? "icon-btn-outline-text" : ""}>{text}</span>
//           {children}
//         </>
//       ) : (
//         text
//       )}
//     </button>
//   )
// }


import React from "react"
import "./IconBtn.css"

export default function IconBtn({
  text,
  onClick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
  ...rest
}) {
  const baseClass = "icon-btn"
  const variantClass = outline ? "icon-btn-outline" : "icon-btn-filled"
  const classes = `${baseClass} ${variantClass} ${customClasses}`.trim()

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={classes}
      {...rest}
    >
      {/* keep same visual behavior */}
      {children ? (
        <>
          <span className={outline ? "icon-btn-outline-text" : ""}>
            {text}
          </span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
