// // CourseSlider.jsx
// import React, { useRef, useState, useEffect } from "react";
// import Course_Card from "./Course_card";
// import "./CourseSlider.css";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// const CourseSlider = ({ Courses }) => {
//   const containerRef = useRef(null);
//   const sliderRef = useRef(null);
//   const [canScrollPrev, setCanScrollPrev] = useState(false);
//   const [canScrollNext, setCanScrollNext] = useState(false);

//   // update button states
//   const updateScrollButtons = () => {
//     const el = containerRef.current;
//     if (!el) return;
//     // small epsilon to avoid floating point issues
//     const epsilon = 2;
//     setCanScrollPrev(el.scrollLeft > epsilon);
//     setCanScrollNext(el.scrollLeft + el.clientWidth + epsilon < el.scrollWidth);
//   };

//   useEffect(() => {
//     updateScrollButtons();
//     const el = containerRef.current;
//     if (!el) return;

//     const onScroll = () => updateScrollButtons();
//     const onResize = () => updateScrollButtons();

//     el.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onResize);

//     // when Courses change, recompute after a short tick (images/layout)
//     const t = setTimeout(updateScrollButtons, 120);

//     return () => {
//       clearTimeout(t);
//       el.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [Courses]);

//   // scroll by one card (card width + gap)
//   const getCardScrollAmount = () => {
//     const slider = sliderRef.current;
//     if (!slider) return 0;
//     const first = slider.querySelector(".course-slide-content");
//     if (!first) return slider.clientWidth * 0.9;
//     const cardWidth = first.offsetWidth;
//     // computed gap may be like "24px" or "1.5rem" — parseFloat handles px/rem differently but rem rarely used
//     const gapStr = getComputedStyle(slider).gap || "24px";
//     const gap = parseFloat(gapStr) || 24;
//     return Math.round(cardWidth + gap);
//   };

//   const scrollNext = () => {
//     const el = containerRef.current;
//     if (!el) return;
//     const amount = getCardScrollAmount();
//     el.scrollBy({ left: amount, behavior: "smooth" });
//   };

//   const scrollPrev = () => {
//     const el = containerRef.current;
//     if (!el) return;
//     const amount = getCardScrollAmount();
//     el.scrollBy({ left: -amount, behavior: "smooth" });
//   };

//   if (!Courses?.length) {
//     return <p className="no-course-text">No Course Found</p>;
//   }

//   return (
//     <div className="course-slider-wrapper">
//       <button
//         className={`slider-nav slider-nav-left ${!canScrollPrev ? "disabled" : ""}`}
//         onClick={scrollPrev}
//         aria-label="Scroll previous"
//         disabled={!canScrollPrev}
//       >
//         <MdChevronLeft size={22} />
//       </button>

//       <div className="course-slider-container" ref={containerRef}>
//         <div className="course-slider" ref={sliderRef}>
//           {Courses.map((course, i) => (
//             <div className="course-slide-content" key={i}>
//               <Course_Card course={course} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         className={`slider-nav slider-nav-right ${!canScrollNext ? "disabled" : ""}`}
//         onClick={scrollNext}
//         aria-label="Scroll next"
//         disabled={!canScrollNext}
//       >
//         <MdChevronRight size={22} />
//       </button>
//     </div>
//   );
// };

// export default CourseSlider;


import React, { useRef, useState, useEffect } from "react";
import Course_Card from "./Course_card";
import "./CourseSlider.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CourseSlider = ({ Courses }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // update button states
  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    // small epsilon to avoid floating point issues
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

    // when Courses change, recompute after a short tick (images/layout)
    const t = setTimeout(updateScrollButtons, 120);

    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [Courses]);

  // scroll by one card (card width + gap)
  const getCardScrollAmount = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;
    const first = slider.querySelector(".course-slide-content");
    if (!first) return slider.clientWidth * 0.9;
    const cardWidth = first.offsetWidth;
    // computed gap may be like "24px" or "1.5rem" — parseFloat handles px/rem differently but rem rarely used
    const gapStr = getComputedStyle(slider).gap || "24px";
    const gap = parseFloat(gapStr) || 24;
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

  if (!Courses?.length) {
    return <p className="no-course-text">No Course Found</p>;
  }

  return (
    <div className="course-slider-wrapper">
      {/* Outer positioned container (does NOT catch pointer events) */}
      <div
        className={`slider-nav slider-nav-left ${!canScrollPrev ? "disabled" : ""}`}
        aria-hidden={false}
      >
        {/* Actual clickable control sits inside and receives pointer events */}
        <button
          className="slider-control"
          onClick={scrollPrev}
          aria-label="Scroll previous"
          disabled={!canScrollPrev}
        >
          <MdChevronLeft size={22} />
        </button>
      </div>

      <div className="course-slider-container" ref={containerRef}>
        <div className="course-slider" ref={sliderRef}>
          {Courses.map((course, i) => (
            <div className="course-slide-content" key={i}>
              <Course_Card course={course} />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`slider-nav slider-nav-right ${!canScrollNext ? "disabled" : ""}`}
        aria-hidden={false}
      >
        <button
          className="slider-control"
          onClick={scrollNext}
          aria-label="Scroll next"
          disabled={!canScrollNext}
        >
          <MdChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default CourseSlider;

