// import { useEffect, useRef, useState } from "react"
// import { FiUpload } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"

// import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
// import IconBtn from "../../../common/IconBtn"
// import "./ChangeProfilePicture.css"

// export default function ChangeProfilePicture() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(null)

//   const fileInputRef = useRef(null)

//   const handleClick = () => {
//     fileInputRef.current.click()
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       previewFile(file)
//     }
//   }

//   const previewFile = (file) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   const handleFileUpload = () => {
//     try {
//       setLoading(true)
//       const formData = new FormData()
//       formData.append("displayPicture", imageFile)
//       dispatch(updateDisplayPicture(token, formData)).then(() => {
//         setLoading(false)
//       })
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   useEffect(() => {
//     if (imageFile) {
//       previewFile(imageFile)
//     }
//   }, [imageFile])

//   return (
//     <div className="change-picture-wrapper">
//       <div className="change-picture-left">
//         <img
//           src={previewSource || user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="profile-pic"
//         />
//         <div className="change-picture-content">
//           <p>Change Profile Picture</p>
//           <div className="change-picture-buttons">
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               className="file-input"
//               accept="image/png, image/gif, image/jpeg"
//             />
//             <button
//               onClick={handleClick}
//               disabled={loading}
//               className="select-btn"
//             >
//               Select
//             </button>
//             <IconBtn
//               text={loading ? "Uploading..." : "Upload"}
//               onClick={handleFileUpload}
//             >
//               {!loading && (
//                 <FiUpload className="upload-icon" />
//               )}
//             </IconBtn>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }









// // ChangeProfilePicture.jsx
// import { useEffect, useRef, useState } from "react";
// import { FiUpload } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";

// import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
// import { setUser } from "../../../../slices/profileSlice"; // update path if your slices path differs
// import IconBtn from "../../../common/IconBtn";
// import "./ChangeProfilePicture.css";

// export default function ChangeProfilePicture() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(null);

//   // used to bust cache only when user.image changes
//   const [imageVersion, setImageVersion] = useState(Date.now());

//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       previewFile(file);
//     }
//   };

//   const previewFile = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setPreviewSource(reader.result);
//     };
//   };

//   const handleFileUpload = async () => {
//     if (!imageFile) return;
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("displayPicture", imageFile);

//       // dispatch the thunk - assume it returns payload (createAsyncThunk style)
//       const res = await dispatch(updateDisplayPicture(token, formData));

//       // Read updated user from response - try several common shapes
//       const updatedUser =
//         (res && res.payload) || // createAsyncThunk typical
//         (res && res.data) || // axios-style returned object
//         res; // fallback

//       if (updatedUser) {
//         // If your API responds with { user: {...} } handle that:
//         const maybeUser = updatedUser.user ? updatedUser.user : updatedUser;

//         // update redux state and localStorage so refresh shows new image
//         dispatch(setUser(maybeUser));
//         try {
//           localStorage.setItem("user", JSON.stringify(maybeUser));
//         } catch (e) {
//           // ignore localStorage errors (quota etc.)
//           console.warn("Failed to write user to localStorage", e);
//         }

//         // bump image version to bust browser cache for the new URL
//         setImageVersion(Date.now());

//         // clear preview and file selection so component shows actual stored image
//         setImageFile(null);
//         setPreviewSource(null);
//       } else {
//         // No payload returned — optional: you can console log for debugging
//         console.warn("updateDisplayPicture returned no payload", res);
//       }
//     } catch (error) {
//       console.error("ERROR UPLOADING DISPLAY PICTURE:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // if user.image changes from redux (for example after other actions),
//   // bump the version to bust cache
//   useEffect(() => {
//     if (user?.image) {
//       setImageVersion(Date.now());
//     }
//   }, [user?.image]);

//   const imageSrc = previewSource
//     ? previewSource
//     : user?.image
//     ? `${user.image}?v=${imageVersion}`
//     : "";

//   return (
//     <div className="change-picture-wrapper">
//       <div className="change-picture-left">
//         <img
//           src={imageSrc}
//           alt={`profile-${user?.firstName ?? "user"}`}
//           className="profile-pic"
//         />
//         <div className="change-picture-content">
//           <p>Change Profile Picture</p>
//           <div className="change-picture-buttons">
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               className="file-input"
//               accept="image/png, image/gif, image/jpeg"
//             />
//             <button onClick={handleClick} disabled={loading} className="select-btn">
//               Select
//             </button>
//             <IconBtn text={loading ? "Uploading..." : "Upload"} onClick={handleFileUpload}>
//               {!loading && <FiUpload className="upload-icon" />}
//             </IconBtn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// ChangeProfilePicture.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import { setUser } from "../../../../slices/profileSlice"; // adjust path if yours differs
import IconBtn from "../../../common/IconBtn";
import "./ChangeProfilePicture.css";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  // used to bust cache when user.image changes
  const [imageVersion, setImageVersion] = useState(Date.now());

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Helper: fetch current user from server if API doesn't return updated user
  const fetchCurrentUser = async () => {
    try {
      // common endpoint for "current user" — alter if your API differs
      const res = await axios.get("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // expecting either res.data or res.data.user
      return res?.data?.user ?? res?.data ?? null;
    } catch (err) {
      console.warn("Failed to fetch current user after upload", err);
      return null;
    }
  };

  // const handleFileUpload = async () => {
  //   if (!imageFile) return;
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("displayPicture", imageFile);

  //     // Call your existing thunk/service
  //     const dispatched = await dispatch(updateDisplayPicture(token, formData));
  //     // dispatched might be an axios response or a thunk result with payload
  //     const result =
  //       (dispatched && dispatched.payload) ||
  //       (dispatched && dispatched.data) ||
  //       dispatched;

  //     // Try to extract the updated user object from common response shapes:
  //     let updatedUser =
  //       result?.user ?? // { user: {...} }
  //       result?.data ?? // res.data = {...}
  //       result ?? // raw user
  //       null;

  //     // In some setups the server returns just `{ success: true, message: "...", imageUrl: "..." }`.
  //     // If `updatedUser` is null, try to fetch the fresh user object from server.
  //     if (!updatedUser) {
  //       const fetched = await fetchCurrentUser();
  //       if (fetched) updatedUser = fetched;
  //     }

  //     if (updatedUser) {
  //       // If server returns a partial object (e.g., only imageUrl), merge with existing user
  //       const mergedUser = { ...(user ?? {}), ...(updatedUser ?? {}) };

  //       // persist to Redux (and localStorage because slice writes there)
  //       dispatch(setUser(mergedUser));
  //       // bump version to bust browser cache
  //       setImageVersion(Date.now());
  //       // clear preview & file selection
  //       setImageFile(null);
  //       setPreviewSource(null);
  //     } else {
  //       // fallback: if we couldn't get updated user info, still bump cache to try showing new image
  //       setImageVersion(Date.now());
  //       setPreviewSource(null);
  //       setImageFile(null);
  //       console.warn("Upload succeeded but couldn't read updated user — check backend response shape.");
  //     }
  //   } catch (error) {
  //     console.error("ERROR UPLOADING DISPLAY PICTURE:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFileUpload = async () => {
  if (!imageFile) return;
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("displayPicture", imageFile);

    const dispatched = await dispatch(updateDisplayPicture(token, formData));
    // your service should return { success, message, data: updatedUser }
    const result = dispatched?.payload || dispatched;

    const updatedUser = result?.data; // <-- this is your user object

    if (updatedUser) {
      dispatch(setUser(updatedUser)); // updates Redux + localStorage
      setImageVersion(Date.now());    // bust cache
      setImageFile(null);
      setPreviewSource(null);
    }
  } catch (error) {
    console.error("ERROR UPLOADING DISPLAY PICTURE:", error);
  } finally {
    setLoading(false);
  }
};

  // if user.image changes from outside, bump cache version
  useEffect(() => {
    if (user?.image) {
      setImageVersion(Date.now());
    }
  }, [user?.image]);

  const imageSrc = previewSource
    ? previewSource
    : user?.image
    ? `${user.image}?v=${imageVersion}`
    : "";

  return (
    <div className="change-picture-wrapper">
      <div className="change-picture-left">
        <img
          src={imageSrc}
          alt={`profile-${user?.firstName ?? "user"}`}
          className="profile-pic"
        />
        <div className="change-picture-content">
          <p>Change Profile Picture</p>
          <div className="change-picture-buttons">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="file-input"
              accept="image/png, image/gif, image/jpeg"
            />
            <button onClick={handleClick} disabled={loading} className="select-btn">
              Select
            </button>
            <IconBtn text={loading ? "Uploading..." : "Upload"} onClick={handleFileUpload}>
              {!loading && <FiUpload className="upload-icon" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
