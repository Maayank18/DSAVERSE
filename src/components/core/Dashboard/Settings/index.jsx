import React from "react"
import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

import "./Settings.css"

export default function Settings() {
  return (
    <div className="settings-container">
      <h1 className="settings-heading">Edit Profile</h1>
      <ChangeProfilePicture />
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  )
}
