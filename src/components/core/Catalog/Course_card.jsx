// // components/core/Course_Card.jsx  (adjust path/name to match your project)
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import RatingStars from "../../common/RatingStars";
// import { apiConnector } from "../../../services/apiconnector";
// import { ratingsEndpoints } from "../../../services/apis";
// import "./Course_Card.css";

// const Course_Card = ({ course }) => {
//   const [avgReviewCount, setAvgReviewCount] = useState(0);

//   useEffect(() => {
//     if (!course?._id) return;

//     const fetchAverageRating = async () => {
//       try {
//         // Use query param for GET
//         const url = `${ratingsEndpoints.GET_AVERAGE_RATING_API}?courseId=${course._id}`;

//         const response = await apiConnector("GET", url);

//         // Debugging log (remove in production)
//         // console.log("avg rating response", response?.data);

//         if (response?.data?.success) {
//           const rating = Number(response.data.averageRating) || 0;
//           setAvgReviewCount(rating);
//         } else {
//           // fallback if API responds with success: false or unexpected shape
//           setAvgReviewCount(0);
//         }
//       } catch (error) {
//         console.error("Could not fetch average rating for course:", course._id, error);
//         setAvgReviewCount(0);
//       }
//     };

//     fetchAverageRating();
//   }, [course?._id]); // only re-run when course._id changes

//   return (
//     <Link to={`/courses/${course._id}`} className="course-card-link">
//       <div className="course-card">
//         <div className="thumbnail-container">
//           <div className="thumbnail-img">
//             <img src={course?.thumbnail} alt="Course Thumbnail" />
//           </div>
//         </div>
//         <div className="course-card-info">
//           <p className="course-card-title">{course?.courseName}</p>
//           <p className="course-card-instructor">
//             {course?.instructor?.firstName} {course?.instructor?.lastName}
//           </p>
//           <div className="course-card-rating-row">
//             <span className="course-card-rating-count">
//               {typeof avgReviewCount === "number" ? avgReviewCount.toFixed(1) : "0.0"}
//             </span>
//             <RatingStars Review_Count={avgReviewCount} />
//             <span className="course-card-rating-label">
//               ({course?.ratingAndReviews?.length ?? 0} Ratings)
//             </span>
//           </div>
//           <p className="course-card-price">Rs. {course?.price}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Course_Card;

// components/core/Course_Card.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import { apiConnector } from "../../../services/apiconnector";
import { ratingsEndpoints } from "../../../services/apis";
import "./Course_Card.css";

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (!course?._id) return;

    const fetchAverageRating = async () => {
      try {
        const url = `${ratingsEndpoints.GET_AVERAGE_RATING_API}?courseId=${course._id}`;
        const response = await apiConnector("GET", url);

        if (response?.data?.success) {
          const rating = Number(response.data.averageRating) || 0;
          const count = Number(response.data.reviewCount) || 0;
          setAvgReviewCount(rating);
          setReviewCount(count);
        } else {
          setAvgReviewCount(0);
          setReviewCount(0);
        }
      } catch (error) {
        console.error("Could not fetch average rating for course:", course._id, error);
        setAvgReviewCount(0);
        setReviewCount(0);
      }
    };

    fetchAverageRating();
  }, [course?._id]);

  return (
    <Link to={`/courses/${course._id}`} className="course-card-link">
      <div className="course-card">
        <div className="thumbnail-container">
          <div className="thumbnail-img">
            <img src={course?.thumbnail} alt="Course Thumbnail" />
          </div>
        </div>
        <div className="course-card-info">
          <p className="course-card-title">{course?.courseName}</p>
          <p className="course-card-instructor">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="course-card-rating-row">
            <span className="course-card-rating-count">
              {typeof avgReviewCount === "number" ? avgReviewCount.toFixed(1) : "0.0"}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="course-card-rating-label">
              ({reviewCount} Ratings)
            </span>
          </div>
          <p className="course-card-price">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;

