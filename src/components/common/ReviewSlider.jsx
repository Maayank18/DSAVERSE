// import React, { useEffect, useState } from "react";
// import ReactStars from "./RatingStars";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import { FaStar, FaRegStar } from "react-icons/fa";
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
//             breakpoints={{
//               0: {
//                 slidesPerView: 1,
//                 spaceBetween: 12,
//               },
//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 16,
//               },
//               920: {
//                 slidesPerView: 3,
//                 spaceBetween: 20,
//               },
//               1200: {
//                 slidesPerView: 4,
//                 spaceBetween: 25,
//               },
//             }}
//             modules={[FreeMode, Pagination, Autoplay]}
//             className="swiper-custom"
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i} className="swiper-slide-custom">
//                 <div className="review-card">
//                   <div className="review-user-info">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review?.user?.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt={`${review?.user?.firstName}`}
//                       className="review-avatar"
//                     />
//                     <div className="review-user-text">
//                       <h3 className="review-user-name">
//                         {`${review?.user?.firstName} ${review?.user?.lastName}`}
//                       </h3>
//                       <h4 className="review-course-name">{review?.course?.courseName}</h4>
//                     </div>
//                   </div>
//                   <p className="review-text" title={review?.review}>
//                     {review?.review?.split(" ").length > truncateWords
//                       ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
//                       : review?.review}
//                   </p>
//                   <div className="review-rating" aria-hidden={false}>
//                     <h3 className="review-rating-value">{Number(review?.rating || 0).toFixed(1)}</h3>

//                     {/* Minimal fix: ensure numeric value and use outline + filled icons */}
//                     <ReactStars
//                       count={5}
//                       value={Number(review?.rating || 0)}
//                       size={18}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaRegStar />}
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

import React, { useEffect, useRef, useState } from "react";
import ReactStars from "./RatingStars";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

import "./ReviewSlider.css";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // fetch reviews (unchanged logic)
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

  // update button states
  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    const epsilon = 2;
    setCanScrollPrev(el.scrollLeft > epsilon);
    setCanScrollNext(el.scrollLeft + el.clientWidth + epsilon < el.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => updateScrollButtons();
    const onResize = () => updateScrollButtons();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // when reviews change, recompute after layout/images settle
    const t = setTimeout(updateScrollButtons, 120);

    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reviews]);

  // compute amount to scroll: card width + gap
  const getCardScrollAmount = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;
    const first = slider.querySelector(".review-slide-content");
    if (!first) return Math.round(slider.clientWidth * 0.9);
    const cardWidth = first.offsetWidth;
    const gapStr = getComputedStyle(slider).gap || "20px";
    const gap = parseFloat(gapStr) || 20;
    return Math.round(cardWidth + gap);
  };

  const scrollNext = () => {
    const el = containerRef.current;
    if (!el) return;
    const amount = getCardScrollAmount();
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const el = containerRef.current;
    if (!el) return;
    const amount = getCardScrollAmount();
    el.scrollBy({ left: -amount, behavior: "smooth" });
  };

  return (
    <div className="review-slider-container">
      <button
        className={`slider-nav slider-nav-left ${!canScrollPrev ? "disabled" : ""}`}
        onClick={scrollPrev}
        aria-label="Scroll previous"
        disabled={!canScrollPrev}
      >
        <MdChevronLeft size={22} />
      </button>

      <div className="review-slider-wrapper">
        {reviews.length > 0 ? (
          <div className="review-slider-container-inner" ref={containerRef}>
            <div className="review-slider" ref={sliderRef}>
              {reviews.map((review, i) => (
                <div className="review-slide-content" key={i}>
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
                      {review?.review?.split(" ").length > truncateWords
                        ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                        : review?.review}
                    </p>

                    <div className="review-rating" aria-hidden={false}>
                      <h3 className="review-rating-value">{Number(review?.rating || 0).toFixed(1)}</h3>

                      <ReactStars
                        count={5}
                        value={Number(review?.rating || 0)}
                        size={18}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaRegStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-reviews-text">No reviews available yet.</p>
        )}
      </div>

      <button
        className={`slider-nav slider-nav-right ${!canScrollNext ? "disabled" : ""}`}
        onClick={scrollNext}
        aria-label="Scroll next"
        disabled={!canScrollNext}
      >
        <MdChevronRight size={22} />
      </button>
    </div>
  );
}

export default ReviewSlider;


