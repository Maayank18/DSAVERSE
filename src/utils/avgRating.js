// export default function GetAvgRating(ratingArr) {
//     if (ratingArr?.length === 0) return 0
//     const totalReviewCount = ratingArr?.reduce((acc, curr) => {
//       acc += curr.rating
//       return acc
//     }, 0)
  
//     const multiplier = Math.pow(10, 1)
//     const avgReviewCount =
//       Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
  
//     return avgReviewCount
//   }

// utils/GetAvgRating.js
export default function GetAvgRating(ratingArr = []) {
  // Defensive: if not an array or empty, return 0
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) return 0;

  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    // guard missing/undefined rating fields and coerce to number
    return acc + Number(curr?.rating ?? 0);
  }, 0);

  const multiplier = Math.pow(10, 1); // 1 decimal place
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier;

  return avgReviewCount;
}
