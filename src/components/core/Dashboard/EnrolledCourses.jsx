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

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div className="enrolled-wrapper">
      <h1 className="enrolled-heading">Enrolled Courses</h1>

      {!enrolledCourses ? (
        <div className="enrolled-loader">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="enrolled-empty">You have not enrolled in any course yet.</p>
      ) : (
        <div className="enrolled-table">
          <div className="enrolled-header">
            <p className="col-name">Course Name</p>
            <p className="col-duration">Duration</p>
            <p className="col-progress">Progress</p>
          </div>

          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`enrolled-row ${i === arr.length - 1 ? "last-row" : ""}`}
              key={i}
            >
              <div
                className="col-name enrolled-course"
                onClick={() =>
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="course-thumbnail"
                />
                <div className="course-info">
                  <p className="course-title">{course.courseName}</p>
                  <p className="course-desc">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="col-duration">{course?.totalDuration}</div>
              <div className="col-progress progress-box">
                <p>Progress: {course.progressPercentage || 0}%</p>
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
