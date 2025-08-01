import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

import "./SubSectionModal.css"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.video)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    )
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
  if (view) return
  if (edit) {
    if (!isFormUpdated()) {
      toast.error("No changes made to the form")
    } else {
      handleEditSubsection()
    }
    return
  }

  // ✅ Debug logs before creating FormData
  console.log("📝 Form Data Input:")
  console.log("sectionId:", modalData.sectionId)
  console.log("lectureTitle:", data.lectureTitle)
  console.log("lectureDesc:", data.lectureDesc)
  console.log("lectureVideo:", data.lectureVideo)

  const formData = new FormData()
  formData.append("sectionId", modalData.sectionId)
  formData.append("title", data.lectureTitle)
  formData.append("description", data.lectureDesc)
  formData.append("video", data.lectureVideo)  // debug change 

  // ✅ Print actual FormData being sent
  console.log("📦 FormData entries:")
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  setLoading(true)
  const result = await createSubSection(formData, token)
  if (result) {
    const updatedCourseContent = course.courseContent.map((section) =>
      section._id === modalData.sectionId ? result : section
    )
    dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
  }
  setModalData(null)
  setLoading(false)
}



  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <p className="modal-title">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="modal-close-icon" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            isVideo={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="modal-field">
            <label htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="required">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="modal-input"
            />
            {errors.lectureTitle && (
              <span className="modal-error">Lecture title is required</span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="modal-field">
            <label htmlFor="lectureDesc">
              Lecture Description {!view && <sup className="required">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="modal-textarea"
            />
            {errors.lectureDesc && (
              <span className="modal-error">Lecture Description is required</span>
            )}
          </div>

          {!view && (
            <div className="modal-btn-wrapper">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
