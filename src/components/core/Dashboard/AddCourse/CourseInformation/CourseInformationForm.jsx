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
// import { COURSE_STATUS } from "../../../../../utils/constants"
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
//     formState: { errors },
//   } = useForm()

//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { course, editCourse } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const [courseCategories, setCourseCategories] = useState([])

//     useEffect(() => {
//     const getCategories = async () => {
//       try {
//         setLoading(true);
//         const categories = await fetchCourseCategories();

//         if (Array.isArray(categories) && categories.length > 0) {
//           setCourseCategories(categories);
//         } else {
//           toast.error("No categories found.");
//         }
//       } catch (error) {
//         toast.error("Failed to fetch categories");
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (editCourse) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseTags", course.tag);
//       setValue("courseBenefits", course.whatYouWillLearn);
//       setValue("courseCategory", course.category);
//       setValue("courseRequirements", course.instructions);
//       setValue("courseImage", course.thumbnail);
//     }

//     getCategories();
// }, []);


//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     if (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       // currentValues.courseCategory._id !== course.category._id
//       currentValues.courseCategory !== course.category._id ||
//       currentValues.courseRequirements.toString() !== course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     ) {
//       return true
//     }
//     return false
//   }

//   const onSubmit = async (data) => {
//     if (editCourse) {
//       if (isFormUpdated()) {
//         const currentValues = getValues()
//         const formData = new FormData()
//         formData.append("courseId", course._id)
//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle)
//         }
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc)
//         }
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice)
//         }
//         if (currentValues.courseTags.toString() !== course.tag.toString()) {
//           formData.append("tag", JSON.stringify(data.courseTags))
//         }
//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits)
//         }
//         // if (currentValues.courseCategory._id !== course.category._id) {
//         //   formData.append("category", data.courseCategory)
//         // }
//         if (currentValues.courseCategory !== course.category._id) {
//           formData.append("category", data.courseCategory)
//         }

//         if (
//           currentValues.courseRequirements.toString() !==
//           course.instructions.toString()
//         ) {
//           formData.append("instructions", JSON.stringify(data.courseRequirements))
//         }
//         if (currentValues.courseImage !== course.thumbnail) {
//           formData.append("thumbnailImage", data.courseImage)
//         }
//         setLoading(true)
//         const result = await editCourseDetails(formData, token)
//         setLoading(false)
//         if (result) {
//           dispatch(setStep(2))
//           dispatch(setCourse(result))
//         }
//       } else {
//         toast.error("No changes made to the form")
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("courseName", data.courseTitle)
//     formData.append("courseDescription", data.courseShortDesc)
//     formData.append("price", data.coursePrice)
//     formData.append("tag", JSON.stringify(data.courseTags))
//     formData.append("whatYouWillLearn", data.courseBenefits)
//     formData.append("category", data.courseCategory)
//     formData.append("status", COURSE_STATUS.DRAFT)
//     formData.append("instructions", JSON.stringify(data.courseRequirements))
//     formData.append("thumbnailImage", data.courseImage)
//     setLoading(true)
//     const result = await addCourseDetails(formData, token)
//     if (result) {
//       dispatch(setStep(2))
//       dispatch(setCourse(result))
//     }
//     setLoading(false)
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
//                 value: /^(0|[1-9]\\d*)(\\.\\d+)?$/,
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

//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
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

//       <div className="button-row">
//         {editCourse && (
//           <button
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className="btn-secondary"
//           >
//             Continue Without Saving
//           </button>
//         )}
//         <IconBtn
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   )
// }


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
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // ensures isValid updates as fields change
  })

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  // fetch categories once
  useEffect(() => {
    let mounted = true
    const getCategories = async () => {
      try {
        setLoading(true)
        const categories = await fetchCourseCategories()
        if (!mounted) return
        if (Array.isArray(categories) && categories.length > 0) {
          setCourseCategories(categories)
        } else {
          toast.error("No categories found.")
        }
      } catch (error) {
        toast.error("Failed to fetch categories")
        console.error("Error fetching categories:", error)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    getCategories()
    return () => {
      mounted = false
    }
  }, [])

  // Reset / populate the form when course arrives (edit mode)
  useEffect(() => {
    if (editCourse && course) {
      // Map course to form fields; keep shapes safe
      reset({
        courseTitle: course.courseName ?? "",
        courseShortDesc: course.courseDescription ?? "",
        coursePrice: course.price ?? "",
        courseTags: course.tag ?? [],
        courseBenefits: course.whatYouWillLearn ?? "",
        // if course.category may be an id or object, normalize to id
        courseCategory:
          (course.category && (course.category._id ?? course.category)) ?? "",
        courseRequirements: course.instructions ?? [],
        // file inputs are handled by Upload via editData prop, but set a placeholder
        courseImage: course.thumbnail ?? null,
      })
      // Also ensure RHF knows about thumbnail (Upload will also call setValue)
      setValue("courseImage", course.thumbnail ?? null, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }, [editCourse, course, reset, setValue])

  // safer comparison function
  const isFormUpdated = () => {
    const currentValues = getValues()
    if (!course) return true // if course missing, treat as updated

    const origCategoryId = course.category?._id ?? course.category ?? ""
    const currentTags = Array.isArray(currentValues.courseTags)
      ? currentValues.courseTags
      : currentValues.courseTags
      ? [currentValues.courseTags]
      : []

    const origTags = Array.isArray(course.tag) ? course.tag : course.tag ? [course.tag] : []

    const normalize = (v) =>
      v === undefined || v === null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v)

    if (normalize(currentValues.courseTitle) !== normalize(course.courseName)) return true
    if (normalize(currentValues.courseShortDesc) !== normalize(course.courseDescription)) return true
    if (normalize(currentValues.coursePrice) !== normalize(course.price)) return true
    if (JSON.stringify(currentTags) !== JSON.stringify(origTags)) return true
    if (normalize(currentValues.courseBenefits) !== normalize(course.whatYouWillLearn)) return true
    if (normalize(currentValues.courseCategory) !== normalize(origCategoryId)) return true
    if (
      JSON.stringify(currentValues.courseRequirements ?? []) !==
      JSON.stringify(course.instructions ?? [])
    )
      return true
    if (normalize(currentValues.courseImage) !== normalize(course.thumbnail)) return true

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
        if (String(currentValues.coursePrice) !== String(course.price)) {
          formData.append("price", data.coursePrice)
        }
        if (JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag)) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        // category compare normalized to id
        const origCategoryId = course.category?._id ?? course.category ?? ""
        if (currentValues.courseCategory !== origCategoryId) {
          formData.append("category", data.courseCategory)
        }
        if (
          JSON.stringify(currentValues.courseRequirements ?? []) !==
          JSON.stringify(course.instructions ?? [])
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

    // create new course
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", "DRAFT")
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
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
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
            type="button"               // <- important: do not submit the form
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="btn-secondary"
          >
            Continue Without Saving
          </button>
        )}
        {/* ensure IconBtn accepts and forwards `type` prop; set submit explicitly */}
        <IconBtn
          type="submit"               // <- important: makes it a submit button
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
