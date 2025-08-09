import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
// import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import "./Template.css"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="template-container">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="content-wrapper">
          <div className="form-section">
            <h1 className="form-title">{title}</h1>
            <p className="form-description">
              <span className="description-main">{description1}</span>{" "}
              <span className="description-highlight">{description2}</span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="image-section">
            {/* <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            /> */}
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="overlay-image"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
