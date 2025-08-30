// import { useDispatch, useSelector } from "react-redux"
// import { toggleLectureCompletion } from "../../../slices/viewCourseSlice"
// import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
// import "./CourseAccordionBar.css"

// export default function CourseAccordionBar({ course }) {
//   const dispatch = useDispatch()
//   const { completedLectures } = useSelector((state) => state.viewCourse)

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
//             <CourseSubSectionAccordion
//               key={subSec?._id ?? i}
//               courseId={course._id}
//               subSec={subSec}
//               isCompleted={completedLectures[course._id]?.includes(String(subSec._id))}
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

// components/core/Course/CourseAccordionBar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLectureCompletion } from "../../../slices/viewCourseSlice";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";
import "./CourseAccordionBar.css";

export default function CourseAccordionBar({ course }) {
  const dispatch = useDispatch();
  const { completedLectures } = useSelector((state) => state.viewCourse);

  // defensive defaults
  const subSections = Array.isArray(course?.subSection) ? course.subSection : [];
  const lectureCount = subSections.length;

  // completed list for this course (may be undefined if nothing tracked yet)
  const completedForThisCourse = Array.isArray(completedLectures?.[course?._id])
    ? completedLectures[course._id]
    : [];

  return (
    <div className="accordion-container">
      <div className="accordion-header">
        <div className="accordion-title">
          <p>{course?.sectionName ?? "Untitled section"}</p>
        </div>
        <div className="accordion-lectures">
          <span>{`${lectureCount} lecture(s)`}</span>
        </div>
      </div>

      {/* subsections rendered safely */}
      <div className="accordion-content always-open">
        <div className="accordion-subsections">
          {subSections.map((subSec, i) => {
            // safe ids / fallback to index for key
            const subId = subSec?._id ?? String(i);
            const courseIdSafe = course?._id ?? null;

            // completed check must operate on an array
            const isCompleted = Array.isArray(completedForThisCourse)
              ? completedForThisCourse.includes(String(subId))
              : false;

            return (
              <CourseSubSectionAccordion
                key={subId}
                courseId={courseIdSafe}
                subSec={subSec}
                isCompleted={isCompleted}
                toggleCompleted={(courseId, subSecId) =>
                  dispatch(toggleLectureCompletion({ courseId, subSecId }))
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
