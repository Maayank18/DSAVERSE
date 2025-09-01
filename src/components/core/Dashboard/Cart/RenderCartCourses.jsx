// import { FaStar } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import ReactStars from "../../../common/RatingStars";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart } from "../../../../slices/cartSlice";
// import "./RenderCartCourses.css";

// export default function RenderCartCourses() {
//   const { cart } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   return (
//     <div className="render-cart-wrapper">
//       {cart.map((course, indx) => (
//         <div
//           key={course._id}
//           className={`render-cart-item ${
//             indx !== cart.length - 1 ? "with-border" : ""
//           }`}
//         >
//           {/*-- FIX: Image is now a direct child of the grid container --*/}
//           <img
//             src={course?.thumbnail}
//             alt={course?.courseName}
//             className="render-cart-img"
//           />

//           {/*-- FIX: Details are now a direct child for proper grid alignment --*/}
//           <div className="render-cart-details">
//             <p className="course-name">{course?.courseName}</p>
//             <p className="course-category">{course?.category?.name}</p>
//             <div className="course-rating">
//               <span className="rating-value">4.5</span>
//               <ReactStars
//                 count={5}
//                 value={course?.ratingAndReviews?.length}
//                 size={20}
//                 edit={false}
//                 activeColor="#ffd700"
//                 emptyIcon={<FaStar />}
//                 fullIcon={<FaStar />}
//               />
//               <span className="rating-count">
//                 {course?.ratingAndReviews?.length} Ratings
//               </span>
//             </div>
//           </div>

//           {/*-- Right-side column for actions and price --*/}
//           <div className="render-cart-right">
//             <button
//               onClick={() => dispatch(removeFromCart(course._id))}
//               className="remove-btn"
//             >
//               <RiDeleteBin6Line size={20} />
//               <span>Remove</span>
//             </button>
//             <p className="course-price">₹ {course?.price.toLocaleString("en-IN")}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "../../../common/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating"; // <-- adjust this path if needed
import "./RenderCartCourses.css";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Defensive: ensure cart is an array
  const safeCart = Array.isArray(cart) ? cart : [];

  return (
    <div className="render-cart-wrapper">
      {safeCart.map((course, indx) => {
        const reviews = Array.isArray(course?.ratingAndReviews)
          ? course.ratingAndReviews
          : [];
        const ratingCount = reviews.length;
        const avgRating = GetAvgRating(reviews); // numeric (0 if no ratings)
        const displayRating =
          ratingCount > 0 ? avgRating.toFixed(1) : "New"; // string for UI label

        const priceNumber = Number(course?.price ?? 0);

        return (
          <div
            key={course?._id ?? `${indx}`}
            className={`render-cart-item ${
              indx !== safeCart.length - 1 ? "with-border" : ""
            }`}
          >
            <img
              src={course?.thumbnail}
              alt={course?.courseName ?? "course-thumbnail"}
              className="render-cart-img"
            />

            <div className="render-cart-details">
              <p className="course-name">{course?.courseName ?? "Untitled"}</p>
              <p className="course-category">
                {course?.category?.name ?? "Uncategorized"}
              </p>

              <div className="course-rating">
                <span className="rating-value">{displayRating}</span>

                <ReactStars
                  count={5}
                  value={avgRating} // numeric value between 0 - 5
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />

                <span className="rating-count">
                  {ratingCount > 0 ? `${ratingCount} Ratings` : "No ratings yet"}
                </span>
              </div>
            </div>

            <div className="render-cart-right">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="remove-btn"
              >
                <RiDeleteBin6Line size={20} />
                <span>Remove</span>
              </button>

              <p className="course-price">
                ₹ {Number.isFinite(priceNumber) ? priceNumber.toLocaleString("en-IN") : "-"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
