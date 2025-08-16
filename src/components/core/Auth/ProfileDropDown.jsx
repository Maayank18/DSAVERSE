// import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../../../hooks/useOnClickOutside"
// import { logout } from "../../../services/operations/authAPI"

// import "./ProfileDropDown.css"

// export default function ProfileDropDown() {
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useOnClickOutside(ref, () => setOpen(false))

//   if (!user) return null

//   return (
//     <button className="profile-dropdown-wrapper" onClick={() => setOpen(true)}>
//       <div className="profile-button-content">
//         <img
//           src={user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="profile-avatar"
//         />
//         <AiOutlineCaretDown className="dropdown-icon" />
//       </div>
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="dropdown-menu"
//           ref={ref}
//         >
//           <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//             <div className="dropdown-item">
//               <VscDashboard className="dropdown-item-icon" />
//               Dashboard
//             </div>
//           </Link>
//           <div
//             onClick={() => {
//               dispatch(logout(navigate))
//               setOpen(false)
//             }}
//             className="dropdown-item"
//           >
//             <VscSignOut className="dropdown-item-icon" />
//             Logout
//           </div>
//         </div>
//       )}
//     </button>
//   )
// }

import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

import "./ProfileDropDown.css"

export default function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="profile-dropdown-wrapper" ref={ref}>
      <button
        className="profile-button-content"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profile-avatar"
        />
        <AiOutlineCaretDown
          className={`dropdown-icon ${open ? "rotate" : ""}`}
        />
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="dropdown-menu"
        >
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="dropdown-link"
          >
            <div className="dropdown-item">
              <VscDashboard className="dropdown-item-icon" />
              Dashboard
            </div>
          </Link>
          <button
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="dropdown-item"
          >
            <VscSignOut className="dropdown-item-icon" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
