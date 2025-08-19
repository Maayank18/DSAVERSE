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

      setInstructorData(Array.isArray(instructorApiData) ? instructorApiData : [])
      setCourses(Array.isArray(result) ? result : [])
      setLoading(false)
    })()
  }, [token])

  return (
    <div className="instructor-container">
      {/* Header */}
      <div className="instructor-header">
        <h1 className="instructor-heading">Hi {user?.firstName} 👋</h1>
        <p className="instructor-subheading">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="instructor-content-layout">
          {/* Visualization block */}
          <InstructorChart courses={instructorData} />

          {/* Courses Section */}
          <div className="course-preview-box">
            <div className="course-preview-header">
              <p className="course-preview-title">Your Courses</p>
              <Link to="/dashboard/my-courses" className="course-preview-link">
                View All
              </Link>
            </div>

            <div className="course-cards">
              {courses.length === 0 ? (
                <div className="no-course-inline">
                  <p className="no-course-small">You have not created any courses yet</p>
                </div>
              ) : (
                courses.slice(0, 3).map((course) => (
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
                            : 0}{" "}
                          students
                        </p>
                        <p className="course-meta-sep">|</p>
                        <p className="course-meta-item">Rs. {course.price}</p>
                      </div>
                      <p className="course-desc">
                        {course.courseDescription
                          ? course.courseDescription.slice(0, 260) +
                            (course.courseDescription.length > 260 ? "..." : "")
                          : "No description available"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

}