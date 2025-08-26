// EditProfile.jsx
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import { formattedDate } from "../../../../utils/dateFormatter"
import IconBtn from "../../../common/IconBtn"
import "./EditProfile.css"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className="profile-form">
      <div className="form-section">
        <h2 className="form-title">Profile Information</h2>

        {/* Row 1: First Name - Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="label">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="input"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && <span className="error-text">Please enter your first name.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="label">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="input"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && <span className="error-text">Please enter your last name.</span>}
          </div>
        </div>

        {/* Row 2: Date of Birth - Gender */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              className="input"
              {...register("dateOfBirth", {
                required: "Please enter your Date of Birth.",
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              // defaultValue={user?.additionalDetails?.dateOfBirth}
              defaultValue={formattedDate(user?.additionalDetails?.dateOfBirth)}
            />
            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="label">Gender</label>
            <select
              id="gender"
              className="input"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender || ""}
            >
              <option value="" disabled>Select gender</option>
              {genders.map((ele, i) => (
                <option key={i} value={ele}>{ele}</option>
              ))}
            </select>
            {errors.gender && <span className="error-text">Please select a gender.</span>}
          </div>
        </div>

        {/* Row 3: Contact Number (full width) */}
        <div className="form-row single-column">
          <div className="form-group">
            <label htmlFor="contactNumber" className="label">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="input"
              {...register("contactNumber", {
                required: "Please enter your Contact Number.",
                minLength: { value: 10, message: "Invalid Contact Number" },
                maxLength: { value: 12, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && <span className="error-text">{errors.contactNumber.message}</span>}
          </div>
        </div>

        {/* Row 4: About/Bio (full width) */}
        <div className="form-row single-column">
          <div className="form-group">
            <label htmlFor="about" className="label">About</label>
            <textarea
              id="about"
              placeholder="Enter Bio Details"
              className="input textarea"
              rows={4}
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && <span className="error-text">Please enter your bio.</span>}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="btn cancel-btn"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  )
}


// EditProfile.jsx
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { updateProfile } from "../../../../services/operations/SettingsAPI";
// import IconBtn from "../../../common/IconBtn";
// import "./EditProfile.css";

// const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

// export default function EditProfile() {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // initialize form with empty defaults
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       gender: "",
//       contactNumber: "",
//       about: "",
//     },
//   });

//   // Whenever user loads/changes, reset the form values.
//   useEffect(() => {
//     if (!user) return;

//     // format DOB into YYYY-MM-DD for <input type="date" />
//     const rawDob = user?.additionalDetails?.dateOfBirth;
//     const formattedDob = rawDob
//       ? new Date(rawDob).toISOString().split("T")[0]
//       : "";

//     reset({
//       firstName: user.firstName ?? "",
//       lastName: user.lastName ?? "",
//       dateOfBirth: formattedDob,
//       gender: user?.additionalDetails?.gender ?? "",
//       contactNumber: user?.additionalDetails?.contactNumber ?? "",
//       about: user?.additionalDetails?.about ?? "",
//     });
//   }, [user, reset]);

//   const submitProfileForm = async (data) => {
//     try {
//       // data.dateOfBirth will be a string "YYYY-MM-DD" (or "")
//       // dispatch your existing action (assumed to accept exactly this shape)
//       await dispatch(updateProfile(token, data));
//       // optional: navigate or show toast on success
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(submitProfileForm)} className="profile-form">
//       <div className="form-section">
//         <h2 className="form-title">Profile Information</h2>

//         {/* Row 1: First Name - Last Name */}
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="firstName" className="label">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               placeholder="Enter first name"
//               className="input"
//               {...register("firstName", { required: true })}
//             />
//             {errors.firstName && (
//               <span className="error-text">Please enter your first name.</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName" className="label">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               placeholder="Enter last name"
//               className="input"
//               {...register("lastName", { required: true })}
//             />
//             {errors.lastName && (
//               <span className="error-text">Please enter your last name.</span>
//             )}
//           </div>
//         </div>

//         {/* Row 2: Date of Birth - Gender */}
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="dateOfBirth" className="label">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               className="input"
//               {...register("dateOfBirth", {
//                 required: "Please enter your Date of Birth.",
//                 max: {
//                   value: new Date().toISOString().split("T")[0],
//                   message: "Date of Birth cannot be in the future.",
//                 },
//               })}
//             />
//             {errors.dateOfBirth && (
//               <span className="error-text">{errors.dateOfBirth.message}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender" className="label">
//               Gender
//             </label>
//             <select
//               id="gender"
//               className="input"
//               {...register("gender", { required: true })}
//             >
//               <option value="" disabled>
//                 Select gender
//               </option>
//               {genders.map((ele, i) => (
//                 <option key={i} value={ele}>
//                   {ele}
//                 </option>
//               ))}
//             </select>
//             {errors.gender && (
//               <span className="error-text">Please select a gender.</span>
//             )}
//           </div>
//         </div>

//         {/* Row 3: Contact Number (full width) */}
//         <div className="form-row single-column">
//           <div className="form-group">
//             <label htmlFor="contactNumber" className="label">
//               Contact Number
//             </label>
//             <input
//               type="tel"
//               id="contactNumber"
//               placeholder="Enter Contact Number"
//               className="input"
//               {...register("contactNumber", {
//                 required: "Please enter your Contact Number.",
//                 minLength: { value: 10, message: "Invalid Contact Number" },
//                 maxLength: { value: 12, message: "Invalid Contact Number" },
//               })}
//             />
//             {errors.contactNumber && (
//               <span className="error-text">{errors.contactNumber.message}</span>
//             )}
//           </div>
//         </div>

//         {/* Row 4: About/Bio (full width) */}
//         <div className="form-row single-column">
//           <div className="form-group">
//             <label htmlFor="about" className="label">
//               About
//             </label>
//             <textarea
//               id="about"
//               placeholder="Enter Bio Details"
//               className="input textarea"
//               rows={4}
//               {...register("about", { required: true })}
//             />
//             {errors.about && (
//               <span className="error-text">Please enter your bio.</span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="form-actions">
//         <button
//           type="button"
//           onClick={() => navigate("/dashboard/my-profile")}
//           className="btn cancel-btn"
//         >
//           Cancel
//         </button>
//         <IconBtn type="submit" text="Save" />
//       </div>
//     </form>
//   );
// }
