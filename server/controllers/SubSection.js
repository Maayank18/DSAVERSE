// // controllers/subSectionController.js (or whatever file you keep these in)
// // Note: I kept your import style and variable names - only fixed the problematic spots.

// import { toast } from "react-hot-toast"; // (left as you had it)
// import Section from "../models/Section.js";
// import SubSection from "../models/SubSection.js";
// import Course from "../models/Course.js"; // <-- import Course model
// import { uploadImageToCloudinary } from "../utils/imageUploader.js";
// import { getVideoDurationInSeconds } from "get-video-duration";

// // helper to format duration (kept same format as before)
// const formatDuration = (seconds) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
// };

// // Create a new sub-section for a given section
// export const createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;
//     const video = req.files?.video;

//     console.log("video in the sub section ",video);

//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing fields",
//       });
//     }

//     // upload to cloudinary (helper already sets resource_type correctly)
//     const uploadDetails = await uploadImageToCloudinary(video, "course-videos");
//     console.log("upload details in cloudianry", uploadDetails);

//     // Prefer duration returned by Cloudinary (uploadDetails.duration). Fallback to local file.
//     let durationInSeconds = 0;
//     if (uploadDetails && typeof uploadDetails.duration === "number" && uploadDetails.duration > 0) {
//       durationInSeconds = uploadDetails.duration;
//     } else {
//       // fallback - might be required in some environments
//       durationInSeconds = await getVideoDurationInSeconds(video.tempFilePath || video.tempFilePathFromMiddleware);
//     }

//     const timeDuration = formatDuration(durationInSeconds);

//     const newSubSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//       timeDuration,
//     });

//     await Section.findByIdAndUpdate(
//       sectionId,
//       {
//         $push: { subSection: newSubSection._id },
//       },
//       { new: true }
//     );

//     // Get courseId from section (your Section schema uses courseId)
//     const section = await Section.findById(sectionId);
//     const courseId = section?.courseId; // <-- fixed: was using wrong key before

//     const updatedCourse = await Course.findById(courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec();
//     console.log("updated course is ",updatedCourse);

//     return res.status(200).json({
//       success: true,
//       message: "SubSection created successfully",
//       data: updatedCourse,
//     });
//   } catch (err) {
//     console.error("❌ Error creating subsection:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// export const updateSubSection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId, title, description } = req.body;
//     const subSection = await SubSection.findById(subSectionId);

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     if (title !== undefined) {
//       subSection.title = title;
//     }

//     if (description !== undefined) {
//       subSection.description = description;
//     }

//     if (req.files && req.files.video !== undefined) {
//       const video = req.files.video;
//       const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

//       subSection.videoUrl = uploadDetails.secure_url;

//       // If Cloudinary gives duration, use it; else fallback to file
//       let durationInSeconds = 0;
//       if (uploadDetails && typeof uploadDetails.duration === "number" && uploadDetails.duration > 0) {
//         durationInSeconds = uploadDetails.duration;
//       } else {
//         durationInSeconds = await getVideoDurationInSeconds(video.tempFilePath || video.tempFilePathFromMiddleware);
//       }
//       subSection.timeDuration = formatDuration(durationInSeconds);
//     }

//     await subSection.save();

//     // find updated section and return it
//     const updatedSection = await Section.findById(sectionId).populate("subSection");

//     console.log("updated section", updatedSection);

//     return res.json({
//       success: true,
//       message: "Section updated successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the section",
//     });
//   }
// };

// export const deleteSubSection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId } = req.body;
//     await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       {
//         $pull: {
//           subSection: subSectionId,
//         },
//       }
//     );
//     const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

//     if (!subSection) {
//       return res
//         .status(404)
//         .json({ success: false, message: "SubSection not found" });
//     }

//     // find updated section and return it
//     const updatedSection = await Section.findById(sectionId).populate("subSection");

//     return res.json({
//       success: true,
//       message: "SubSection deleted successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the SubSection",
//     });
//   }
// };

import Section from "../../server/models/Section.js";
import SubSection from "../../server/models/SubSection.js";
import Course from "../../server/models/Course.js";
import { uploadImageToCloudinary } from "../../server/utils/imageUploader.js";
import { getVideoDurationInSeconds } from "get-video-duration";

// helper to format duration
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

// Create a new sub-section for a given section
export const createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    console.log("video in the sub section:", video);

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    // upload to cloudinary
    const uploadDetails = await uploadImageToCloudinary(video, "course-videos");
    console.log("upload details in cloudinary:", uploadDetails);

    // use duration from cloudinary if available, else fallback
    let durationInSeconds = 0;
    if (
      uploadDetails &&
      typeof uploadDetails.duration === "number" &&
      uploadDetails.duration > 0
    ) {
      durationInSeconds = uploadDetails.duration;
    } else {
      durationInSeconds = await getVideoDurationInSeconds(
        video.tempFilePath || video.tempFilePathFromMiddleware
      );
    }

    const timeDuration = formatDuration(durationInSeconds);

    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadDetails.secure_url,
      timeDuration,
    });

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    );

    // get courseId from the section
    const section = await Section.findById(sectionId);
    const courseId = section?.courseId;

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log("updated course is:", updatedCourse);

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedCourse,
    });
  } catch (err) {
    console.error("❌ Error creating subsection:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update subsection
export const updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME || "course-videos"
      );

      subSection.videoUrl = uploadDetails.secure_url;

      let durationInSeconds = 0;
      if (
        uploadDetails &&
        typeof uploadDetails.duration === "number" &&
        uploadDetails.duration > 0
      ) {
        durationInSeconds = uploadDetails.duration;
      } else {
        durationInSeconds = await getVideoDurationInSeconds(
          video.tempFilePath || video.tempFilePathFromMiddleware
        );
      }
      subSection.timeDuration = formatDuration(durationInSeconds);
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate("subSection");

    console.log("updated section:", updatedSection);

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("❌ Error updating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

// Delete subsection
export const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: { subSection: subSectionId },
      }
    );

    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedSection = await Section.findById(sectionId).populate("subSection");

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("❌ Error deleting subsection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};

