// // Import the required modules
// const express = require("express")
// const router = express.Router()

// const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controllers/Payment")
// const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
// router.post("/capturePayment", auth, isStudent, capturePayment)
// router.post("/verifyPayment",auth, isStudent, verifySignature)
// router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

// module.exports = router

// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../../api/controllers/Payment")
const { auth, isStudent } = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router