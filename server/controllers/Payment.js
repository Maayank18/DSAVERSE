// const { instance } = require("../config/razorpay");
// const Course = require("../models/Course");
// const crypto = require("crypto");
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const mongoose = require("mongoose");
// const {courseEnrollmentEmail} = require("../../server/mails/templates/courseEnrollmentEmail");
// const { paymentSuccessEmail } = require("../../server/mails/templates/paymentSuccessEmail");
// const CourseProgress = require("../models/CourseProgress");

// exports.capturePayment = async (req, res) => {
//   // Normalize the courses array from the request body
//   let courses = req.body.courses || req.body["courses[]"];

//   console.log("DEBUG req.body", req.body);
//   console.log("DEBUG raw courses", courses);

//   // Convert to array if only a single course is passed as string
//   if (typeof courses === "string") {
//     courses = [courses];
//   }

//   // Validate the array
//   if (!Array.isArray(courses) || courses.length === 0) {
//     return res.status(400).json({ 
//       success: false,
//       message: "Please provide at least one course ID." 
//     });
//   }

//   const userId = req.user.id;
//   let total_amount = 0;

//   for (const course_id of courses) {
//     try {
//       const course = await Course.findById(course_id);

//       if (!course) {
//         return res.status(404).json({ 
//           success: false, 
//           message: `Course not found: ${course_id}` 
//         });
//       }

//       const uid = new mongoose.Types.ObjectId(userId);
//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "You are already enrolled in one of the selected courses." 
//         });
//       }

//       total_amount += course.price;
//     } catch (error) {
//       console.error("Error fetching course:", error);
//       return res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   const options = {
//     amount: total_amount * 100, // Razorpay expects amount in paise
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     console.log("Razorpay Payment Response:", paymentResponse);
//     res.json({
//       success: true,
//       message: paymentResponse,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Could not initiate payment order." 
//     });
//   }
// };


// // verify the payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       courses
//     } = req.body;
//     const userId = req.user?.id;

//     // Debug logs
//     console.log("razorpay_order_id:", razorpay_order_id);
//     console.log("razorpay_payment_id:", razorpay_payment_id);
//     console.log("razorpay_signature:", razorpay_signature);
//     console.log("courses:", courses);
//     console.log("userId:", userId);

//     // Validation
//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !courses ||
//       !userId
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing payment details"
//       });
//     }

//     // Generate expected signature
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     console.log("Expected Signature:", expectedSignature);

//     // Compare signatures
//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature"
//       });
//     }

//     // Enroll student
//     await enrollStudents(courses, userId, res);

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified and courses enrolled"
//     });

//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error during payment verification"
//     });
//   }
// };





// // Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }

// // enroll the student in the courses
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }


const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const { courseEnrollmentEmail } = require("../../server/mails/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../../server/mails/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  // Normalize the courses array from the request body
  let courses = req.body.courses || req.body["courses[]"];

  console.log("DEBUG req.body", req.body);
  console.log("DEBUG raw courses", courses);

  // Convert to array if only a single course is passed as string
  if (typeof courses === "string") {
    courses = [courses];
  }

  // Validate the array
  if (!Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one course ID.",
    });
  }

  const userId = req.user.id;
  let total_amount = 0;

  for (const course_id of courses) {
    try {
      const course = await Course.findById(course_id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found: ${course_id}`,
        });
      }

      // Safe check for enrollment whether studentsEnrolled contains ObjectId or string
      const enrolledIds = (course.studentsEnrolled || []).map((id) => String(id));
      if (enrolledIds.includes(String(userId))) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in one of the selected courses.",
        });
      }

      total_amount += course.price;
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const options = {
    amount: total_amount * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("Razorpay Payment Response:", paymentResponse);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Could not initiate payment order.",
    });
  }
};


// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res.status(400).json({ success: false, message: "Could not send email" });
  }
};

// verify the payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;
    const userId = req.user?.id;

    // Debug logs
    console.log("razorpay_order_id:", razorpay_order_id);
    console.log("razorpay_payment_id:", razorpay_payment_id);
    console.log("razorpay_signature:", razorpay_signature);
    console.log("courses:", courses);
    console.log("userId:", userId);

    // Validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // Generate expected signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);

    // Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Enroll student
    await enrollStudents(courses, userId);

    return res.status(200).json({
      success: true,
      message: "Payment verified and courses enrolled",
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
    });
  }
};


// enroll the student in the courses
// enrollStudents.js
const enrollStudents = async (courses, userId) => {
  if (typeof courses === "string") {
    courses = [courses];
  }

  if (!courses || !userId) {
    throw new Error("Please provide Course ID and User ID");
  }

  for (const courseId of courses) {
    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // 1) Add student to course
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseObjectId },
      { $addToSet: { studentsEnrolled: userObjectId } },
      { new: true }
    );

    if (!enrolledCourse) {
      throw new Error("Course not found");
    }

    // 2) Create course progress
    const courseProgress = await CourseProgress.create({
      courseID: courseObjectId,
      userId: userObjectId,
      completedVideos: [],
    });

    // 3) Add to user
    const enrolledStudent = await User.findByIdAndUpdate(
      userObjectId,
      {
        $addToSet: {
          courses: courseObjectId,
          coursesProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    // 4) Send email
    await mailSender(
      enrolledStudent.email,
      `Successfully Enrolled into ${enrolledCourse.courseName}`,
      courseEnrollmentEmail(
        enrolledCourse.courseName,
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
      )
    );
  }
};

// const enrollStudents = async (courses, userId, res) => {
//   // normalize courses to array if string provided
//   if (typeof courses === "string") {
//     courses = [courses];
//   }

//   if (!courses || !userId) {
//     return res.status(400).json({ success: false, message: "Please Provide Course ID and User ID" });
//   }

//   for (const courseId of courses) {
//     try {
//       const courseObjectId = new mongoose.Types.ObjectId(courseId);
//       const userObjectId = new mongoose.Types.ObjectId(userId);

//       // 1) Add student to course (use addToSet to avoid duplicates)
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseObjectId },
//         { $addToSet: { studentsEnrolled: userObjectId } }, // <-- CORRECT FIELD NAME
//         { new: true }
//       );

//       if (!enrolledCourse) {
//         return res.status(500).json({ success: false, error: "Course not found" });
//       }
//       console.log("Updated course: ", enrolledCourse);

//       // 2) Create course progress document (use courseId naming to match populate/match)
//       const courseProgress = await CourseProgress.create({
//         courseId: courseObjectId, // <-- use courseId (not courseID)
//         userId: userObjectId,
//         completedVideos: [],
//       });

//       // 3) Add course & progress ref into user (use $addToSet and correct field name coursesProgress)
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userObjectId,
//         {
//           $addToSet: {
//             courses: courseObjectId,
//             coursesProgress: courseProgress._id, // <-- CORRECT FIELD NAME
//           },
//         },
//         { new: true }
//       );

//       console.log("Enrolled student: ", enrolledStudent);

//       // 4) Send email to user
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       );

//       console.log("Email sent successfully: ", emailResponse?.response || emailResponse);
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ success: false, error: error.message });
//     }
//   }

//   // finished loop
//   return;
// };
