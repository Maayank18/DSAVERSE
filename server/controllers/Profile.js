//  the temporary profile is already created we will be doing updation and deletion
const Profile = require("../../server/models/Profile");
const User = require("../../server/models/User");
const {uploadImageToCloudinary} = require("../../server/utils/imageUploader"); // testing changes
const Course = require("../../server/models/Course");
const {convertSecondsToDuration} = require("../../server/utils/secToDuration");
const CourseProgress = require("../../server/models/CourseProgress");



// fetch data 
        // get user id
        // validation
        // find the profile 
        // update the profile
        // return response

// update profile
// exports.updateProfile = async (req, res) => {
//   try {
//     //  testing advice use correct format for date
//     const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
//     const id = req.user.id;

//     if (!contactNumber || !gender || !id) {
//       return res.status(400).json({
//         success: false,
//         message: " All fields are required ",
//       });
//     }

//     console.log("User ID:", id);

//     const userDetails = await User.findById(id);
//     if (!userDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     console.log("User details found:", userDetails);

//     const profileId = userDetails.additionalDetails;
//     const profileDetails = await Profile.findById(profileId);

//     if (!profileDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     console.log("Profile details found:", profileDetails);

//     profileDetails.dateOfBirth = dateOfBirth;
//     profileDetails.about = about;
//     profileDetails.contactNumber = contactNumber;
//     profileDetails.gender = gender;
//     await profileDetails.save();

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       updatedUserDetails: profileDetails,
//     });
//   } catch (error) {
//     console.error("Update Profile Error:", error); // Add this line
//     return res.status(500).json({
//       success: false,
//       message: "Profile updation failed",
//     });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   try {
//     //  testing advice use correct format for date
//     const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
//     const id = req.user.id;

//     if (!contactNumber || !gender || !id) {
//       return res.status(400).json({
//         success: false,
//         message: " All fields are required ",
//       });
//     }

//     console.log("User ID:", id);

//     const userDetails = await User.findById(id);
//     if (!userDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     console.log("User details found:", userDetails);

//     const profileId = userDetails.additionalDetails;
//     const profileDetails = await Profile.findById(profileId);

//     if (!profileDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     console.log("Profile details found:", profileDetails);

//     profileDetails.dateOfBirth = dateOfBirth;
//     profileDetails.about = about;
//     profileDetails.contactNumber = contactNumber;
//     profileDetails.gender = gender;
//     await profileDetails.save();

//     // <-- NEW: return the full user (populated) so client gets firstName/lastName/accountType etc.
//     const updatedUser = await User.findById(id).populate("additionalDetails");

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       updatedUserDetails: updatedUser, // unchanged key name, but now contains full user
//     });
//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Profile updation failed",
//     });
//   }
// };

// controllers/userController.js (or wherever your updateProfile lives)
// exports.updateProfile = async (req, res) => {
//   try {
//     // accept firstName & lastName too (frontend sends them)
//     const {
//       firstName = "",
//       lastName = "",
//       dateOfBirth = "",
//       about = "",
//       contactNumber,
//       gender,
//     } = req.body;

//     const id = req.user?.id;
//     if (!id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     // contactNumber and gender were required in original; keep that validation
//     if (!contactNumber || !gender) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // fetch user
//     const userDetails = await User.findById(id);
//     if (!userDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // update user's top-level fields (if provided)
//     let shouldSaveUser = false;
//     if (firstName && firstName !== userDetails.firstName) {
//       userDetails.firstName = firstName;
//       shouldSaveUser = true;
//     }
//     if (lastName && lastName !== userDetails.lastName) {
//       userDetails.lastName = lastName;
//       shouldSaveUser = true;
//     }

//     // fetch profile document
//     const profileId = userDetails.additionalDetails;
//     const profileDetails = await Profile.findById(profileId);
//     if (!profileDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     // Parse and validate dateOfBirth if provided (expecting "YYYY-MM-DD" from <input type="date">)
//     if (dateOfBirth) {
//       const parsedDob = new Date(dateOfBirth);
//       if (isNaN(parsedDob.getTime())) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid dateOfBirth format. Expected YYYY-MM-DD",
//         });
//       }
//       profileDetails.dateOfBirth = parsedDob;
//     }
//     // update other profile fields
//     profileDetails.about = about ?? profileDetails.about;
//     profileDetails.contactNumber = contactNumber;
//     profileDetails.gender = gender;

//     // save profile (and user if needed)
//     await profileDetails.save();
//     if (shouldSaveUser) await userDetails.save();

//     // return the full user populated with profile so client has everything
//     const updatedUser = await User.findById(id).populate("additionalDetails");

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Profile updation failed",
//     });
//   }
// };

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
    } = req.body;

    const id = req.user?.id;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let shouldSaveUser = false;
    if (firstName && firstName !== userDetails.firstName) {
      userDetails.firstName = firstName;
      shouldSaveUser = true;
    }
    if (lastName && lastName !== userDetails.lastName) {
      userDetails.lastName = lastName;
      shouldSaveUser = true;
    }

    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // --- Robust DOB parsing start ---
    if (dateOfBirth && dateOfBirth.trim() !== "") {
      let parsedDob = new Date(dateOfBirth);

      // If parsing failed (invalid date), try common alternate formats like DD-MM-YYYY or DD/MM/YYYY
      if (isNaN(parsedDob.getTime())) {
        // match DD-MM-YYYY or DD/MM/YYYY (also allow single-digit day/month)
        const ddmmyyyy = dateOfBirth.trim().match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
        if (ddmmyyyy) {
          const dd = ddmmyyyy[1].padStart(2, "0");
          const mm = ddmmyyyy[2].padStart(2, "0");
          const yyyy = ddmmyyyy[3];
          // convert to ISO-like YYYY-MM-DD which Date() parses reliably
          const isoLike = `${yyyy}-${mm}-${dd}`;
          parsedDob = new Date(isoLike);
        }
      }

      // final validation
      if (isNaN(parsedDob.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid dateOfBirth format. Expected YYYY-MM-DD or DD-MM-YYYY etc.",
        });
      }

      profileDetails.dateOfBirth = parsedDob;
    }
    // --- Robust DOB parsing end ---

    profileDetails.about = about ?? profileDetails.about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;

    await profileDetails.save();
    if (shouldSaveUser) await userDetails.save();

    const updatedUser = await User.findById(id).populate("additionalDetails");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Profile updation failed",
    });
  }
};






// Delete ACCOUNT
exports.deleteAccount = async (req,res) => {
    try{
        //  gte id of account 
        //  validation of id 
        // delete profile of user
        // delete user
        // return response

        const id = req.user.id;

        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(403).json({
                success:false,
                message:" User not found ",
            });
        }

        await Profile.findByIdAndUpdate({_id:userDetails.additionalDetails});
        // unenroll the user from all enrolled courses
        // CHRONEJOB
        // schdeuling the deletion

        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:" Deleted successfully ",
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:" profile deletion failed ",
        });
    }
}



// getAll details

exports.getAllUserDetail = async (req,res) => {
    try{
        // get id
        //  validation and get user details
        //  return resposne

        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true, // testing change 
            message:" user details fetched successfully ",
            userDetails,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:" Something went wrong ",
        });
    }
}






// INstructor dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    // Fetch all courses by instructor
    const courseDetails = await Course.find({ instructor: req.user.id });

    // const courseData = courseDetails.map((course) => {
    //   // ✅ Handle missing or undefined studentsEnrolled array
    //   const totalStudentsEnrolled = Array.isArray(course.studentsEnrolled)
    //     ? course.studentsEnrolled.length
    //     : 0;

    //   // ✅ Ensure price is a number (handle string or undefined cases)
    //   const price = typeof course.price === "number" ? course.price : 0;
    //   const totalAmountGenerated = totalStudentsEnrolled * price;

    //   return {
    //     _id: course._id,
    //     courseName: course.courseName,
    //     courseDescription: course.courseDescription,
    //     totalStudentsEnrolled,
    //     totalAmountGenerated,
    //   };
    // });
        const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = Array.isArray(course.studentsEnrolled)
        ? course.studentsEnrolled.length
        : 0;

      const price = Number(course.price) || 0; // ✅ Convert string to number
      const totalAmountGenerated = totalStudentsEnrolled * price;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
    });


    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error("Error in instructorDashboard:", error);
    res.status(500).json({ message: "Could not fetch instructor dashboard data" });
  }
};






// get Enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user with nested course content and subSections
    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    userDetails = userDetails.toObject();

    // Loop through each course
    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let SubsectionLength = 0;

      // Loop through each section in the course
      for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        const subSections =
          userDetails.courses[i].courseContent[j]?.subSection || [];

        // Accumulate total duration
        totalDurationInSeconds += subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0, 10),
          0
        );

        // Count subSections
        SubsectionLength += subSections.length;
      }

      // Convert total seconds into readable duration format
      userDetails.courses[i].totalDuration =
        convertSecondsToDuration(totalDurationInSeconds);

      // Get user's course progress
      const courseProgress = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });

      const completedVideosCount =
        courseProgress?.completedVideos?.length || 0;

      // Calculate progress percentage
      userDetails.courses[i].progressPercentage =
        SubsectionLength === 0
          ? 100
          : Math.round(
              (completedVideosCount / SubsectionLength) * 10000
            ) / 100;
    }

    // Send success response
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });

  } catch (error) {
    console.error("GET_ENROLLED_COURSES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// update display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


