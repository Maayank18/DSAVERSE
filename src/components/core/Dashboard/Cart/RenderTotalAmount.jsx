// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import IconBtn from "../../../common/IconBtn";
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
// import "./RenderTotalAmount.css";

// export default function RenderTotalAmount() {
//   const { total, cart } = useSelector((state) => state.cart);
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleBuyCourse = () => {
//     const courses = cart.map((c) => c._id); // use local name `c` to avoid collisions
//     buyCourse(token, courses, user, navigate, dispatch);
//   };

//   // Format the total as a number (removes stray leading zeros like "0199")
//   const formattedTotal = Number(total || 0).toLocaleString("en-IN");

//   return (
//     <div className="render-total-container">
//       <p className="render-total-label">Total:</p>
//       <p className="render-total-price">₹ {formattedTotal}</p>
//       <IconBtn
//         text="Buy Now"
//         onClick={handleBuyCourse}
//         customClasses="w-full justify-center"
//       />
//     </div>
//   );
// }


// src/components/core/Dashboard/Cart/RenderTotalAmount.js

// RenderTotalAmount.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import "./RenderTotalAmount.css";

function parsePrice(value) {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  // remove currency symbols, commas, spaces etc and parse
  const cleaned = String(value).replace(/[^0-9.-]+/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function RenderTotalAmount() {
  const { cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = Array.isArray(cart)
      ? cart.reduce((acc, curr) => acc + parsePrice(curr?.price), 0)
      : 0;
    setTotalAmount(total);
  }, [cart]);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div className="render-total-container">
      <p className="render-total-label">Total:</p>
      <p className="render-total-price">₹ {totalAmount.toLocaleString("en-IN")}</p>
      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
}

