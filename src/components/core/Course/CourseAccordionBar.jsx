import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import "./CourseAccordionBar.css"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="accordion-container">
      <div className="accordion-header" onClick={() => handleActive(course._id)}>
        <div className="accordion-title">
          <i className={isActive.includes(course._id) ? "rotate" : ""}>
            <AiOutlineDown />
          </i>
          <p>{course?.sectionName}</p>
        </div>
        <div className="accordion-lectures">
          <span>{`${course.subSection.length || 0} lecture(s)`}</span>
        </div>
      </div>

      <div
        ref={contentEl}
        className="accordion-content"
        style={{ height: sectionHeight }}
      >
        <div className="accordion-subsections">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
