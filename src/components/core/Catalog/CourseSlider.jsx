// import React from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { FreeMode, Pagination } from "swiper/modules"

// import Course_Card from "./Course_card"
// import "./CourseSlider.css"

// const CourseSlider = ({ Courses }) => {
//   return (
//     <div className="course-slider-wrapper">
//       {Courses?.length ? (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             768: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//           className="course-slider"
//         >
//           {Courses.map((course, i) => (
//             <SwiperSlide key={i}>
//               <Course_Card course={course} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="no-course-text">No Course Found</p>
//       )}
//     </div>
//   )
// }

// export default CourseSlider


// import React from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { FreeMode, Pagination } from "swiper/modules"

// import Course_Card from "./Course_card"
// import "./CourseSlider.css"

// const CourseSlider = ({ Courses }) => {
//   return (
//     <div className="course-slider-wrapper">
//       {Courses?.length ? (
//         <Swiper
//           className="course-slider"
//           slidesPerView={3}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             768: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {Courses.map((course, i) => (
//             <SwiperSlide key={i}>
//               {/* Added a wrapper div with a custom class */}
//               <div className="course-slide-content">
//                 <Course_Card course={course} />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="no-course-text">No Course Found</p>
//       )}
//     </div>
//   )
// }

// export default CourseSlider

import React from "react"

import Course_Card from "./Course_card"
import "./CourseSlider.css"

const CourseSlider = ({ Courses }) => {
  return (
    <div className="course-slider-wrapper">
      {Courses?.length ? (
        <div className="course-slider">
          {Courses.map((course, i) => (
            <div className="course-slide-content" key={i}>
              <Course_Card course={course} />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-course-text">No Course Found</p>
      )}
    </div>
  )
}

export default CourseSlider
