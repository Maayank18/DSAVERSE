// // (unchanged imports)
// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { RxCross2 } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   createSubSection,
//   updateSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import IconBtn from "../../../../common/IconBtn"
// import Upload from "../Upload"

// import "./SubSectionModal.css"

// export default function SubSectionModal({
//   modalData,
//   setModalData,
//   add = false,
//   view = false,
//   edit = false,
// }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm()

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)

//   useEffect(() => {
//     if (view || edit) {
//       setValue("lectureTitle", modalData.title)
//       setValue("lectureDesc", modalData.description)
//       // use videoUrl consistently (server sends videoUrl)
//       setValue("lectureVideo", modalData.videoUrl)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     return (
//       currentValues.lectureTitle !== modalData.title ||
//       currentValues.lectureDesc !== modalData.description ||
//       currentValues.lectureVideo !== modalData.videoUrl
//     )
//   }

//   const handleEditSubsection = async () => {
//     const currentValues = getValues()
//     const formData = new FormData()
//     formData.append("sectionId", modalData.sectionId)
//     formData.append("subSectionId", modalData._id)

//     if (currentValues.lectureTitle !== modalData.title) {
//       formData.append("title", currentValues.lectureTitle)
//     }
//     if (currentValues.lectureDesc !== modalData.description) {
//       formData.append("description", currentValues.lectureDesc)
//     }
//     if (currentValues.lectureVideo !== modalData.videoUrl) {
//       formData.append("video", currentValues.lectureVideo)
//     }

//     setLoading(true)
//     const result = await updateSubSection(formData, token) // result is the updated course (server returns course)
//     if (result) {
//       // server already returned the full updated course — simply replace course in redux
//       dispatch(setCourse(result))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   const onSubmit = async (data) => {
//     if (view) return
//     if (edit) {
//       if (!isFormUpdated()) {
//         toast.error("No changes made to the form")
//       } else {
//         handleEditSubsection()
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("sectionId", modalData.sectionId)
//     formData.append("title", data.lectureTitle)
//     formData.append("description", data.lectureDesc)
//     formData.append("video", data.lectureVideo)

//     setLoading(true)
//     const result = await createSubSection(formData, token)
//     if (result) {
//       // server returned the full updated course — use it directly
//       dispatch(setCourse(result))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-container">
//         {/* Header */}
//         <div className="modal-header">
//           <p className="modal-title">
//             {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
//           </p>
//           <button onClick={() => (!loading ? setModalData(null) : {})}>
//             <RxCross2 className="modal-close-icon" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
//           <Upload
//             name="lectureVideo"
//             label="Lecture Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             isVideo={true}
//             viewData={view ? modalData.videoUrl : null}
//             editData={edit ? modalData.videoUrl : null}
//           />

//           {/* Lecture Title */}
//           <div className="modal-field">
//             <label htmlFor="lectureTitle">
//               Lecture Title {!view && <sup className="required">*</sup>}
//             </label>
//             <input
//               disabled={view || loading}
//               id="lectureTitle"
//               placeholder="Enter Lecture Title"
//               {...register("lectureTitle", { required: true })}
//               className="modal-input"
//             />
//             {errors.lectureTitle && (
//               <span className="modal-error">Lecture title is required</span>
//             )}
//           </div>

//           {/* Lecture Description */}
//           <div className="modal-field">
//             <label htmlFor="lectureDesc">
//               Lecture Description {!view && <sup className="required">*</sup>}
//             </label>
//             <textarea
//               disabled={view || loading}
//               id="lectureDesc"
//               placeholder="Enter Lecture Description"
//               {...register("lectureDesc", { required: true })}
//               className="modal-textarea"
//             />
//             {errors.lectureDesc && (
//               <span className="modal-error">Lecture Description is required</span>
//             )}
//           </div>

//           {!view && (
//             <div className="modal-btn-wrapper">
//               <IconBtn
//                 disabled={loading}
//                 text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   )
// }


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
    reset,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  // populate/reset form whenever modalData/view/edit changes
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title ?? "", {
        shouldValidate: true,
        shouldDirty: true,
      })
      setValue("lectureDesc", modalData?.description ?? "", {
        shouldValidate: true,
        shouldDirty: true,
      })
      // IMPORTANT: give RHF the existing video URL (so the field is not considered empty)
      setValue("lectureVideo", modalData?.videoUrl ?? null, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      // adding new lecture — clear fields
      reset({
        lectureTitle: "",
        lectureDesc: "",
        lectureVideo: null,
      })
    }
    // run this effect when modalData/view/edit change
  }, [modalData, view, edit, setValue, reset])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.lectureTitle !== modalData?.title ||
      currentValues.lectureDesc !== modalData?.description ||
      // be tolerant: video can be File object or string URL
      String(currentValues.lectureVideo ?? "") !== String(modalData?.videoUrl ?? "")
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
    // If user chose a new File, lectureVideo will be a File; if unchanged it's a URL string
    if (String(currentValues.lectureVideo ?? "") !== String(modalData.videoUrl ?? "")) {
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      dispatch(setCourse(result))
      setModalData(null)
    } else {
      toast.error("Failed to update lecture")
    }
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        await handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      dispatch(setCourse(result))
      setModalData(null)
    } else {
      toast.error("Failed to create lecture")
    }
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
            viewData={view ? modalData?.videoUrl : null}
            editData={edit ? modalData?.videoUrl : null}
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
              {...register("lectureTitle", { required: !view })}
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
              {...register("lectureDesc", { required: !view })}
              className="modal-textarea"
            />
            {errors.lectureDesc && (
              <span className="modal-error">Lecture Description is required</span>
            )}
          </div>

          {!view && (
            <div className="modal-btn-wrapper">
              {/* Ensure IconBtn forwards the `type` prop. This makes it a real submit button. */}
              <IconBtn
                type="submit"
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
