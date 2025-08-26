const express = require("express")
const router = express.Router()

const { auth, isinstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetail,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

console.log(typeof getAllUserDetail);

// PROFILE ROUTES
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetail", auth, getAllUserDetail)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isinstructor, instructorDashboard)

module.exports = router