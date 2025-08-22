// import { useForm, Controller } from "react-hook-form";
// import { RxCross2 } from "react-icons/rx";

// import { Rating } from "react-simple-star-rating";
// import { useSelector } from "react-redux";

// import { createRating } from "../../../services/operations/courseDetailsAPI";
// import IconBtn from "../../common/IconBtn";

// import "./CourseReviewModal.css";

// export default function CourseReviewModal({ setReviewModal }) {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const { courseEntireData } = useSelector((state) => state.viewCourse);

//   const {
//     register,
//     handleSubmit,
//     control,
//     trigger,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     mode: "onChange",
//     defaultValues: {
//       courseExperience: "",
//       courseRating: 0,
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       await createRating(
//         {
//           courseId: courseEntireData._id,
//           rating: data.courseRating,
//           review: data.courseExperience,
//         },
//         token
//       );
//       setReviewModal(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   return (
//     <div className="review-modal-backdrop">
//       <div className="review-modal-wrapper">
//         {/* Header */}
//         <div className="review-modal-header">
//           <p className="review-modal-title">Add Review</p>
//           <button onClick={() => setReviewModal(false)}>
//             <RxCross2 className="close-icon" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="review-modal-body">
//           <div className="user-info">
//             <img
//               src={user?.image}
//               alt={`${user?.firstName} profile`}
//               className="user-avatar"
//             />
//             <div>
//               <p className="user-name">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="posting-publicly">Posting Publicly</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="review-form">
//             {/* Star Rating */}
//             <div className="form-group rating-group" style={{ zIndex: 10 }}>
//               <label className="form-label">
//                 Your Rating <sup className="required">*</sup>
//               </label>

//               <Controller
//                 name="courseRating"
//                 control={control}
//                 rules={{
//                   required: "Please provide a rating",
//                   min: { value: 1, message: "Rating must be at least 1" },
//                   max: { value: 5, message: "Rating cannot exceed 5" },
//                 }}
//                 render={({ field }) => (
//                   <div style={{ padding: "4px", zIndex: 10 }}>
//                     <Rating
//                       onClick={(rate) => {
//                         field.onChange(rate / 20);
//                         trigger("courseRating");
//                       }}
//                       ratingValue={(field.value || 0) * 20}
//                       size={24}
//                       transition
//                       fillColor="#ffd700"
//                       emptyColor="#ccc"
//                       style={{ pointerEvents: "auto", zIndex: 10 }}
//                     />
//                   </div>
//                 )}
//               />

//               {errors.courseRating && (
//                 <span className="error-text">
//                   {errors.courseRating.message}
//                 </span>
//               )}
//             </div>

//             {/* Text Review */}
//             <div className="form-group">
//               <label htmlFor="courseExperience" className="form-label">
//                 Add Your Experience <sup className="required">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Share your experience…"
//                 {...register("courseExperience", {
//                   required: "Please add your experience",
//                 })}
//                 className="review-textarea"
//               />
//               {errors.courseExperience && (
//                 <span className="error-text">
//                   {errors.courseExperience.message}
//                 </span>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="form-actions">
//               <button
//                 type="button"
//                 onClick={() => setReviewModal(false)}
//                 className="cancel-button"
//               >
//                 Cancel
//               </button>
//               <IconBtn text="Save" type="submit" disabled={isSubmitting} />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

import { createRating } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import RatingStars from "../../common/RatingStars"; // <-- your custom component

import "./CourseReviewModal.css";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      courseExperience: "",
      courseRating: 0,
    },
  });

  useEffect(() => {
    register("courseRating", {
      required: "Please provide a rating",
      min: { value: 1, message: "Rating must be at least 1" },
      max: { value: 5, message: "Rating cannot exceed 5" },
    });
  }, [register]);

  const rating = watch("courseRating");

  

  const onSubmit = async (data) => {
    try {
      console.log("Sending review for:", courseEntireData._id, data.courseRating, data.courseExperience);

      await createRating(
        {
          courseId: courseEntireData._id,
          rating: Number(data.courseRating),
          review: data.courseExperience,
        },
        token
      );
      setReviewModal(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-modal-backdrop">
      <div className="review-modal-wrapper">
        {/* Header */}
        <div className="review-modal-header">
          <p className="review-modal-title">Add Review</p>
          <button onClick={() => setReviewModal(false)} aria-label="Close">
            <RxCross2 className="close-icon" />
          </button>
        </div>

        {/* Body */}
        <div className="review-modal-body">
          <div className="user-info">
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="user-avatar"
            />
            <div>
              <p className="user-name">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="posting-publicly">Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="review-form">
            {/* Star Rating */}
            <div className="form-group rating-group">
              <label className="form-label">
                Your Rating <sup className="required">*</sup>
              </label>
              <RatingStars
                Review_Count={rating}
                Star_Size={30}
                editable={true}
                onChange={(newRating) =>
                  setValue("courseRating", newRating, { shouldValidate: true })
                }
              />
              {errors.courseRating && (
                <span className="error-text">{errors.courseRating.message}</span>
              )}
            </div>

            {/* Text Review */}
            <div className="form-group">
              <label htmlFor="courseExperience" className="form-label">
                Add Your Experience <sup className="required">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your experience…"
                {...register("courseExperience", {
                  required: "Please add your experience",
                })}
                className="review-textarea"
              />
              {errors.courseExperience && (
                <span className="error-text">
                  {errors.courseExperience.message}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <IconBtn text="Save" type="submit" disabled={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}