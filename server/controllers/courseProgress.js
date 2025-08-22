const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")

// exports.getCourseProgress = async (req, res) => {
//   const userId = req.user?.id;
//   const courseId = req.params.courseId;

//   if (!userId)
//     return res.status(401).json({ success: false, message: "Unauthorized" });

//   try {
//     const courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId,
//     });

//     return res.status(200).json({
//       success: true,
//       completedVideos: courseProgress ? courseProgress.completedVideos : [],
//     });
//   } catch (error) {
//     console.error("getCourseProgress error:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


exports.getCourseProgress = async (req, res) => {
  try {
    const userId = req.user?.id;
    const courseId = req.params.courseId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const cp = await CourseProgress.findOne({ courseID: courseId, userId }).lean();

    const completedVideos = (cp?.completedVideos || []).map(id => id.toString());

    return res.status(200).json({ success: true, completedVideos });
  } catch (err) {
    console.error("getCourseProgress error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// exports.updateCourseProgress = async (req, res) => {
//   const { courseId, subsectionId } = req.body;
//   const userId = req.user?.id;

//   try {
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // Validate IDs
//     if (
//       !mongoose.Types.ObjectId.isValid(courseId) ||
//       !mongoose.Types.ObjectId.isValid(subsectionId)
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid courseId or subsectionId" });
//     }

//     // Check if the subsection exists
//     const subsection = await SubSection.findById(subsectionId);
//     if (!subsection) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid subsection" });
//     }

//     // Find or create course progress for this user + course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     });

//     if (!courseProgress) {
//       // Create progress doc if none exists
//       courseProgress = new CourseProgress({
//         userId,
//         courseID: courseId,
//         completedVideos: [],
//       });

//       // 🔹 Also enroll the user in the course if not already in studentsEnrolled
//       await Course.findByIdAndUpdate(courseId, {
//         $addToSet: { studentsEnrolled: userId },
//       });
//     }

//     // Check if subsection already completed
//     const alreadyCompleted = courseProgress.completedVideos
//       .map((id) => id.toString())
//       .includes(subsectionId.toString());

//     // if (alreadyCompleted) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, message: "Subsection already completed" });
//     // }
//     if (alreadyCompleted) {
//       // Idempotent response — not an error if it's already completed
//       return res.status(200).json({
//       success: true,
//       message: "Subsection already completed",
//       completedVideos: courseProgress.completedVideos,
//   });
// }


//     // Mark subsection as completed
//     courseProgress.completedVideos.push(subsectionId);

//     // Save updated progress
//     await courseProgress.save();

//     return res
//       .status(200)
//       .json({ success: true,
//          message: "Course progress updated",
//          completedVideos: courseProgress.completedVideos, });
//   } catch (error) {
//     console.error("updateCourseProgress error:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };
exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(subsectionId)) {
      return res.status(400).json({ success: false, message: "Invalid courseId or subsectionId" });
    }

    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) return res.status(404).json({ success: false, message: "Invalid subsection" });

    // Atomically add subsectionId to completedVideos (no duplicates), create document if not exists
    const updated = await CourseProgress.findOneAndUpdate(
      { userId, courseID: courseId },
      {
        $addToSet: { completedVideos: subsectionId },
        $setOnInsert: { userId, courseID: courseId }
      },
      { new: true, upsert: true }
    ).lean();

    // Ensure user is enrolled (idempotent)
    await Course.findByIdAndUpdate(courseId, { $addToSet: { studentsEnrolled: userId } });

    // Normalize to strings to make client comparisons easier
    const completedVideos = (updated.completedVideos || []).map(id => id.toString());

    console.log("updateCourseProgress saved:", { userId, courseId, subsectionId, completedVideos });

    return res.status(200).json({
      success: true,
      message: "Course progress updated",
      completedVideos,
    });
  } catch (err) {
    console.error("updateCourseProgress error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


