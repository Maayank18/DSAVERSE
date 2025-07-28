const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req,res) => {
    try{
        // fetch data from request
        // extract video files - (basically humara jo url hai)
        // validate
        // upload video to cloudinary  -> to get secure url
        // create a subsection in database
        // insert the subsection id into our section
        // return response

        // testing change
        const {sectionId, title, timeDuration, description} = req.body;

        const video = req.files.videoFile;

        console.log("BODY:", req.body);
        console.log("FILES:", req.files);


        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:" all fields are required ",
            });
        }

        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });

        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                              {
                                                                $push:{
                                                                    subSection:subSectionDetails._id,
                                                                }
                                                              },
                                                              {new:true}
        ); // log updated section here afetr adding populate query

        return res.status(200).json({
            success:true,
            message:" Successfully created a subsection ",
            updateSection,
        });

    }catch(error){
        console.log("error while creating subsection is", error);
        return res.status(500).json({
            success:false,
            message:" something went wwonf try again to create subsection",
        });
    }
}




// update subsection
exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionID, title, timeDuration, description } = req.body;

        // check for required field
        if (!subSectionID) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required",
            });
        }

        // fetch existing subsection
        const subSection = await SubSection.findById(subSectionID);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // update fields if they exist in the request
        if (title) subSection.title = title;
        if (timeDuration) subSection.timeDuration = timeDuration;
        if (description) subSection.description = description;

        // if video file is present, upload and update URL
        if (req.files && req.files.videoFile) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
        }

        // save updated subsection
        await subSection.save();

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: subSection,
        });

    } catch (error) {
        console.error("Error updating subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the subsection",
        });
    }
};




// delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionID, sectionID } = req.body;

        // validate inputs
        if (!subSectionID || !sectionID) {
            return res.status(400).json({
                success: false,
                message: "Both subSectionID and sectionID are required",
            });
        }

        // check if subsection exists
        const subSection = await SubSection.findById(subSectionID);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // delete the subsection
        await SubSection.findByIdAndDelete(subSectionID);

        // pull the subsection ID from the section
        await Section.findByIdAndUpdate(
            sectionID,
            {
                $pull: {
                    subSection: subSectionID,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the subsection",
        });
    }
};




