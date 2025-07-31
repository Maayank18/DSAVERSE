import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

import "./CourseDetails.css"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  const [isActive, setIsActive] = useState([])
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="course-details-wrapper">
        <div className="course-details-container">
          <div className="course-details-main">
            <div className="course-thumbnail-mobile">
              <div className="thumbnail-shadow"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="thumbnail-image"
              />
            </div>
            <div className="course-meta">
              <p className="course-title">{courseName}</p>
              <p className="course-description">{courseDescription}</p>
              <div className="course-reviews">
                <span className="highlight">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <p>Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
              <div className="course-meta-info">
                <p><BiInfoCircle /> Created at {formatDate(createdAt)}</p>
                <p><HiOutlineGlobeAlt /> English</p>
              </div>
            </div>
            <div className="course-actions-mobile">
              <p className="price">Rs. {price}</p>
              <button className="btn-yellow" onClick={handleBuyCourse}>Buy Now</button>
              <button className="btn-black">Add to Cart</button>
            </div>
          </div>

          <div className="course-card-desktop">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="course-content-wrapper">
        <div className="course-what-you-learn">
          <p className="section-title">What you'll learn</p>
          <div className="section-body">
            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
          </div>
        </div>

        <div className="course-content">
          <div className="course-content-header">
            <p className="section-title">Course Content</p>
            <div className="course-content-summary">
              <span>{courseContent.length} section(s)</span>
              <span>{totalNoOfLectures} lecture(s)</span>
              <span>{response.data?.totalDuration} total length</span>
            </div>
            <button className="btn-collapse" onClick={() => setIsActive([])}>
              Collapse all sections
            </button>
          </div>

          <div className="accordion-section">
            {courseContent?.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>

          <div className="course-author">
            <p className="section-title">Author</p>
            <div className="author-info">
              <img
                src={
                  instructor.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt="Author"
                className="author-avatar"
              />
              <p>{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="author-bio">{instructor?.additionalDetails?.about}</p>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails
