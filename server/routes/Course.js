// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  // deleteCategory,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRatingAndReviews,
} = require("../controllers/RatingAndReview")

const {
  updateCourseProgress,
  getCourseProgress,
} = require("../controllers/courseProgress");

// Importing Middlewares
const { auth, isinstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isinstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isinstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isinstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isinstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isinstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isinstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isinstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses cheking testing change
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isinstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isinstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse/:courseId",auth, deleteCourse)

router.get("/:courseId/progress", auth,isStudent,getCourseProgress);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// CATEGORY ROUTES
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)
// final URL: DELETE /api/v1/category/deleteCategory/:categoryId
// router.delete("/deleteCategory/:categoryId", auth,isAdmin,deleteCategory);


// RATING AND REVIEW ROUTES
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getAllRatingAndReviews", getAllRatingAndReviews)

module.exports = router