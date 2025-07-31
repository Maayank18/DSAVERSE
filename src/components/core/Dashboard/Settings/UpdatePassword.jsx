import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

import "./UpdatePassword.css"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("Submitted Data >>>", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="password-container">
        <h2 className="password-heading">Password</h2>
        <div className="password-fields">
          {/* Current Password */}
          <div className="input-group">
            <label htmlFor="currentPassword" className="label-style">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter Current Password"
              className="form-style"
              {...register("currentPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="eye-icon"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.currentPassword && (
              <span className="error-msg">
                Please enter your Current Password.
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="input-group">
            <label htmlFor="newPassword" className="label-style">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style"
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="eye-icon"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.newPassword && (
              <span className="error-msg">
                Please enter your New Password.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="cancel-button"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  )
}
