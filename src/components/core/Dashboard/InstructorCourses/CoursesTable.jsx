import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "./CoursesTable.css"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    // await deleteCourse({ courseId }, token)
    await deleteCourse( courseId , token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <Table className="course-table">
        <Thead>
          <Tr className="course-table-header-row">
            <Th className="course-table-header-cell flex-1">Courses</Th>
            <Th className="course-table-header-cell">Duration</Th>
            <Th className="course-table-header-cell">Price</Th>
            <Th className="course-table-header-cell">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="course-table-empty">No courses found</Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr key={course._id} className="course-table-data-row">
                <Td className="course-table-course-info">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="course-table-thumbnail"
                  />
                  <div className="course-table-course-meta">
                    <p className="course-table-course-name">{course.courseName}</p>
                    <p className="course-table-description">
                      {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="course-table-date">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="course-table-status draft">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="course-table-status published">
                        <span className="status-dot">
                          <FaCheck size={8} />
                        </span>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="course-table-cell">2hr 30min</Td>
                <Td className="course-table-cell">₹{course.price}</Td>
                <Td className="course-table-cell">
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    title="Edit"
                    className="action-btn edit-btn"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="action-btn delete-btn"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
