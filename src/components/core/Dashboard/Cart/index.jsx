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

// src/components/core/Dashboard/Cart/index.js

import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import "./index.css";

export default function Cart() {
  const { totalItems } = useSelector((state) => state.cart);
  // NOTE: We will not use `total` from the slice as it might be buggy.
  // The total will be calculated inside RenderTotalAmount.

  return (
    <div className="cart-wrapper">
      <h1 className="cart-heading">Your Cart</h1>
      <p className="cart-subheading">{totalItems} Courses in Cart</p>
      {totalItems > 0 ? (
        <div className="cart-body">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
}