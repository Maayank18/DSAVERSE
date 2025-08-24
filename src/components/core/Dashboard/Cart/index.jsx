// import { useSelector } from "react-redux"

// import RenderCartCourses from "./RenderCartCourses"
// import RenderTotalAmount from "./RenderTotalAmount"
// import "./index.css"

// export default function Cart() {
//   const { total, totalItems } = useSelector((state) => state.cart)

//   return (
//     <div className="cart-wrapper">
//       <h1 className="cart-heading">Cart</h1>
//       <p className="cart-subheading">{totalItems} Courses in Cart</p>
//       {total > 0 ? (
//         <div className="cart-body">
//           <RenderCartCourses />
//           <RenderTotalAmount />
//         </div>
//       ) : (
//         <p className="cart-empty">Your cart is empty</p>
//       )}
//     </div>
//   )
// }


import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
import "./index.css"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="cart-wrapper">
      <h1 className="cart-heading">Cart</h1>
      <p className="cart-subheading">{totalItems} Courses in Cart</p>
      {total > 0 ? (
        <div className="cart-body">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}
    </div>
  )
}
