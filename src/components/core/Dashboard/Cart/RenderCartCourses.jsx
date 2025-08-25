// import { FaStar } from "react-icons/fa"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import ReactStars from "react-rating-stars-component"
// import { useDispatch, useSelector } from "react-redux"

// import { removeFromCart } from "../../../../slices/cartSlice"
// import "./RenderCartCourses.css"

// export default function RenderCartCourses() {
//   const { cart } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()

//   return (
//     <div className="render-cart-wrapper">
//       {cart.map((course, indx) => (
//         <div
//           key={course._id}
//           className={`render-cart-item ${
//             indx !== cart.length - 1 ? "with-border" : ""
//           } ${indx !== 0 ? "margin-top" : ""}`}
//         >
//           <div className="render-cart-left">
//             <img
//               src={course?.thumbnail}
//               alt={course?.courseName}
//               className="render-cart-img"
//             />
//             <div className="render-cart-details">
//               <p className="course-name">{course?.courseName}</p>
//               <p className="course-category">{course?.category?.name}</p>
//               <div className="course-rating">
//                 <span className="rating-value">4.5</span>
//                 <ReactStars
//                   count={5}
//                   value={course?.ratingAndReviews?.length}
//                   size={18}
//                   edit={false}
//                   activeColor="#ffd700"
//                   emptyIcon={<FaStar />}
//                   fullIcon={<FaStar />}
//                 />
//                 <span className="rating-count">
//                   {course?.ratingAndReviews?.length} Ratings
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="render-cart-right">
//             <button
//               onClick={() => dispatch(removeFromCart(course._id))}
//               className="remove-btn"
//             >
//               <RiDeleteBin6Line />
//               <span>Remove</span>
//             </button>
//             <p className="course-price">₹ {course?.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// src/components/core/Dashboard/Cart/RenderCartCourses.js

import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "../../../common/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import "./RenderCartCourses.css";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="render-cart-wrapper">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`render-cart-item ${
            indx !== cart.length - 1 ? "with-border" : ""
          }`}
        >
          {/*-- FIX: Image is now a direct child of the grid container --*/}
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="render-cart-img"
          />

          {/*-- FIX: Details are now a direct child for proper grid alignment --*/}
          <div className="render-cart-details">
            <p className="course-name">{course?.courseName}</p>
            <p className="course-category">{course?.category?.name}</p>
            <div className="course-rating">
              <span className="rating-value">4.5</span>
              <ReactStars
                count={5}
                value={course?.ratingAndReviews?.length}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
              <span className="rating-count">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
          </div>

          {/*-- Right-side column for actions and price --*/}
          <div className="render-cart-right">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="remove-btn"
            >
              <RiDeleteBin6Line size={20} />
              <span>Remove</span>
            </button>
            <p className="course-price">₹ {course?.price.toLocaleString("en-IN")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}