export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  // handle numeric timestamps (seconds or ms)
  let date;
  if (typeof dateString === "number" || /^\d+$/.test(String(dateString))) {
    const ts = Number(dateString);
    date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) return "N/A";

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  let hour = date.getHours();
  const minutes = date.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  const formattedTime = `${hour}:${minutes.toString().padStart(2, "0")} ${period}`;

  return `${formattedDate} | ${formattedTime}`;
};
