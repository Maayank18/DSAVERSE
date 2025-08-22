// import { useEffect, useRef, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"
// import { useSelector } from "react-redux"
// import './Upload.css'

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   isVideo = false,
//   viewData = null,
//   editData = null,
// }) {
//   const { course } = useSelector((state) => state.course)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )
//   const inputRef = useRef(null)

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0]
//     if (file) {
//       previewFile(file)
//       setSelectedFile(file)
//     }
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: !isVideo
//       ? { "image/*": [".jpeg", ".jpg", ".png"] }
//       : { "video/*": [".mp4"] },
//     onDrop,
//     noClick: true,
//   })

//   const previewFile = (file) => {
//     if (isVideo) {
//       const videoURL = URL.createObjectURL(file)
//       setPreviewSource(videoURL)
//     } else {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onloadend = () => {
//         setPreviewSource(reader.result)
//       }
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//   }, [register])

//   useEffect(() => {
//     setValue(name, selectedFile)
//   }, [selectedFile, setValue])

//   return (
//     <div className="upload-container">
//       <label className="upload-label" htmlFor={name}>
//         {label} {!viewData && <sup className="required">*</sup>}
//       </label>

//       <div className={`upload-dropzone ${isDragActive ? "drag-active" : ""}`} {...getRootProps()}>
//         <input {...getInputProps()} ref={inputRef} style={{ display: "none" }} />

//         {previewSource ? (
//           <div className="preview-wrapper">
//             {!isVideo ? (
//               <img src={previewSource} alt="Preview" className="preview-image" />
//             ) : (
//               <video
//                 src={previewSource}
//                 controls
//                 className="preview-video"
//                 width="100%"
//               />
//             )}
//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewSource("")
//                   setSelectedFile(null)
//                   setValue(name, null)
//                 }}
//                 className="cancel-button"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div
//             className="upload-input"
//             onClick={() => {
//               inputRef.current?.click()
//             }}
//           >
//             <div className="upload-icon-wrapper">
//               <FiUploadCloud className="upload-icon" />
//             </div>
//             <p className="upload-text">
//               Drag and drop an {!isVideo ? "image" : "video"}, or click to{" "}
//               <span className="highlight">Browse</span> a file
//             </p>
//             <ul className="upload-guidelines">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>

//       {errors[name] && (
//         <span className="upload-error">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }


import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"
import './Upload.css'

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  isVideo = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !isVideo
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true,
  })

  const previewFile = (file) => {
    if (isVideo) {
      const videoURL = URL.createObjectURL(file)
      setPreviewSource(videoURL)
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  }

  // Register field and — if editing — pre-fill RHF with existing value (URL or stored value)
  useEffect(() => {
    const isRequired = !(viewData || editData)
    register(name, { required: isRequired })

    if (viewData || editData) {
      const existing = viewData ?? editData
      // mirror the preview and set the form value so RHF considers the field filled
      setPreviewSource(existing)
      setValue(name, existing, { shouldValidate: true, shouldDirty: true })
    }
    // note: include setValue/register/name/viewData/editData in deps
  }, [register, name, viewData, editData, setValue])

  // When user selects a new file, update RHF (and validate)
  useEffect(() => {
    if (selectedFile) {
      setValue(name, selectedFile, { shouldValidate: true, shouldDirty: true })
    } else {
      // if cleared by user and there's no existing view/edit data, clear the field value
      if (!(viewData || editData)) {
        setValue(name, null, { shouldValidate: true, shouldDirty: true })
      }
    }
  }, [selectedFile, setValue, name, viewData, editData])

  return (
    <div className="upload-container">
      <label className="upload-label" htmlFor={name}>
        {label} {!viewData && <sup className="required">*</sup>}
      </label>

      <div className={`upload-dropzone ${isDragActive ? "drag-active" : ""}`} {...getRootProps()}>
        <input {...getInputProps()} ref={inputRef} style={{ display: "none" }} />

        {previewSource ? (
          <div className="preview-wrapper">
            {!isVideo ? (
              <img src={previewSource} alt="Preview" className="preview-image" />
            ) : (
              <video
                src={previewSource}
                controls
                className="preview-video"
                width="100%"
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  // clear RHF value and re-validate
                  setValue(name, null, { shouldValidate: true, shouldDirty: true })
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="upload-input"
            onClick={() => {
              inputRef.current?.click()
            }}
          >
            <div className="upload-icon-wrapper">
              <FiUploadCloud className="upload-icon" />
            </div>
            <p className="upload-text">
              Drag and drop an {!isVideo ? "image" : "video"}, or click to{" "}
              <span className="highlight">Browse</span> a file
            </p>
            <ul className="upload-guidelines">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="upload-error">
          {label} is required
        </span>
      )}
    </div>
  )
}
