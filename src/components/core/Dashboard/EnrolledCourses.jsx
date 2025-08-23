// import { useEffect, useState } from "react"
// import ProgressBar from "@ramonak/react-progress-bar"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
// import "./EnrolledCourses.css"

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth)
//   // ✅ completedLectures is now an object: { [courseId]: ["subId1","subId2", ...] }
//   const { completedLectures } = useSelector((state) => state.viewCourse)
//   const navigate = useNavigate()

//   const [enrolledCourses, setEnrolledCourses] = useState(null)

//   const getEnrolledCoursesHandler = async () => {
//     try {
//       const res = await getUserEnrolledCourses(token)
//       setEnrolledCourses(res)
//     } catch (error) {
//       console.log("Could not fetch enrolled courses.", error)
//     }
//   }

//   useEffect(() => {
//     getEnrolledCoursesHandler()
//   }, [token])

//   // ✅ fixed to use per-course completedLectures
//   const getCourseProgress = (course) => {
//     if (!course?.courseContent?.length) return 0

//     let totalLectures = 0
//     let completedCount = 0

//     // normalize array of completed lectures for this course
//     const normalizedCompleted = (completedLectures[course._id] || []).map((id) =>
//       String(id)
//     )

//     course.courseContent.forEach((section) => {
//       totalLectures += section.subSection?.length || 0
//       section.subSection?.forEach((sub) => {
//         if (normalizedCompleted.includes(String(sub._id))) {
//           completedCount++
//         }
//       })
//     })

//     return totalLectures > 0
//       ? Math.round((completedCount / totalLectures) * 100)
//       : 0
//   }

//   return (
//     <div className="enrolled-wrapper">
//       <h1 className="enrolled-heading">Enrolled Courses</h1>

//       {!enrolledCourses ? (
//         <div className="enrolled-loader">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolledCourses.length ? (
//         <p className="enrolled-empty">
//           You have not enrolled in any course yet.
//         </p>
//       ) : (
//         <div className="enrolled-table">
//           <div className="enrolled-header">
//             <p className="col-name">Course Name</p>
//             <p className="col-duration">Duration</p>
//             <p className="col-progress">Progress</p>
//           </div>

//           {enrolledCourses.map((course, i, arr) => (
//             <div
//               className={`enrolled-row ${
//                 i === arr.length - 1 ? "last-row" : ""
//               }`}
//               key={course._id}
//             >
//               <div
//                 className="col-name enrolled-course"
//                 onClick={() => {
//                   const firstSection = course.courseContent?.[0]
//                   const firstSubSection = firstSection?.subSection?.[0]

//                   if (!firstSection || !firstSubSection) {
//                     alert("This course has no sections or subsections yet.")
//                     return
//                   }

//                   navigate(
//                     `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
//                   )
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="course-thumbnail"
//                 />
//                 <div className="course-info">
//                   <p className="course-title">{course.courseName}</p>
//                   <p className="course-desc">
//                     {course.courseDescription?.length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription}
//                   </p>
//                 </div>
//               </div>
//               <div className="col-duration">
//                 {course?.totalDuration || "N/A"}
//               </div>
//               <div className="col-progress progress-box">
//                 <p>Progress: {getCourseProgress(course)}%</p>
//                 <ProgressBar
//                   completed={getCourseProgress(course)}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import "./EnrolledCourses.css"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCoursesHandler = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses.", error)
    }
  }

  useEffect(() => {
    getEnrolledCoursesHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // No need to depend on token here if it's stable

  return (
    <div className="enrolled-wrapper">
      <h1 className="enrolled-heading">Enrolled Courses</h1>

      {!enrolledCourses ? (
        <div className="enrolled-loader">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="enrolled-empty">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="enrolled-table">
          <div className="enrolled-header">
            <p className="col-name">Course Name</p>
            {/* <p className="col-duration">Duration</p> */}
            <p className="col-progress">Progress</p>
          </div>

          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`enrolled-row ${
                i === arr.length - 1 ? "last-row" : ""
              }`}
              key={course._id}
            >
              <div
                className="col-name enrolled-course"
                onClick={() => {
                  const firstSection = course.courseContent?.[0]
                  const firstSubSection = firstSection?.subSection?.[0]

                  if (!firstSection || !firstSubSection) {
                    alert("This course has no sections or subsections yet.")
                    return
                  }

                  navigate(
                    `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="course-thumbnail"
                />
                <div className="course-info">
                  <p className="course-title">{course.courseName}</p>
                  <p className="course-desc">
                    {course.courseDescription?.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              {/* <div className="col-duration">
                {course?.totalDuration || "N/A"}
              </div> */}
              <div className="col-progress progress-box">
                {/* ✅ CHANGE HERE: Use progressPercentage from the API */}
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0} // ✅ AND HERE
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}