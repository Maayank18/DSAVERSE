


// import { useState } from "react";
// import { AiFillCaretDown } from "react-icons/ai";
// import { FaPlus } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { RxDropdownMenu } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   deleteSection,
//   deleteSubSection,
// } from "../../../../../services/operations/courseDetailsAPI";
// import { setCourse } from "../../../../../slices/courseSlice";
// import ConfirmationModal from "../../../../common/ConfirmationModal";
// import SubSectionModal from "./SubSectionModal";

// import "./NestedView.css";

// export default function NestedView({ handleChangeEditSectionName }) {
//   const { course } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [addSubSection, setAddSubsection] = useState(null);
//   const [viewSubSection, setViewSubSection] = useState(null);
//   const [editSubSection, setEditSubSection] = useState(null);
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   const handleDeleteSection = async (sectionId) => {
//     const result = await deleteSection({
//       sectionId,
//       courseId: course._id,
//       token,
//     });
//     if (result) dispatch(setCourse(result));
//     setConfirmationModal(null);
//   };

//   const handleDeleteSubSection = async (subSectionId, sectionId) => {
//     const result = await deleteSubSection({ subSectionId, sectionId, token });
//     if (result) {
//       const updatedContent = course.courseContent.map((section) =>
//         section._id === sectionId ? result : section
//       );
//       dispatch(setCourse({ ...course, courseContent: updatedContent }));
//     }
//     setConfirmationModal(null);
//   };

//   return (
//     <>
//       <div className="nested-view-container">
//         {course?.courseContent?.map((section) => (
//           <details key={section._id} open>
//             <summary className="section-summary">
//               <div className="section-left">
//                 <RxDropdownMenu className="icon" />
//                 <p>{section.sectionName}</p>
//               </div>
//               <div className="section-actions">
//                 <button
//                   onClick={() =>
//                     handleChangeEditSectionName(
//                       section._id,
//                       section.sectionName
//                     )
//                   }
//                 >
//                   <MdEdit />
//                 </button>
//                 <button
//                   onClick={() =>
//                     setConfirmationModal({
//                       text1: "Delete this Section?",
//                       text2: "All the lectures will be deleted.",
//                       btn1Text: "Delete",
//                       btn2Text: "Cancel",
//                       btn1Handler: () => handleDeleteSection(section._id),
//                       btn2Handler: () => setConfirmationModal(null),
//                     })
//                   }
//                 >
//                   <RiDeleteBin6Line />
//                 </button>
//                 <span>|</span>
//                 <AiFillCaretDown />
//               </div>
//             </summary>

//             <div className="subsection-container">
//               {section.subSection.map((data) => (
//                 <div
//                   key={data._id}
//                   className="subsection-row"
//                   onClick={() => setViewSubSection(data)}
//                 >
//                   <div className="subsection-left">
//                     <RxDropdownMenu className="icon" />
//                     <p>{data.title}</p>
//                   </div>
//                   <div
//                     className="subsection-actions"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <button
//                       onClick={() =>
//                         setEditSubSection({ ...data, sectionId: section._id })
//                       }
//                     >
//                       <MdEdit />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setConfirmationModal({
//                           text1: "Delete this Sub-Section?",
//                           text2: "This lecture will be deleted.",
//                           btn1Text: "Delete",
//                           btn2Text: "Cancel",
//                           btn1Handler: () =>
//                             handleDeleteSubSection(data._id, section._id),
//                           btn2Handler: () => setConfirmationModal(null),
//                         })
//                       }
//                     >
//                       <RiDeleteBin6Line />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 className="add-lecture-btn"
//                 onClick={() => setAddSubsection(section._id)}
//               >
//                 <FaPlus />
//                 <p>Add Lecture</p>
//               </button>
//             </div>
//           </details>
//         ))}
//       </div>

//       {addSubSection && (
//         <SubSectionModal
//           modalData={{ sectionId: addSubSection }}
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
//   );
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
import { setCourse } from "../../../../../slices/courseSlice"
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

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

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
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
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
                      btn1Handler: () => handleDeleleSection(section._id),
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
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  // ✅ ADDED: Pass sectionId to viewSubSection
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
                // ✅ ADDED: Wrap sectionId in object for addSubSection
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

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}
