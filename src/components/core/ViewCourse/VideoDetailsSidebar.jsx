// import { useEffect, useState } from "react"
// import { BsChevronDown } from "react-icons/bs"
// import { IoIosArrowBack } from "react-icons/io"
// import { useSelector } from "react-redux"
// import { useLocation, useNavigate, useParams } from "react-router-dom"

// import IconBtn from "../../common/IconBtn"
// import "./VideoDetailsSidebar.css"

// export default function VideoDetailsSidebar({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("")
//   const [videoBarActive, setVideoBarActive] = useState("")

//   const navigate = useNavigate()
//   const location = useLocation()
//   const { sectionId, subSectionId } = useParams()

//   const {
//     courseSectionData = [],
//     courseEntireData = {},
//     totalNoOfLectures = 0,
//     completedLectures = [],
//   } = useSelector((state) => state.viewCourse)

//   useEffect(() => {
//     if (!courseSectionData.length) return

//     const currentSectionIndex = courseSectionData.findIndex(
//       (section) => section._id === sectionId
//     )
//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (sub) => sub._id === subSectionId
//     )
//     const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

//     setActiveStatus(courseSectionData[currentSectionIndex]?._id)
//     setVideoBarActive(activeSubSectionId)
//   }, [courseSectionData, sectionId, subSectionId, location.pathname])

//   return (
//     <div className="sidebar-wrapper">
//       <div className="sidebar-header">
//         <div className="sidebar-header-top">
//           <div
//             onClick={() => navigate("/dashboard/enrolled-courses")}
//             className="back-button"
//             title="Back"
//           >
//             <IoIosArrowBack size={24} />
//           </div>
//           <IconBtn
//             text="Add Review"
//             customClasses="ml-auto"
//             onClick={() => setReviewModal(true)}
//           />
//         </div>

//         <div className="sidebar-course-info">
//           <p>{courseEntireData?.courseName}</p>
//           <p className="progress">
//             {completedLectures?.length} / {totalNoOfLectures}
//           </p>
//         </div>
//       </div>

//       <div className="sidebar-sections">
//         {courseSectionData.map((section) => (
//           <div
//             className="section-container"
//             onClick={() => setActiveStatus((prev) =>
//               prev === section._id ? "" : section._id
//             )}
//             key={section._id}
//           >
//             <div className="section-header">
//               <div className="section-title">{section?.sectionName}</div>
//               <div className="section-icon">
//                 <span
//                   className={`arrow-icon ${
//                     activeStatus === section._id ? "rotate-0" : "rotate-180"
//                   }`}
//                 >
//                   <BsChevronDown />
//                 </span>
//               </div>
//             </div>

//             {activeStatus === section._id && (
//               <div className="subsection-container">
//                 {section.subSection.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className={`subsection-item ${
//                       videoBarActive === sub._id ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       navigate(
//                         `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${sub._id}`
//                       )
//                       setVideoBarActive(sub._id)
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={completedLectures.includes(sub._id)}
//                       onChange={() => {}}
//                     />
//                     {sub.title}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


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
    courseSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex]?.subSection?.findIndex(
        (sub) => sub._id === subSectionId
      )
    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id

    setActiveStatus(courseSectionData[currentSectionIndex]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, sectionId, subSectionId, location.pathname])

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <div
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="back-button"
            title="Back"
          >
            <IoIosArrowBack size={24} />
          </div>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onClick={() => setReviewModal(true)}
          />
        </div>

        <div className="sidebar-course-info">
          <p className="course-name">{courseEntireData?.courseName}</p>
          <p className="progress">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div className="sidebar-sections">
        {courseSectionData.map((section) => (
          <div
            className="section-container"
            onClick={() =>
              setActiveStatus((prev) =>
                prev === section._id ? "" : section._id
              )
            }
            key={section._id}
          >
            <div className="section-header">
              <div className="section-title">{section?.sectionName}</div>
              <span
                className={`arrow-icon ${
                  activeStatus === section._id ? "open" : "closed"
                }`}
              >
                <BsChevronDown />
              </span>
            </div>

            {activeStatus === section._id && (
              <div className="subsection-container">
                {section.subSection.map((sub) => (
                  <div
                    key={sub._id}
                    className={`subsection-item ${
                      videoBarActive === sub._id ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${sub._id}`
                      )
                      setVideoBarActive(sub._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(sub._id)}
                      onChange={() => {}}
                    />
                    <span className="subsection-title">{sub.title}</span>
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
