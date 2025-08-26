// const express = require("express")
// const router = express.Router()
// const { contactUsController } = require("../controllers/ContactUs")

// router.post("/contact", contactUsController)

// module.exports = router

const express = require("express")
const router = express.Router()
const { contactUsController } = require("../controllers/ContactUs")

// change to "/" so mounting "/api/v1/contact" => final: /api/v1/contact
router.post("/", contactUsController)

module.exports = router
