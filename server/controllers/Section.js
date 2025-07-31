// //  isme create , update and delete section kar sakta hun
// const Section = require("../models/Section");
// const Course = require("../models/Course");

// exports.createSection = async (req,res) => {
//     try{
//         // data fetch
//         // kyuki humne course create kar lia hai to course id bhi aa gyi hogi
//         const {sectionName, courseId} = req.body;

//         //  validate the data
//         if(!sectionName || !courseId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Missing data, all fields are required",
//             });
//         }

//         // create the section
//         const newSection = await Section.create({sectionName});

//         //  once created update the course as it contains the section using section id
//         const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
//                                             {
//                                                 $push:{
//                                                 courseContent:newSection._id,
//                                             }
//                                         },
//                                             {new:true},
//         ) // check how to use populate to replace section adn subsection in updated course details

//         // return successful response
//         return res.status(200).json({
//             success:true,
//             message:" section created successfully ",
//             updatedCourseDetails,
//         });

//     }catch(error){
//         console.log("error while creating a section", error);
//         return res.status(500).json({
//             success:false,
//             message:" section creation failed , please try again",
//         });
//     }
// }


// // Updating the section
// exports.updateSection = async (req,res) => {
//     try{
//         // fetch details
//         const {sectionName, sectionID} = req.body;

//         // validate the data
//         if(!sectionName || !sectionID){
//             return res.status(400).json({
//                 success:false,
//                 message:"Missing data, all fields are required",
//             });
//         }

//         // jaha pe bhi data pada hai usse update kardo
//         //  id ke dwara update karo
//         const section = await Section.findByIdAndUpdate(sectionID, {sectionName}, {new:true});

//         // dubara course me waapis update nhi karn abecause id padi hai usme 
//         // return response
//         return res.status(200).json({
//             success:true,
//             message:" section updated successfully ",
//             updatedCourseDetails,
//         });

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:" updating the section failed at the moment",
//         });
//     }
// }



// // Delete section
// exports.deleteSection = async (req,res) => {
//     try{
//         // fetch details {id} of the section
//         // sending id in parameters
//         const {sectionId} = req.params;
//         // do we need to delete of from course schema too yes and updaet that too

//         // find by id and delete
//         await Section.findByIdAndDelete(sectionId);

//         // return response
//         return res.status(200).json({
//             success:true,
//             message:" section updated successfully ",
//             updatedCourseDetails,
//         });

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:" deletion of the section failed at the moment",
//         });
//     }
// }

const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		console.error("Error creating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   