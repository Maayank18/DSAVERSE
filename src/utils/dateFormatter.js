// export const formattedDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     })
//   }

export const formattedDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0]; // gives "2025-08-26"
};
