// import { useState } from "react"
// import { AiFillCaretDown } from "react-icons/ai"
// import { FaPlus } from "react-icons/fa"
// import { MdEdit } from "react-icons/md"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { RxDropdownMenu } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   deleteSection,
//   deleteSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import ConfirmationModal from "../../../../common/ConfirmationModal"
// import SubSectionModal from "./SubSectionModal"
// import "./NestedView.css"

// export default function NestedView({ handleChangeEditSectionName }) {
//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()

//   const [addSubSection, setAddSubsection] = useState(null)
//   const [viewSubSection, setViewSubSection] = useState(null)
//   const [editSubSection, setEditSubSection] = useState(null)
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   // ✅ Fixed function name typo
//   const handleDeleteSection = async (sectionId) => {
//     const result = await deleteSection({
//       sectionId,
//       courseId: course._id,
//       token,
//     })
//     if (result) {
//       dispatch(setCourse(result))
//     }
//     setConfirmationModal(null)
//   }

//   const handleDeleteSubSection = async (subSectionId, sectionId) => {
//     const result = await deleteSubSection({ subSectionId, sectionId, token })
//     if (result) {
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === sectionId ? result : section
//       )
//       dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
//     }
//     setConfirmationModal(null)
//   }

//   return (
//     <>
//       <div className="nested-container" id="nestedViewContainer">
//         {course?.courseContent?.map((section) => (
//           <details key={section._id} open>
//             <summary className="section-summary">
//               <div className="section-title">
//                 <RxDropdownMenu className="icon text-xl" />
//                 <p>{section.sectionName}</p>
//               </div>
//               <div className="section-actions">
//                 <button
//                   onClick={() =>
//                     handleChangeEditSectionName(section._id, section.sectionName)
//                   }
//                 >
//                   <MdEdit className="icon" />
//                 </button>
//                 <button
//                   onClick={() =>
//                     setConfirmationModal({
//                       text1: "Delete this Section?",
//                       text2: "All the lectures in this section will be deleted",
//                       btn1Text: "Delete",
//                       btn2Text: "Cancel",
//                       btn1Handler: () => handleDeleteSection(section._id),
//                       btn2Handler: () => setConfirmationModal(null),
//                     })
//                   }
//                 >
//                   <RiDeleteBin6Line className="icon" />
//                 </button>
//                 <span className="separator">|</span>
//                 <AiFillCaretDown className="icon" />
//               </div>
//             </summary>

//             <div className="subsection-wrapper">
//               {(section.subSection || []).map((data) => (
//                 <div
//                   key={data?._id}
//                   onClick={() => setViewSubSection({ ...data, sectionId: section._id })}
//                   className="subsection-row"
//                 >
//                   <div className="subsection-title">
//                     <RxDropdownMenu className="icon text-xl" />
//                     <p>{data.title}</p>
//                   </div>
//                   <div
//                     onClick={(e) => e.stopPropagation()}
//                     className="subsection-actions"
//                   >
//                     <button
//                       onClick={() =>
//                         setEditSubSection({ ...data, sectionId: section._id })
//                       }
//                     >
//                       <MdEdit className="icon" />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setConfirmationModal({
//                           text1: "Delete this Sub-Section?",
//                           text2: "This lecture will be deleted",
//                           btn1Text: "Delete",
//                           btn2Text: "Cancel",
//                           btn1Handler: () =>
//                             handleDeleteSubSection(data._id, section._id),
//                           btn2Handler: () => setConfirmationModal(null),
//                         })
//                       }
//                     >
//                       <RiDeleteBin6Line className="icon" />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 onClick={() => setAddSubsection({ sectionId: section._id })}
//                 className="add-lecture-btn"
//               >
//                 <FaPlus className="icon" />
//                 <p>Add Lecture</p>
//               </button>
//             </div>
//           </details>
//         ))}
//       </div>

//       {addSubSection && (
//         <SubSectionModal
//           modalData={addSubSection}
//           setModalData={setAddSubsection}
//           add
//         />
//       )}
//       {viewSubSection && (
//         <SubSectionModal
//           modalData={viewSubSection}
//           setModalData={setViewSubSection}
//           view
//         />
//       )}
//       {editSubSection && (
//         <SubSectionModal
//           modalData={editSubSection}
//           setModalData={setEditSubSection}
//           edit
//         />
//       )}
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }

import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import  {setCourse}  from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"
import "./NestedView.css"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  // const handleDeleteSection = async (sectionId) => {
  //   const result = await deleteSection({
  //     sectionId,
  //     courseId: course._id,
  //     token,
  //   })
  //   if (result) {
  //     dispatch(setCourse(result))
  //   }
  //   setConfirmationModal(null)
  // }

  const handleDeleteSection = async (sectionId) => {
  const result = await deleteSection(
    {
      sectionId,
      courseId: course._id,
    },
    token // ✅ Pass token separately
  )
    if (result && typeof result === "object" && Object.keys(result).length > 0) {
      dispatch(setCourse(result))
    } else {
      console.warn("Invalid course data returned:", result)
    }

  setConfirmationModal(null)
}


  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
    }
    setConfirmationModal(null)
  }

  console.log("NestedView rendered with courseContent:", course.courseContent);


  return (
    <>
      <div className="nested-container" id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="section-summary">
              <div className="section-title">
                <RxDropdownMenu className="icon text-xl" />
                <p>{section.sectionName}</p>
              </div>
              <div className="section-actions">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(section._id, section.sectionName)
                  }
                >
                  <MdEdit className="icon" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="icon" />
                </button>
                <span className="separator">|</span>
                <AiFillCaretDown className="icon" />
              </div>
            </summary>

            <div className="subsection-wrapper">
              {(section.subSection || []).map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection({ ...data, sectionId: section._id })}
                  className="subsection-row"
                >
                  <div className="subsection-title">
                    <RxDropdownMenu className="icon text-xl" />
                    <p>{data.title}</p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="subsection-actions"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="icon" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="icon" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setAddSubsection({ sectionId: section._id })}
                className="add-lecture-btn"
              >
                <FaPlus className="icon" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
