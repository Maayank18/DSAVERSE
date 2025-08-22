// import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
// import "./CourseAccordionBar.css"

// export default function CourseAccordionBar({ course, onToggleSubSection }) {
//   return (
//     <div className="accordion-container">
//       <div className="accordion-header">
//         <div className="accordion-title">
//           <p>{course?.sectionName}</p>
//         </div>
//         <div className="accordion-lectures">
//           <span>{`${course.subSection.length || 0} lecture(s)`}</span>
//         </div>
//       </div>

//       {/* 🔥 subsections are always visible, no toggle */}
//       <div className="accordion-content always-open">
//         <div className="accordion-subsections">
//           {course?.subSection?.map((subSec, i) => (
//             // <CourseSubSectionAccordion
//             //   subSec={subSec}
//             //   key={subSec?._id ?? i}
//             //   isCompleted={subSec?.isCompleted}
//             //   toggleCompleted={onToggleSubSection}
//             // />
//             <CourseSubSectionAccordion
//               courseId={course._id}
//               subSec={subSec}
//               isCompleted={completedLectures[course._id]?.includes(subSec._id)}
//               toggleCompleted={(courseId, subSecId) =>
//                 dispatch(toggleLectureCompletion({ courseId, subSecId }))
//               }
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useDispatch, useSelector } from "react-redux"
import { toggleLectureCompletion } from "../../../slices/viewCourseSlice"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import "./CourseAccordionBar.css"

export default function CourseAccordionBar({ course }) {
  const dispatch = useDispatch()
  const { completedLectures } = useSelector((state) => state.viewCourse)

  return (
    <div className="accordion-container">
      <div className="accordion-header">
        <div className="accordion-title">
          <p>{course?.sectionName}</p>
        </div>
        <div className="accordion-lectures">
          <span>{`${course.subSection.length || 0} lecture(s)`}</span>
        </div>
      </div>

      {/* 🔥 subsections are always visible, no toggle */}
      <div className="accordion-content always-open">
        <div className="accordion-subsections">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion
              key={subSec?._id ?? i}
              courseId={course._id}
              subSec={subSec}
              isCompleted={completedLectures[course._id]?.includes(String(subSec._id))}
              toggleCompleted={(courseId, subSecId) =>
                dispatch(toggleLectureCompletion({ courseId, subSecId }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

