// import React, { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import { FaStar } from "react-icons/fa";
// import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// import { apiConnector } from "../../services/apiconnector";
// import { ratingsEndpoints } from "../../services/apis";

// import "./ReviewSlider.css";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const truncateWords = 15;

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
//         if (data?.success) {
//           setReviews(data?.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error.response?.data || error.message);
//       }
//     })();
//   }, []);

//   return (
//     <div className="review-slider-container">
//       <div className="review-slider-wrapper">
//         {reviews.length > 0 ? (
//           <Swiper
//             slidesPerView={4}
//             spaceBetween={25}
//             loop={reviews.length > 4}
//             freeMode={true}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             modules={[FreeMode, Pagination, Autoplay]}
//             className="swiper-custom"
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i}>
//                 <div className="review-card">
//                   <div className="review-user-info">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review?.user?.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt=""
//                       className="review-avatar"
//                     />
//                     <div className="review-user-text">
//                       <h1 className="review-user-name">
//                         {`${review?.user?.firstName} ${review?.user?.lastName}`}
//                       </h1>
//                       <h2 className="review-course-name">{review?.course?.courseName}</h2>
//                     </div>
//                   </div>
//                   <p className="review-text">
//                     {review?.review.split(" ").length > truncateWords
//                       ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
//                       : review?.review}
//                   </p>
//                   <div className="review-rating">
//                     <h3 className="review-rating-value">{review.rating.toFixed(1)}</h3>
//                     <ReactStars
//                       count={5}
//                       value={review.rating}
//                       size={20}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar />}
//                       fullIcon={<FaStar />}
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <p className="no-reviews-text">No reviews available yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;


import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

import "./ReviewSlider.css";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
        if (data?.success) {
          setReviews(data?.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error.response?.data || error.message);
      }
    })();
  }, []);

  return (
    <div className="review-slider-container">
      <div className="review-slider-wrapper">
        {reviews.length > 0 ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={25}
            loop={reviews.length > 4}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // mobile
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              // small tablets
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              // large tablets / small desktop
              920: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              // desktop
              1200: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="swiper-custom"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i} className="swiper-slide-custom">
                <div className="review-card">
                  <div className="review-user-info">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt={`${review?.user?.firstName}`}
                      className="review-avatar"
                    />
                    <div className="review-user-text">
                      <h3 className="review-user-name">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h3>
                      <h4 className="review-course-name">{review?.course?.courseName}</h4>
                    </div>
                  </div>
                  <p className="review-text" title={review?.review}>
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                      : review?.review}
                  </p>
                  <div className="review-rating">
                    <h3 className="review-rating-value">{Number(review.rating).toFixed(1)}</h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-reviews-text">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewSlider;


