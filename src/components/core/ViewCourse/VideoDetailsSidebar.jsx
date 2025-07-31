import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import "./VideoDetailsSidebar.css"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <div
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`)
            }}
            className="back-button"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div className="sidebar-course-info">
          <p>{courseEntireData?.courseName}</p>
          <p className="progress">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div className="sidebar-sections">
        {courseSectionData.map((course, index) => (
          <div
            className="section-container"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            <div className="section-header">
              <div className="section-title">{course?.sectionName}</div>
              <div className="section-icon">
                <span
                  className={`${
                    activeStatus === course?.sectionName
                      ? "rotate-0"
                      : "rotate-180"
                  } arrow-icon`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {activeStatus === course?._id && (
              <div className="subsection-container">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`subsection-item ${
                      videoBarActive === topic._id ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
