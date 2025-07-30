import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"
import "./Dashboard.css"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="dashboard-loader-wrapper">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
