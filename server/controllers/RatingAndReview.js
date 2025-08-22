const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");

const mongoose = require("mongoose");


// create Rating and Review
// get user id 
// fetch data from req ki body
// validate the user( if user is enrolled or not) like if course buyed by user then only review 
// check if user has already reviwed in review collection
// create the rating if everthing is good
// update the course model which ever got the rating
// return response


// exports.createRating = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { rating, review, courseId } = req.body;

//     console.log("=== CREATE RATING DEBUG START ===");
//     console.log("[server] Incoming User:", userId);
//     console.log("[server] Incoming CourseId:", courseId);

//     // Validate courseId format
//     if (!mongoose.Types.ObjectId.isValid(courseId)) {
//       console.error("[server] Invalid courseId format");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid courseId",
//       });
//     }

//     // Validate rating and review
//     if (!rating || rating < 1 || rating > 5) {
//       console.error("[server] Rating invalid:", rating);
//       return res.status(400).json({
//         success: false,
//         message: "Rating must be between 1 and 5",
//       });
//     }
//     if (!review || review.trim().length === 0) {
//       console.error("[server] Review is empty");
//       return res.status(400).json({
//         success: false,
//         message: "Review text is required",
//       });
//     }

//     const userObjId = mongoose.Types.ObjectId.isValid(userId)
//       ? new mongoose.Types.ObjectId(userId)
//       : userId;

//     // Step 1: Check if course exists at all
//     const rawCourse = await Course.findById(courseId).lean();
//     console.log("[server] Raw course fetch:", rawCourse ? "FOUND" : "NOT FOUND");

//     if (rawCourse) {
//       console.log("[server] Raw course _id:", rawCourse._id);
//       console.log("[server] Raw course studentsEnrolled:", rawCourse.studentsEnrolled);
//     }

//     // Step 2: Check enrollment specifically
//     const courseDetails = await Course.findOne({
//       _id: new mongoose.Types.ObjectId(courseId),
//       studentsEnrolled: { $elemMatch: { $eq: userObjId } }
//     });

//     console.log("[server] Course found for enrollment check:", courseDetails ? "FOUND" : "NULL");
//     console.log("[server] Students enrolled (raw):", courseDetails?.studentsEnrolled);

//     if (!courseDetails) {
//       console.error("[server] Enrollment check failed: User not in course");
//       return res.status(404).json({
//         success: false,
//         message: "Student not enrolled in course",
//       });
//     }

//     // Step 3: Check if already reviewed
//     const alreadyReviewed = await RatingAndReview.findOne({
//       user: userObjId,
//       course: new mongoose.Types.ObjectId(courseId),
//     });

//     if (alreadyReviewed) {
//       console.error("[server] Already reviewed by user");
//       return res.status(403).json({
//         success: false,
//         message: "Already reviewed by user",
//       });
//     }

//     // Step 4: Create new rating and review
//     const ratingReview = await RatingAndReview.create({
//       rating,
//       review,
//       course: new mongoose.Types.ObjectId(courseId),
//       user: userObjId,
//     });

//     // Step 5: Push review into course
//     const updatedCourseDetails = await Course.findByIdAndUpdate(
//       courseId,
//       { $push: { ratingAndReview: ratingReview._id } },
//       { new: true }
//     );

//     console.log("[server] Updated course details with new review:", updatedCourseDetails?._id);
//     console.log("=== CREATE RATING DEBUG END ===");

//     return res.status(200).json({
//       success: true,
//       message: "Rating and review created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating rating and review:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Rating and review can't be created",
//     });
//   }
// };


exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    console.log("=== CREATE RATING DEBUG START ===");
    console.log("[server] Incoming User:", userId);
    console.log("[server] Incoming CourseId:", courseId);

    // Validate courseId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      console.error("[server] Invalid courseId format");
      return res.status(400).json({
        success: false,
        message: "Invalid courseId",
      });
    }

    // Validate rating and review
    if (!rating || rating < 1 || rating > 5) {
      console.error("[server] Rating invalid:", rating);
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }
    if (!review || review.trim().length === 0) {
      console.error("[server] Review is empty");
      return res.status(400).json({
        success: false,
        message: "Review text is required",
      });
    }

    const userObjId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    // Step 1: Check if course exists at all
    const rawCourse = await Course.findById(courseId).lean();
    console.log("[server] Raw course fetch:", rawCourse ? "FOUND" : "NOT FOUND");

    if (rawCourse) {
      console.log("[server] Raw course _id:", rawCourse._id);
      console.log("[server] Raw course studentsEnrolled:", rawCourse.studentsEnrolled);
    } else {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Step 2: Robust enrollment check
    // Try Course.studentsEnrolled (works for ObjectId or string)
    const courseDetails = await Course.findOne({
      _id: new mongoose.Types.ObjectId(courseId),
      studentsEnrolled: { $in: [userObjId, String(userId)] },
    }).lean();

    console.log("[server] Course found for enrollment check (course collection):", courseDetails ? "FOUND" : "NULL");

    let enrolled = Boolean(courseDetails);

    // If not found in Course.studentsEnrolled, fallback to checking User.courses
    if (!enrolled) {
      const userRecord = await User.findById(userId).select("courses").lean();
      const enrolledInUser = userRecord?.courses?.some((c) => String(c) === String(courseId));
      console.log("[server] Enrollment check in user.courses:", enrolledInUser ? "FOUND" : "NULL");

      if (!enrolledInUser) {
        console.error("[server] Enrollment check failed: User not in course (both sources)");
        return res.status(404).json({
          success: false,
          message: "Student not enrolled in course",
        });
      }

      // Backfill Course.studentsEnrolled so future checks pass reliably
      try {
        await Course.findByIdAndUpdate(
          courseId,
          { $addToSet: { studentsEnrolled: mongoose.Types.ObjectId(userId) } },
          { new: true }
        );
        console.log("[server] Backfilled course.studentsEnrolled for user:", userId);
        enrolled = true;
      } catch (bfError) {
        console.error("[server] Failed to backfill course.studentsEnrolled:", bfError);
        // still allow the flow to continue since user is enrolled per User.courses
        enrolled = true;
      }
    }

    // Step 3: Check if already reviewed
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userObjId,
      course: new mongoose.Types.ObjectId(courseId),
    });

    if (alreadyReviewed) {
      console.error("[server] Already reviewed by user");
      return res.status(403).json({
        success: false,
        message: "Already reviewed by user",
      });
    }

    // Step 4: Create new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: new mongoose.Types.ObjectId(courseId),
      user: userObjId,
    });

    // Step 5: Push review into course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      { $push: { ratingAndReview: ratingReview._id } },
      { new: true }
    );

    console.log("[server] Updated course details with new review:", updatedCourseDetails?._id);
    console.log("=== CREATE RATING DEBUG END ===");

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (error) {
    console.error("Error creating rating and review:", error);
    return res.status(500).json({
      success: false,
      message: "Rating and review can't be created",
    });
  }
};





// get average rating
exports.getAverageRating = async (req,res) => {
    try{

        // get course id 
        // calculate average rating
        //  return rating

        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null, // sabhi entreis ko ek single group me wrap kar dia
                    averageRating: {$avg : "$rating"},
                },
            },
        ]);

        if(result.length > 0){ // rating mil gyi
            return res.status(200).json({
                success:true,
                averageRating : result[0].averageRating,
            });
        }

        // if no result no review
        return res.status(200).json({
                success:true,
                message:" 0 rating , no one has reviewed it yet",
                averageRating : 0,
            });


    }catch(error){
        return res.status(400).json({
                success:false,
                message:"average rating cant be fecthed",
            });
    }
}



// get all rating and reviews
exports.getAllRatingAndReviews = async (req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName",
                                            })
                                            .exec();
        
        return res.status(200).json({
                success:true,
                message:" fetched successfully ",
                data:allReviews,
            });
        
    }catch(error){
      console.log("the error fetched is ", error);
        return res.status(400).json({
                success:false,
                message:" cant be fetched ",
            });
    }
}


// course specific rating and review