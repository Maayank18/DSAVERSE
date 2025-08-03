import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  // const onSubmit = async (data) => {
  //   setLoading(true)
  //   let result

  //   if (editSectionName) {
  //     result = await updateSection(
  //       {
  //         sectionName: data.sectionName,
  //         sectionId: editSectionName,
  //         courseId: course._id,
  //       },
  //       token
  //     )
  //     console.log("API result from createSection:", result)

  //   } else {
  //     result = await createSection(
  //       {
  //         sectionName: data.sectionName,
  //         courseId: course._id,
  //       },
  //       token
  //     )
  //   }
  //   if (result) {
  //     dispatch(setCourse(result))
  //     setEditSectionName(null)
  //     setValue("sectionName", "")
  //   }
  //   setLoading(false)
  // }

//   const onSubmit = async (data) => {
//   setLoading(true)
//   let result

//   if (editSectionName) {
//     result = await updateSection(
//       {
//         sectionName: data.sectionName,
//         sectionId: editSectionName,
//         courseId: course._id,
//       },
//       token
//     )
//   } else {
//     result = await createSection(
//       {
//         sectionName: data.sectionName,
//         courseId: course._id,
//       },
//       token
//     )
//   }

//   if (result) {
//     // ✅ Safely merge result (updated section) into the course
//     const updatedCourseContent = course.courseContent.map((section) =>
//       section._id === result._id ? result : section
//     )

//     // If this is a new section, it won't exist yet, so add it
//     const isNewSection = !course.courseContent.find(
//       (section) => section._id === result._id
//     )

//     const finalCourseContent = isNewSection
//       ? [...course.courseContent, result]
//       : updatedCourseContent

//     dispatch(setCourse({
//       ...course,
//       courseContent: finalCourseContent,
//     }))

//     setEditSectionName(null)
//     setValue("sectionName", "")
//   }

//   setLoading(false)
// }

const onSubmit = async (data) => {
  setLoading(true);
  let result;

  if (editSectionName) {
    result = await updateSection(
      {
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      },
      token
    );
  } else {
    result = await createSection(
      {
        sectionName: data.sectionName,
        courseId: course._id,
      },
      token
    );
  }

  // ✅ Now we assume the backend is returning the full updated course object
  if (result) {
    console.log("✅ Updated Course From Backend:", result);
    dispatch(setCourse(result));
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  setLoading(false);
};



  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  console.log("Course Content:", course.courseContent)

  const goToNext = () => {
    console.log("✅ Next button clicked")

    // ✅ Check if any section exists
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }

    // ✅ Check if each section has at least one sub-section
    const hasEmptySubSection = course.courseContent.some(
      (section) =>
        !section.subSection || // section.subSection is undefined
        !Array.isArray(section.subSection) || // not an array
        section.subSection.length === 0 // empty array
    )

    if (hasEmptySubSection) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    // ✅ All good - proceed
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="course-builder-container">
      <p className="course-builder-title">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="course-builder-form">
        <div className="form-field">
          <label htmlFor="sectionName">
            Section Name <sup className="required">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style"
          />
          {errors.sectionName && (
            <span className="form-error">Section name is required</span>
          )}
        </div>
        <div className="button-row">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="icon-yellow" />
          </IconBtn>
          {editSectionName && (
            <button type="button" onClick={cancelEdit} className="cancel-edit">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ✅ Render sections only if present */}
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="navigation-buttons">
        <button onClick={goBack} className="back-button">
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}
