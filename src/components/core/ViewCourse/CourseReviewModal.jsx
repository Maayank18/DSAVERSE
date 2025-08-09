// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { RxCross2 } from "react-icons/rx";
// import ReactStars from "react-rating-stars-component";
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
//     setValue,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     setValue("courseExperience", "");
//     setValue("courseRating", 0);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const ratingChanged = (newRating) => {
//     setValue("courseRating", newRating);
//   };

//   const onSubmit = async (data) => {
//     await createRating(
//       {
//         courseId: courseEntireData._id,
//         rating: data.courseRating,
//         review: data.courseExperience,
//       },
//       token
//     );
//     setReviewModal(false);
//   };

//   return (
//     <div className="review-modal-backdrop">
//       <div className="review-modal-wrapper">
//         {/* Modal Header */}
//         <div className="review-modal-header">
//           <p className="review-modal-title">Add Review</p>
//           <button onClick={() => setReviewModal(false)}>
//             <RxCross2 className="close-icon" />
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="review-modal-body">
//           <div className="user-info">
//             <img
//               src={user?.image}
//               alt={user?.firstName + " profile"}
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
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               activeColor="#ffd700"
//             />
//             <div className="form-group">
//               <label htmlFor="courseExperience" className="form-label">
//                 Add Your Experience <sup className="required">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Add Your Experience"
//                 {...register("courseExperience", { required: true })}
//                 className="review-textarea"
//               />
//               {errors.courseExperience && (
//                 <span className="error-text">
//                   Please Add Your Experience
//                 </span>
//               )}
//             </div>

//             <div className="form-actions">
//               <button
//                 type="button"
//                 onClick={() => setReviewModal(false)}
//                 className="cancel-button"
//               >
//                 Cancel
//               </button>
//               <IconBtn text="Save" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { RxCross2 } from "react-icons/rx";
// import ReactStars from "react-rating-stars-component";
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
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       courseExperience: "",
//       courseRating: 0,
//     },
//   });

//   // Register rating field with validation rules
//   useEffect(() => {
//     register("courseRating", {
//       required: "Please provide a rating",
//       min: { value: 1, message: "Rating must be at least 1" },
//       max: { value: 5, message: "Rating cannot exceed 5" },
//     });

//     // reset on open
//     setValue("courseExperience", "");
//     setValue("courseRating", 0);
//   }, [register, setValue]);

//   const rating = watch("courseRating");

//   const ratingChanged = (newRating) => {
//     setValue("courseRating", newRating, { shouldValidate: true });
//   };

//   const onSubmit = async (data) => {
//     await createRating(
//       {
//         courseId: courseEntireData._id,
//         rating: data.courseRating,
//         review: data.courseExperience,
//       },
//       token
//     );
//     setReviewModal(false);
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
//             <div className="form-group rating-group">
//               <label className="form-label">
//                 Your Rating <sup className="required">*</sup>
//               </label>
//               <ReactStars
//                 count={5}
//                 onChange={ratingChanged}
//                 size={24}
//                 activeColor="#ffd700"
//                 value={rating}
//               />
//               {errors.courseRating && (
//                 <span className="error-text">
//                   {errors.courseRating.message}
//                 </span>
//               )}
//             </div>

//             {/* Hidden input for RHF tracking */}
//             <input type="hidden" {...register("courseRating")} />

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
//               <IconBtn text="Save" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
