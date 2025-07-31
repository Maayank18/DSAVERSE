import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

import "./Upload.css"; // <-- CSS file imported

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="upload-wrapper">
      <label className="upload-label" htmlFor={name}>
        {label} {!viewData && <sup className="required">*</sup>}
      </label>
      <div className={`dropzone-container ${isDragActive ? "drag-active" : ""}`}>
        {previewSource ? (
          <div className="preview-wrapper">
            {!video ? (
              <img src={previewSource} alt="Preview" className="preview-image" />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          // ✅ Corrected: Separated file input trigger from dropzone so "Browse" click works
          <div
            className="dropzone-content"
            onClick={() => inputRef.current.click()}
            onDrop={getRootProps().onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="upload-icon-wrapper">
              <FiUploadCloud className="upload-icon" />
            </div>
            <p className="dropzone-text">
              Drag and drop an {!video ? "image" : "video"}, or{" "}
              <span
                className="highlight"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent onClick
                  inputRef.current.click();
                }}
                style={{ cursor: "pointer" }}
              >
                Browse
              </span>{" "}
              a file
            </p>
            <ul className="dropzone-hints">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="error-text">{label} is required</span>
      )}
    </div>
  );
}
