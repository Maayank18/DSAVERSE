// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendOTP,
  changePassword,
} = require("../../api/controllers/Auth")
const {
  resetpasswordtoken,
  resetpassword,
} = require("../../api/controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// AUTHENTICATION ROUTES
// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// RESET PASSWORD ROUTES
// Route for generating a reset password token
router.post("/reset-password-token", resetpasswordtoken)

// Route for resetting user's password after verification
router.post("/reset-password", resetpassword)

// Export the router for use in the main application
module.exports = router