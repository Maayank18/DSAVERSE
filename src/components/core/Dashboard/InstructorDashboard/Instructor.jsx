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
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div className="instructor-container">
      <div className="instructor-header">
        <h1 className="instructor-heading">Hi {user?.firstName} 👋</h1>
        <p className="instructor-subheading">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="chart-statistics-container">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="visualize-box">
                <p className="visualize-title">Visualize</p>
                <p className="visualize-message">Not Enough Data To Visualize</p>
              </div>
            )}

            {/* Total Statistics */}
            <div className="statistics-box">
              <p className="stat-heading">Statistics</p>
              <div className="stat-group">
                <div>
                  <p className="stat-label">Total Courses</p>
                  <p className="stat-value">{courses.length}</p>
                </div>
                <div>
                  <p className="stat-label">Total Students</p>
                  <p className="stat-value">{totalStudents}</p>
                </div>
                <div>
                  <p className="stat-label">Total Income</p>
                  <p className="stat-value">Rs. {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Preview Section */}
          <div className="course-preview-box">
            <div className="course-preview-header">
              <p className="course-preview-title">Your Courses</p>
              <Link to="/dashboard/my-courses" className="course-preview-link">
                View All
              </Link>
            </div>
            <div className="course-cards">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="course-card">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="course-thumbnail"
                  />
                  <div className="course-details">
                    <p className="course-name">{course.courseName}</p>
                    <div className="course-meta">
                      <p className="course-meta-item">
                        {course.studentsEnroled.length} students
                      </p>
                      <p className="course-meta-item">|</p>
                      <p className="course-meta-item">Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
