// import React, { useEffect, useState } from "react";
// import {
//   TiStarFullOutline,
//   TiStarHalfOutline,
//   TiStarOutline,
// } from "react-icons/ti";
// import "./RatingStars.css";

// function RatingStars({ Review_Count, Star_Size = 20, onChange, editable = false }) {
//   const [starCount, setStarCount] = useState({ full: 0, half: 0, empty: 5 });

//   useEffect(() => {
//     let rating = Number(Review_Count) || 0;
//     rating = Math.max(0, Math.min(rating, 5)); // clamp between 0 and 5

//     const full = Math.floor(rating);
//     const hasHalf = rating % 1 >= 0.5 ? 1 : 0;
//     const empty = 5 - full - hasHalf;

//     setStarCount({ full, half: hasHalf, empty });
//   }, [Review_Count]);

//   const handleClick = (index) => {
//     if (!editable) return;
//     onChange?.(index + 1);
//   };

//   return (
//     <div className={`rating-stars ${editable ? "editable" : ""}`}>
//       {[...Array(starCount.full)].map((_, i) => (
//         <TiStarFullOutline
//           key={`full-${i}`}
//           size={Star_Size}
//           onClick={() => handleClick(i)}
//         />
//       ))}
//       {[...Array(starCount.half)].map((_, i) => (
//         <TiStarHalfOutline
//           key={`half-${i}`}
//           size={Star_Size}
//           onClick={() => handleClick(starCount.full)}
//         />
//       ))}
//       {[...Array(starCount.empty)].map((_, i) => (
//         <TiStarOutline
//           key={`empty-${i}`}
//           size={Star_Size}
//           onClick={() =>
//             handleClick(starCount.full + starCount.half + i)
//           }
//         />
//       ))}
//     </div>
//   );
// }

// export default RatingStars;


// RatingStars.jsx
import React, { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import "./RatingStars.css";

function RatingStars({
  Review_Count,       // legacy prop your other code may use
  value,              // new/standard prop (ReviewSlider is sending this)
  Star_Size = 20,
  onChange,
  editable = false,
}) {
  // prefer `value` if provided, otherwise fall back to Review_Count
  let rating = Number(value ?? Review_Count) || 0;
  rating = Math.max(0, Math.min(rating, 5)); // clamp 0..5

  const [starCount, setStarCount] = useState({ full: 0, half: 0, empty: 5 });

  useEffect(() => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - hasHalf;
    setStarCount({ full, half: hasHalf, empty });
  }, [rating]);

  const handleClick = (index) => {
    if (!editable) return;
    const newValue = index + 1;
    onChange?.(newValue);
  };

  return (
    <div className={`rating-stars ${editable ? "editable" : ""}`}>
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline
          key={`full-${i}`}
          size={Star_Size}
          className="star full"
          onClick={() => handleClick(i)}
        />
      ))}

      {[...Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline
          key={`half-${i}`}
          size={Star_Size}
          className="star half"
          onClick={() => handleClick(starCount.full)}
        />
      ))}

      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline
          key={`empty-${i}`}
          size={Star_Size}
          className="star empty"
          onClick={() => handleClick(starCount.full + starCount.half + i)}
        />
      ))}
    </div>
  );
}

export default RatingStars;
