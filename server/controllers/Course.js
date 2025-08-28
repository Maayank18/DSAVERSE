//  two handler fucntion
// ek to course ko create karo use handler function
// ek saare courses ko fetch karo uska handler function
// course me image bhi upload hogi to cloudinary ka bhi use hoga

const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

function convertSecondsToDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h ${m}m ${s}s`
}

// create course handler function
// data fetch karni hai req.body 
// file fetch from req.files.file
// validation karado 
// user schema me bhi ek entry create hogi ki konse course buy hai
// instruction ke list me jo bana rakhe hai usme aa jayega 
// may be tag validation also needed
// course humesha ek instructor hi create kar sakta to uska validation

// agar tum user ho to tum logged in ho tabhi course dekh paa rahe hai

// exports.createCourse = async (req,res) => {
//     try{
//         // category is an id here 
//         const {courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;

//         // get thumbnail
//         const thumbnailFile = req.files?.thumbnailImage;



//         if(!courseName || !courseDescription || !whatYouWillLearn || !price || 
//             !category || !thumbnailFile || !tag
//         ){
//             console.log("courseName:", courseName);
//             console.log("courseDescription:", courseDescription);
//             console.log("whatWillYouLearn:", whatYouWillLearn); // typo alert!
//             console.log("price:", price);
//             console.log("category:", category);
//             console.log("thumbNail:", thumbnailFile);
//             console.log("tag:", tag);

//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required",
//             });
//         }

//         //  ek instructor ki id bhi to chahiye hogi
//         const userId = req.user.id;
//         const instructorDetails = await User.findById(userId);
//         console.log("instructors detials are ", instructorDetails);
//         // TODO verify that userId and instructor id are same or different

//         if(!instructorDetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"Instructor details not found",
//             });
//         }

//         // check tag is valid or not
//         // ṭesting change in category tag
//         const categoryDetails = await Category.findById(category);
//         if(!categoryDetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"Category details not found",
//             });
//         }

//         const thumbnailImage = await uploadImageToCloudinary(thumbnailFile, process.env.FOLDER_NAME);


//         // creat entry for new course 
//         // testing change
//         const newCourse = await Course.create({
//             courseName,
//             courseDescription, 
//             instructor:instructorDetails.id,
//             whatYouWillLearn:whatYouWillLearn,
//             price,
//             category:categoryDetails.id,
//             thumbnail: thumbnailImage.secure_url,
//         });

//         //  add new course to user schema of instructor
//         await User.findByIdAndUpdate({_id:instructorDetails._id},
//             {
//                 $push:{
//                     courses:newCourse._id,
//                 }
//             },
//             {new:true},
//         );


//         // update catoegory details
//         await Category.findByIdAndUpdate(
//             categoryDetails._id,
//             {
//                 $push: {
//                     courses: newCourse._id,
//                 },
//             },
//             { new: true }
//         );


//         return res.status(200).json({
//             success:true,
//             message:"Course Created Succesfully",
//             data:newCourse
//         });


//     }catch(error){
//       console.log("the error while creating the course is ", error); // testing change
//         return res.status(500).json({
//             success:false,
//             message:"something went wrong course cant be created ",
//         });
//     }
// }

exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    console.log("tag", tag)
    console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}



// get all the courses

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({ status: "Published" }, {
      courseName: true,
      thumbnail: true,
      price: true,
      instructor: true,
      ratingAndReview: true,
      studentsEnrolled: true,
    })
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All published courses fetched successfully",
      data: allCourses,
    });

  } catch (error) {
    console.error("Error in showAllCourses:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, courses can't be fetched",
    });
  }
};






// Get all the details of a course not id but populate( actual details)
exports.getCourseDetails = async (req,res) => {
    try{
        // get the course id 
        const {courseId} = req.body;

        // find course detail
        const courseDetails = await Course.findById(courseId)
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    },
                                                }
                                            )
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                },
                                            }).exec();

        // validation
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`could not find the course with given ${courseId}`
            });
        }

        // return response
        return res.status(200).json({
                success:true,
                message:"course details fetched successfully",
                courseDetails,
            });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong , courses cant be fetched"
        });
    }
}












// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    // const updates = req.body
    const updates = { ...req.body }

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      // if (updates.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {

        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}



exports.getFullCourseDetails = async (req, res) => {
  try {
    const courseId = req.body?.courseId || req.query?.courseId;
    const userId = req.user?.id || null;

    console.log(">>> getFullCourseDetails called");
    console.log("Course ID:", courseId);
    console.log("User ID:", userId);

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "title description videoUrl timeDuration",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("Course fetched. sections:", (courseDetails.courseContent || []).length);

    // safely compute completedVideos
    let completedVideos = [];
    if (userId) {
      const enrolledStudent = await User.findById(userId)
        .select("courses coursesProgress")
        .populate({
          path: "coursesProgress",
          match: { courseId },
          select: "completedVideos",
        })
        .exec();

      if (enrolledStudent?.coursesProgress?.length > 0) {
        completedVideos = enrolledStudent.coursesProgress[0].completedVideos || [];
      }
    } else {
      console.log("No userId provided — skipping completed videos lookup.");
    }

    // Calculate total duration (safe)
    let totalDurationInSeconds = 0;
    const content = Array.isArray(courseDetails.courseContent) ? courseDetails.courseContent : [];

    for (const section of content) {
      const subs = Array.isArray(section.subSection) ? section.subSection : [];
      for (const subSec of subs) {
        const t = subSec?.timeDuration;
        if (t == null) continue;

        if (typeof t === "number" || !isNaN(t)) {
          totalDurationInSeconds += Number(t);
        } else if (typeof t === "string") {
          const parts = t.split(":").map(Number);
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            totalDurationInSeconds += parts[0] * 60 + parts[1];
          }
        }
      }
    }

    console.log("Total Duration (seconds):", totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      message: "Full course details fetched successfully",
      data: {
        courseDetails,
        completedVideos,
        totalDuration: totalDurationInSeconds,
      },
    });
  } catch (error) {
    console.error("Error in getFullCourseDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching full course details",
      error: error.message,
    });
  }
};




// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}









// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params; // ✅ use params instead of body

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled || []; // ✅ fixed typo
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent || [];
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection || [];
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
