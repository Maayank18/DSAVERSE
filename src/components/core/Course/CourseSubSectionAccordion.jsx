// import React, { useState } from "react"
// import { HiOutlineVideoCamera } from "react-icons/hi"
// import "./CourseSubSectionAccordion.css"

// function CourseSubSectionAccordion({ subSec, isCompleted = false, toggleCompleted }) {
//   const [checked, setChecked] = useState(isCompleted)

//   const handleCheckboxChange = (e) => {
//     e.stopPropagation()
//     const newVal = !checked
//     setChecked(newVal)
//     if (toggleCompleted) toggleCompleted(subSec?._id, newVal)
//   }

//   return (
//     <div className="subsection-container">
//       <div className="subsection-content">
//         <div className="subsection-left">
//           <span className="subsection-icon">
//             <HiOutlineVideoCamera />
//           </span>
//           <label className="subsection-title-wrapper">
//             <input
//               type="checkbox"
//               className="subsection-checkbox"
//               checked={checked}
//               onChange={handleCheckboxChange}
//             />
//             <span className="subsection-title">{subSec?.title}</span>
//           </label>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseSubSectionAccordion

import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"
import "./CourseSubSectionAccordion.css"

function CourseSubSectionAccordion({ courseId, subSec, isCompleted = false, toggleCompleted }) {
  const handleCheckboxChange = (e) => {
    e.stopPropagation()
    if (toggleCompleted) {
      toggleCompleted(courseId, subSec?._id) // ✅ send course + lecture
    }
  }

  return (
    <div className="subsection-container">
      <div className="subsection-content">
        <div className="subsection-left">
          <span className="subsection-icon">
            <HiOutlineVideoCamera />
          </span>
          <label className="subsection-title-wrapper">
            <input
              type="checkbox"
              className="subsection-checkbox"
              checked={isCompleted} // ✅ controlled by parent (Redux)
              onChange={handleCheckboxChange}
            />
            <span className="subsection-title">{subSec?.title}</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion
