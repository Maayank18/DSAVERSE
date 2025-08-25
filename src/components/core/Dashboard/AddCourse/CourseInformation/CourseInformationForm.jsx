import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementsField"
import "./CourseInformationForm.css"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const categories = await fetchCourseCategories();

        if (Array.isArray(categories) && categories.length > 0) {
          setCourseCategories(categories);
        } else {
          toast.error("No categories found.");
        }
      } catch (error) {
        toast.error("Failed to fetch categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
}, []);


  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      // currentValues.courseCategory._id !== course.category._id
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        // if (currentValues.courseCategory._id !== course.category._id) {
        //   formData.append("category", data.courseCategory)
        // }
        if (currentValues.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory)
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="course-form">
      <div className="form-group">
        <label htmlFor="courseTitle">
          Course Title <sup className="required">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-input"
        />
        {errors.courseTitle && (
          <span className="error-text">Course title is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="courseShortDesc">
          Course Short Description <sup className="required">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-input textarea"
        />
        {errors.courseShortDesc && (
          <span className="error-text">Course Description is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="coursePrice">
          Course Price <sup className="required">*</sup>
        </label>
        <div className="price-input-wrapper">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\\d*)(\\.\\d+)?$/,
              },
            })}
            className="form-input price-input"
          />
          <HiOutlineCurrencyRupee className="currency-icon" />
        </div>
        {errors.coursePrice && (
          <span className="error-text">Course Price is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="courseCategory">
          Course Category <sup className="required">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-input"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="error-text">Course Category is required</span>
        )}
      </div>

      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="form-group">
        <label htmlFor="courseBenefits">
          Benefits of the course <sup className="required">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-input textarea"
        />
        {errors.courseBenefits && (
          <span className="error-text">Benefits of the course is required</span>
        )}
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className="button-row">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="btn-secondary"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          type="submit"
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}


// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { HiOutlineCurrencyRupee } from "react-icons/hi"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   addCourseDetails,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse, setStep } from "../../../../../slices/courseSlice"
// import IconBtn from "../../../../common/IconBtn"
// import Upload from "../Upload"
// import ChipInput from "./ChipInput"
// import RequirementsField from "./RequirementsField"
// import "./CourseInformationForm.css"

// export default function CourseInformationForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     reset,
//     formState: { errors, isValid },
//   } = useForm({
//     mode: "onChange",
//   })

//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { course, editCourse } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const [courseCategories, setCourseCategories] = useState([])

//   // fetch categories
//   useEffect(() => {
//     let mounted = true
//     const getCategories = async () => {
//       try {
//         setLoading(true)
//         const categories = await fetchCourseCategories()
//         if (!mounted) return
//         if (Array.isArray(categories) && categories.length > 0) {
//           setCourseCategories(categories)
//         } else {
//           toast.error("No categories found.")
//         }
//       } catch (error) {
//         toast.error("Failed to fetch categories")
//         console.error("Error fetching categories:", error)
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }
//     getCategories()
//     return () => {
//       mounted = false
//     }
//   }, [])

//   // reset on edit
//   useEffect(() => {
//     if (editCourse && course) {
//       reset({
//         courseTitle: course.courseName ?? "",
//         courseShortDesc: course.courseDescription ?? "",
//         coursePrice: course.price ?? "",
//         courseTags: course.tag ?? [],
//         courseBenefits: course.whatYouWillLearn ?? "",
//         courseCategory:
//           (course.category && (course.category._id ?? course.category)) ?? "",
//         courseRequirements: course.instructions ?? [],
//         courseImage: course.thumbnail ?? null,
//       })
//       setValue("courseImage", course.thumbnail ?? null, {
//         shouldValidate: true,
//         shouldDirty: true,
//       })
//     }
//   }, [editCourse, course, reset, setValue])

//   // ...isFormUpdated + onSubmit remain unchanged (your logic)

//   const onSubmit = async (data) => {
//     // unchanged logic here
//     // ...
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="course-form">
//       <div className="form-group">
//         <label htmlFor="courseTitle">
//           Course Title <sup className="required">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-input"
//         />
//         {errors.courseTitle && (
//           <span className="error-text">Course title is required</span>
//         )}
//       </div>

//       <div className="form-group">
//         <label htmlFor="courseShortDesc">
//           Course Short Description <sup className="required">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", { required: true })}
//           className="form-input textarea"
//         />
//         {errors.courseShortDesc && (
//           <span className="error-text">Course Description is required</span>
//         )}
//       </div>

//       <div className="form-group">
//         <label htmlFor="coursePrice">
//           Course Price <sup className="required">*</sup>
//         </label>
//         <div className="price-input-wrapper">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//               },
//             })}
//             className="form-input price-input"
//           />
//           <HiOutlineCurrencyRupee className="currency-icon" />
//         </div>
//         {errors.coursePrice && (
//           <span className="error-text">Course Price is required</span>
//         )}
//       </div>

//       <div className="form-group">
//         <label htmlFor="courseCategory">
//           Course Category <sup className="required">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-input"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="error-text">Course Category is required</span>
//         )}
//       </div>

//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       <div className="form-group">
//         <label htmlFor="courseBenefits">
//           Benefits of the course <sup className="required">*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter benefits of the course"
//           {...register("courseBenefits", { required: true })}
//           className="form-input textarea"
//         />
//         {errors.courseBenefits && (
//           <span className="error-text">Benefits of the course is required</span>
//         )}
//       </div>

//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />

//       {/* ✅ Upload moved to bottom, before buttons */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       <div className="button-row">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className="btn-secondary"
//           >
//             Continue Without Saving
//           </button>
//         )}
//         <IconBtn
//           type="submit"
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   )
// }


// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { HiOutlineCurrencyRupee } from "react-icons/hi"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   addCourseDetails,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse, setStep } from "../../../../../slices/courseSlice"
// import IconBtn from "../../../../common/IconBtn"
// import Upload from "../Upload"
// import ChipInput from "./ChipInput"
// import RequirementsField from "./RequirementsField"
// import "./CourseInformationForm.css"

// export default function CourseInformationForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     reset,
//     formState: { errors, isValid },
//   } = useForm({
//     mode: "onChange",
//   })

//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { course, editCourse } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const [courseCategories, setCourseCategories] = useState([])

//   // fetch categories
//   useEffect(() => {
//     let mounted = true
//     const getCategories = async () => {
//       try {
//         setLoading(true)
//         const categories = await fetchCourseCategories()
//         if (!mounted) return
//         if (Array.isArray(categories) && categories.length > 0) {
//           setCourseCategories(categories)
//         } else {
//           toast.error("No categories found.")
//         }
//       } catch (error) {
//         toast.error("Failed to fetch categories")
//         console.error("Error fetching categories:", error)
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }
//     getCategories()
//     return () => {
//       mounted = false
//     }
//   }, [])

//   // reset on edit
//   useEffect(() => {
//     if (editCourse && course) {
//       reset({
//         courseTitle: course.courseName ?? "",
//         courseShortDesc: course.courseDescription ?? "",
//         coursePrice: course.price ?? "",
//         courseTags: course.tag ?? [],
//         courseBenefits: course.whatYouWillLearn ?? "",
//         courseCategory:
//           (course.category && (course.category._id ?? course.category)) ?? "",
//         courseRequirements: course.instructions ?? [],
//         courseImage: course.thumbnail ?? null,
//       })
//       setValue("courseImage", course.thumbnail ?? null, {
//         shouldValidate: true,
//         shouldDirty: true,
//       })
//     }
//   }, [editCourse, course, reset, setValue])

//   // helper: check whether the form differs from original course (for edit)
//   const isFormUpdated = () => {
//     if (!editCourse || !course) return true // creating -> treat as updated
//     try {
//       const values = getValues()

//       const norm = (v) => {
//         if (v === undefined || v === null) return ""
//         if (Array.isArray(v)) return v.map((x) => (typeof x === "string" ? x.trim() : x)).filter(Boolean)
//         return String(v).trim()
//       }

//       const titleChanged = norm(values.courseTitle) !== norm(course.courseName)
//       const descChanged = norm(values.courseShortDesc) !== norm(course.courseDescription)
//       const priceChanged = Number(values.coursePrice || 0) !== Number(course.price || 0)

//       const currentTags = (values.courseTags || []).map((t) => String(t).trim())
//       const originalTags = (course.tag || []).map((t) => String(t).trim())
//       const tagsChanged =
//         currentTags.length !== originalTags.length ||
//         currentTags.some((t, i) => t !== originalTags[i])

//       const benefitsChanged = norm(values.courseBenefits) !== norm(course.whatYouWillLearn)
//       const categoryChanged =
//         String(values.courseCategory || "") !== String((course.category && (course.category._id ?? course.category)) || "")
//       const requirementsChanged = JSON.stringify(values.courseRequirements || []) !== JSON.stringify(course.instructions || [])

//       const imgVal = values.courseImage
//       const imageChanged =
//         (imgVal && typeof File !== "undefined" && imgVal instanceof File) ||
//         (imgVal && imgVal.length && imgVal[0] instanceof File) ||
//         (course.thumbnail || "") !== (typeof imgVal === "string" ? imgVal : "")

//       return (
//         titleChanged ||
//         descChanged ||
//         priceChanged ||
//         tagsChanged ||
//         benefitsChanged ||
//         categoryChanged ||
//         requirementsChanged ||
//         imageChanged
//       )
//     } catch (e) {
//       // if anything unexpected, assume updated
//       return true
//     }
//   }

//   const onSubmit = async (data) => {
//     setLoading(true)
//     try {
//       // Build JSON payload for non-file submissions
//       const payload = {
//         courseName: data.courseTitle?.trim(),
//         courseDescription: data.courseShortDesc?.trim(),
//         price: data.coursePrice === "" || data.coursePrice === undefined ? 0 : Number(data.coursePrice),
//         tag: Array.isArray(data.courseTags) ? data.courseTags : [],
//         whatYouWillLearn: data.courseBenefits?.trim(),
//         category: data.courseCategory,
//         instructions: Array.isArray(data.courseRequirements) ? data.courseRequirements : [],
//       }

//       // Determine image type (File / FileList / URL string)
//       const imageField = data.courseImage
//       let hasFile = false
//       let formData = null

//       if (imageField) {
//         // single File
//         if (typeof File !== "undefined" && imageField instanceof File) {
//           hasFile = true
//           formData = new FormData()
//           Object.entries(payload).forEach(([k, v]) => {
//             if (Array.isArray(v)) formData.append(k, JSON.stringify(v))
//             else formData.append(k, v ?? "")
//           })
//           formData.append("thumbnail", imageField)
//         }
//         // FileList or array-like
//         else if (imageField && imageField.length && imageField[0] instanceof File) {
//           hasFile = true
//           formData = new FormData()
//           Object.entries(payload).forEach(([k, v]) => {
//             if (Array.isArray(v)) formData.append(k, JSON.stringify(v))
//             else formData.append(k, v ?? "")
//           })
//           formData.append("thumbnail", imageField[0])
//         }
//         // object with file property (defensive)
//         else if (imageField && imageField.file instanceof File) {
//           hasFile = true
//           formData = new FormData()
//           Object.entries(payload).forEach(([k, v]) => {
//             if (Array.isArray(v)) formData.append(k, JSON.stringify(v))
//             else formData.append(k, v ?? "")
//           })
//           formData.append("thumbnail", imageField.file)
//         } else {
//           // probably a URL string - pass as thumbnail key in payload so backend can preserve
//           payload.thumbnail = typeof imageField === "string" ? imageField : payload.thumbnail
//         }
//       }

//       let res = null

//       if (editCourse && course && course._id) {
//         // Edit existing course
//         if (hasFile && formData) {
//           res = await editCourseDetails(token, course._id, formData)
//         } else {
//           res = await editCourseDetails(token, course._id, payload)
//         }

//         // Accept flexible success shapes
//         if (res && (res.success || res.status === "success" || res.data || res.course)) {
//           const updated = res.data ?? res.course ?? payload
//           dispatch(setCourse(updated))
//           toast.success("Course updated successfully.")
//         } else {
//           // fallback, assume updated if backend didn't error
//           dispatch(setCourse(res?.data ?? payload))
//           toast.success("Course updated.")
//         }
//         // When editing, we keep the user on same step (no automatic navigation)
//       } else {
//         // Add new course
//         if (hasFile && formData) {
//           res = await addCourseDetails(token, formData)
//         } else {
//           res = await addCourseDetails(token, payload)
//         }

//         if (res && (res.success || res.status === "success" || res.data || res.course)) {
//           const created = res.data ?? res.course ?? payload
//           dispatch(setCourse(created))
//           toast.success("Course details saved.")
//           // move to next step in creation flow
//           dispatch(setStep(2))
//         } else {
//           // fallback
//           dispatch(setCourse(res?.data ?? payload))
//           toast.success("Course details saved.")
//           dispatch(setStep(2))
//         }
//       }
//     } catch (error) {
//       console.error("Course save error:", error)
//       const message = (error && (error.message || error?.response?.data?.message)) ?? "Something went wrong. Please try again."
//       toast.error(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="course-form">
//       <div className="form-group">
//         <label htmlFor="courseTitle">
//           Course Title <sup className="required">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-input"
//         />
//         {errors.courseTitle && (
//           <span className="error-text">Course title is required</span>
//         )}
//       </div>

//       <div className="form-group">
//         <label htmlFor="courseShortDesc">
//           Course Short Description <sup className="required">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", { required: true })}
//           className="form-input textarea"
//         />
//         {errors.courseShortDesc && (
//           <span className="error-text">Course Description is required</span>
//         )}
//       </div>

//       <div className="form-group">
//         <label htmlFor="coursePrice">
//           Course Price <sup className="required">*</sup>
//         </label>
//         <div className="price-input-wrapper">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//               },
//             })}
//             className="form-input price-input"
//           />
//           <HiOutlineCurrencyRupee className="currency-icon" />
//         </div>
//         {errors.coursePrice && (
//           <span className="error-text">Course Price is required</span>
//         )}
//       </div>

//       <div className="form-group">
//         <label htmlFor="courseCategory">
//           Course Category <sup className="required">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-input"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="error-text">Course Category is required</span>
//         )}
//       </div>

//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       <div className="form-group">
//         <label htmlFor="courseBenefits">
//           Benefits of the course <sup className="required">*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter benefits of the course"
//           {...register("courseBenefits", { required: true })}
//           className="form-input textarea"
//         />
//         {errors.courseBenefits && (
//           <span className="error-text">Benefits of the course is required</span>
//         )}
//       </div>

//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />

//       {/* ✅ Upload moved to bottom, before buttons */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       <div className="button-row">
//         {editCourse && (
//           <button
//             type="button"
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className="btn-secondary"
//           >
//             Continue Without Saving
//           </button>
//         )}
//         <IconBtn
//           type="submit"
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   )
// }
