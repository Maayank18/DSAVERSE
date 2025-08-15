const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")



// exports.updateCourseProgress = async (req, res) => {
//   const { courseId, subsectionId } = req.body;
//   const userId = req.user?.id;

//   try {
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // Validate IDs
//     if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(subsectionId)) {
//       return res.status(400).json({ success: false, message: "Invalid courseId or subsectionId" });
//     }

//     // Check if the subsection is valid
//     const subsection = await SubSection.findById(subsectionId);
//     if (!subsection) {
//       return res.status(404).json({ success: false, message: "Invalid subsection" });
//     }

//     // Find or create the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     });

//     if (!courseProgress) {
//       // create new progress doc (user is allowed to create progress if none exists)
//       courseProgress = new CourseProgress({
//         userId,
//         courseID: courseId,
//         completedVideos: [],
//       });
//     }

//     // Use .some() + toString() to safely compare ObjectId vs string
//     const alreadyCompleted = courseProgress.completedVideos
//       .map((id) => id.toString())
//       .includes(subsectionId.toString());

//     if (alreadyCompleted) {
//       return res.status(400).json({ success: false, message: "Subsection already completed" });
//     }

//     // Push the subsection into the completedVideos array
//     courseProgress.completedVideos.push(subsectionId);

//     // Save the updated course progress
//     await courseProgress.save();

//     return res.status(200).json({ success: true, message: "Course progress updated" });
//   } catch (error) {
//     console.error("updateCourseProgress error:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(courseId) ||
      !mongoose.Types.ObjectId.isValid(subsectionId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid courseId or subsectionId" });
    }

    // Check if the subsection exists
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid subsection" });
    }

    // Find or create course progress for this user + course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      // Create progress doc if none exists
      courseProgress = new CourseProgress({
        userId,
        courseID: courseId,
        completedVideos: [],
      });

      // 🔹 Also enroll the user in the course if not already in studentsEnrolled
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { studentsEnrolled: userId },
      });
    }

    // Check if subsection already completed
    const alreadyCompleted = courseProgress.completedVideos
      .map((id) => id.toString())
      .includes(subsectionId.toString());

    if (alreadyCompleted) {
      return res
        .status(400)
        .json({ success: false, message: "Subsection already completed" });
    }

    // Mark subsection as completed
    courseProgress.completedVideos.push(subsectionId);

    // Save updated progress
    await courseProgress.save();

    return res
      .status(200)
      .json({ success: true, message: "Course progress updated" });
  } catch (error) {
    console.error("updateCourseProgress error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
