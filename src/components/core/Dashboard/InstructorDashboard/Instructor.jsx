// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
// import { getInstructorData } from '../../../../services/operations/profileAPI'
// import InstructorChart from './InstructorChart'
// import { Link } from 'react-router-dom'
// import './Instructor.css'

// export default function Instructor() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const [loading, setLoading] = useState(false)
//   const [instructorData, setInstructorData] = useState([])
//   const [courses, setCourses] = useState([])

//   useEffect(() => {
//     ;(async () => {
//       setLoading(true)
//       const instructorApiData = await getInstructorData(token)
//       const result = await fetchInstructorCourses(token)

//       if (Array.isArray(instructorApiData)) setInstructorData(instructorApiData)
//       else setInstructorData([])

//       if (Array.isArray(result)) setCourses(result)
//       else setCourses([])

//       setLoading(false)
//     })()
//   }, [token])

//   const totalAmount = instructorData?.reduce(
//     (acc, curr) => acc + (curr.totalAmountGenerated ?? 0),
//     0
//   )

//   const totalStudents = instructorData?.reduce(
//     (acc, curr) => acc + (curr.totalStudentsEnrolled ?? 0),
//     0
//   )

//   return (
//     <div className="instructor-container">
//       <div className="instructor-header">
//         <h1 className="instructor-heading">Hi {user?.firstName} 👋</h1>
//         <p className="instructor-subheading">Let's start something new</p>
//       </div>

//       {loading ? (
//         <div className="spinner"></div>
//       ) : courses.length > 0 ? (
//         <>
//           {/* TOP ROW: visualize fills full width; stats are inside InstructorChart */}
//           <div className="top-row">
//             <div className="visualize-wrapper">
//               <InstructorChart courses={instructorData} />
//             </div>
//           </div>

//           {/* Courses — list of cards with larger thumbnails and readable details */}
//           <div className="course-preview-box">
//             <div className="course-preview-header">
//               <p className="course-preview-title">Your Courses</p>
//               <Link to="/dashboard/my-courses" className="course-preview-link">
//                 View All
//               </Link>
//             </div>

//             <div className="course-cards">
//               {courses.slice(0, 3).map((course) => (
//                 <div key={course._id} className="course-card">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.courseName}
//                     className="course-thumbnail"
//                   />
//                   <div className="course-details">
//                     <p className="course-name">{course.courseName}</p>

//                     <div className="course-meta">
//                       <p className="course-meta-item">
//                         {Array.isArray(course?.studentsEnrolled)
//                           ? course.studentsEnrolled.length
//                           : 0}{' '}
//                         students
//                       </p>
//                       <p className="course-meta-sep">|</p>
//                       <p className="course-meta-item">Rs. {course.price}</p>
//                     </div>

//                     <p className="course-desc">
//                       {course.courseDescription
//                         ? course.courseDescription.slice(0, 260) +
//                           (course.courseDescription.length > 260 ? '...' : '')
//                         : 'No description available'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="no-course-box">
//           <p className="no-course-text">You have not created any courses yet</p>
//           <Link to="/dashboard/add-course" className="create-course-link">
//             Create a course
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom'
import './Instructor.css'

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)

      if (Array.isArray(instructorApiData)) setInstructorData(instructorApiData)
      else setInstructorData([])

      if (Array.isArray(result)) setCourses(result)
      else setCourses([])

      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalAmountGenerated ?? 0),
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalStudentsEnrolled ?? 0),
    0
  )

  return (
    <div className="instructor-container">
      <div className="instructor-header">
        <h1 className="instructor-heading">Hi {user?.firstName} 👋</h1>
        <p className="instructor-subheading">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : courses.length > 0 ? (
        <>
          {/* TOP ROW: visualize fills full width; stats are inside InstructorChart */}
          <div className="top-row">
            <div className="visualize-wrapper">
              <InstructorChart
                courses={instructorData}
                instructorName={user?.firstName}
                subtitle=""
              />
            </div>
          </div>

          {/* Courses — list of cards (thumbnail left + details right) */}
          <div className="course-preview-box">
            <div className="course-preview-header">
              <p className="course-preview-title">Your Courses</p>
              <Link to="/dashboard/my-courses" className="course-preview-link">
                View All
              </Link>
            </div>

            <div className="course-cards">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="instructor-course-card">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="course-thumbnail"
                  />
                  <div className="course-details">
                    <p className="course-name">{course.courseName}</p>

                    <div className="course-meta">
                      <p className="course-meta-item">
                        {Array.isArray(course?.studentsEnrolled)
                          ? course.studentsEnrolled.length
                          : 0}{' '}
                        students
                      </p>
                      <p className="course-meta-sep">|</p>
                      <p className="course-meta-item">Rs. {course.price}</p>
                    </div>

                    <p className="course-desc">
                      {course.courseDescription
                        ? course.courseDescription.slice(0, 260) +
                          (course.courseDescription.length > 260 ? '...' : '')
                        : 'No description available'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="no-course-box">
          <p className="no-course-text">You have not created any courses yet</p>
          <Link to="/dashboard/add-course" className="create-course-link">
            Create a course
          </Link>
        </div>
      )}
    </div>
  )
}
