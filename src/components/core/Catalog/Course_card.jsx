import React, { useEffect, useState } from "react"
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"
import { Link } from "react-router-dom"
import "./Course_Card.css"

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="course-card">
        <div className="course-card-img-container">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`course-card-img ${Height}`}
          />
        </div>
        <div className="course-card-info">
          <p className="course-card-title">{course?.courseName}</p>
          <p className="course-card-instructor">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="course-card-rating-row">
            <span className="course-card-rating-count">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="course-card-rating-label">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
          <p className="course-card-price">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
