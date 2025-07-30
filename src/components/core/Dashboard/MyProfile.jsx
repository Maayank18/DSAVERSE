import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import "./MyProfile.css"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="profile-heading">My Profile</h1>

      <div className="profile-section">
        <div className="profile-header">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="profile-img"
          />
          <div className="profile-info">
            <p className="profile-name">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="profile-box">
        <div className="profile-box-header">
          <p className="profile-box-title">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`profile-about-text ${
            user?.additionalDetails?.about
              ? "has-text"
              : "placeholder-text"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      <div className="profile-box">
        <div className="profile-box-header">
          <p className="profile-box-title">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="profile-details">
          <div className="profile-details-column">
            <div>
              <p className="profile-label">First Name</p>
              <p className="profile-value">{user?.firstName}</p>
            </div>
            <div>
              <p className="profile-label">Email</p>
              <p className="profile-value">{user?.email}</p>
            </div>
            <div>
              <p className="profile-label">Gender</p>
              <p className="profile-value">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="profile-details-column">
            <div>
              <p className="profile-label">Last Name</p>
              <p className="profile-value">{user?.lastName}</p>
            </div>
            <div>
              <p className="profile-label">Phone Number</p>
              <p className="profile-value">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="profile-label">Date Of Birth</p>
              <p className="profile-value">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
