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
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
