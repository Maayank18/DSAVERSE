import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"
import "./CourseSubSectionAccordion.css"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="subsection-container">
      <div className="subsection-content">
        <div className="subsection-left">
          <span className="subsection-icon">
            <HiOutlineVideoCamera />
          </span>
          <p className="subsection-title">{subSec?.title}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion
