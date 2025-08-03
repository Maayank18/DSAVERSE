// const SubSection = require("../models/SubSection");
// const Section = require("../models/Section");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

// // create subsection
// exports.createSubSection = async (req,res) => {
//     try{
//         // fetch data from request
//         // extract video files - (basically humara jo url hai)
//         // validate
//         // upload video to cloudinary  -> to get secure url
//         // create a subsection in database
//         // insert the subsection id into our section
//         // return response

//         // testing change
//         const {sectionId, title, timeDuration, description} = req.body;

//         const video = req.files.videoFile;

//         console.log("BODY:", req.body);
//         console.log("FILES:", req.files);


//         if(!sectionId || !title || !timeDuration || !description || !video){
//             return res.status(400).json({
//                 success:false,
//                 message:" all fields are required ",
//             });
//         }

//         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

//         const subSectionDetails = await SubSection.create({
//             title:title,
//             timeDuration:timeDuration,
//             description:description,
//             videoUrl:uploadDetails.secure_url,
//         });

//         const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
//                                                               {
//                                                                 $push:{
//                                                                     subSection:subSectionDetails._id,
//                                                                 }
//                                                               },
//                                                               {new:true}
//         ); // log updated section here afetr adding populate query

//         return res.status(200).json({
//             success:true,
//             message:" Successfully created a subsection ",
//             updateSection,
//         });

//     }catch(error){
//         console.log("error while creating subsection is", error);
//         return res.status(500).json({
//             success:false,
//             message:" something went wwonf try again to create subsection",
//         });
//     }
// }




// // update subsection
// exports.updateSubSection = async (req, res) => {
//     try {
//         const { subSectionID, title, timeDuration, description } = req.body;

//         // check for required field
//         if (!subSectionID) {
//             return res.status(400).json({
//                 success: false,
//                 message: "SubSection ID is required",
//             });
//         }

//         // fetch existing subsection
//         const subSection = await SubSection.findById(subSectionID);
//         if (!subSection) {
//             return res.status(404).json({
//                 success: false,
//                 message: "SubSection not found",
//             });
//         }

//         // update fields if they exist in the request
//         if (title) subSection.title = title;
//         if (timeDuration) subSection.timeDuration = timeDuration;
//         if (description) subSection.description = description;

//         // if video file is present, upload and update URL
//         if (req.files && req.files.videoFile) {
//             const video = req.files.videoFile;
//             const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
//             subSection.videoUrl = uploadDetails.secure_url;
//         }

//         // save updated subsection
//         await subSection.save();

//         return res.status(200).json({
//             success: true,
//             message: "SubSection updated successfully",
//             data: subSection,
//         });

//     } catch (error) {
//         console.error("Error updating subsection:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while updating the subsection",
//         });
//     }
// };




// // delete subsection
// exports.deleteSubSection = async (req, res) => {
//     try {
//         const { subSectionID, sectionID } = req.body;

//         // validate inputs
//         if (!subSectionID || !sectionID) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Both subSectionID and sectionID are required",
//             });
//         }

//         // check if subsection exists
//         const subSection = await SubSection.findById(subSectionID);
//         if (!subSection) {
//             return res.status(404).json({
//                 success: false,
//                 message: "SubSection not found",
//             });
//         }

//         // delete the subsection
//         await SubSection.findByIdAndDelete(subSectionID);

//         // pull the subsection ID from the section
//         await Section.findByIdAndUpdate(
//             sectionID,
//             {
//                 $pull: {
//                     subSection: subSectionID,
//                 },
//             },
//             { new: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "SubSection deleted successfully",
//         });

//     } catch (error) {
//         console.error("Error deleting subsection:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while deleting the subsection",
//         });
//     }
// };




// Import necessary modules
import { toast } from "react-hot-toast";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { getVideoDurationInSeconds } from "get-video-duration" // ✅ Add this import at top



// Create a new sub-section for a given section
// export const createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;
//     const video = req.files?.video; // ✅ Moved this line above usage

//     // ✅ Log after defining video
//     console.log("📦 File:", video);
//     console.log("📨 Body:", req.body);

//     console.log("sectionId:", sectionId);
//     console.log("title:", title);
//     console.log("description:", description);
//     console.log("video:", video);


//     // ✅ Validate required fields
//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing fields",
//       });
//     }

//     // 1. Upload video to Cloudinary or move it to temp folder
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       "course-videos"
//     );

//     // 2. Create the SubSection
//     const newSubSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//     });

//     // 3. Update Section with new SubSection
//     await Section.findByIdAndUpdate(
//       sectionId,
//       {
//         $push: { subSection: newSubSection._id },
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "SubSection created successfully",
//       data: newSubSection,
//     });
//   } catch (err) {
//     console.error("❌ Error creating subsection:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


// export const createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body
//     const video = req.files?.video

//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing fields",
//       })
//     }

//     // ✅ Upload video to Cloudinary or wherever you store it
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       "course-videos"
//     )

//     // ✅ Get duration of video (from tempFilePath)
//     const durationInSeconds = await getVideoDurationInSeconds(video.tempFilePath)

//     // ✅ Convert to readable format (e.g., "2:35")
//     const formatDuration = (seconds) => {
//       const mins = Math.floor(seconds / 60)
//       const secs = Math.floor(seconds % 60)
//       return `${mins}:${secs < 10 ? "0" : ""}${secs}`
//     }

//     const timeDuration = formatDuration(durationInSeconds)

//     // ✅ Create SubSection with timeDuration
//     const newSubSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//       timeDuration, // ✅ Required field
//     })

//     // ✅ Push into Section
//     await Section.findByIdAndUpdate(
//       sectionId,
//       {
//         $push: { subSection: newSubSection._id },
//       },
//       { new: true }
//     )

//     return res.status(200).json({
//       success: true,
//       message: "SubSection created successfully",
//       data: updatedCourse,
//     })
//   } catch (err) {
//     console.error("❌ Error creating subsection:", err)
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     })
//   }
// }

export const createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(video, "course-videos");
    const durationInSeconds = await getVideoDurationInSeconds(video.tempFilePath);

    const formatDuration = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

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

    // ✅ ✅ ✅ FIX: Return the full updated course with populated subSections
    // You need courseId for this — fetch it using the section
    const section = await Section.findById(sectionId);
    const courseId = section?.course; // only works if section has course ref, else pass courseId from frontend

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedCourse, // ✅ return full updated course
    });
  } catch (err) {
    console.error("❌ Error creating subsection:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





export const updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

export const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}