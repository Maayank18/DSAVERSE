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
  }, [])

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
            <p className="col-course">Course</p>
            <p className="col-progress">Progress</p>
          </div>

          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`enrolled-row ${
                i === arr.length - 1 ? "last-row" : ""
              }`}
              key={course._id}
            >
              {/* Left side: thumbnail + info */}
              <div
                className="course-left"
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
                <div className="thumbnail-wrapper">
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="course-thumbnail"
                  />
                </div>
                <div className="course-info">
                  <p className="course-title">{course.courseName}</p>
                  <p className="course-desc">
                    {course.courseDescription?.length > 60
                      ? `${course.courseDescription.slice(0, 60)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Right side: progress */}
              <div className="course-progress">
                <p>{course.progressPercentage || 0}% completed</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
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
