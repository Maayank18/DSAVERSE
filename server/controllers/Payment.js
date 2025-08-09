// const {instance} = require("../config/razorpay");
// const Course = require("../models/Course");
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const {courseEnrollmentEmail} = require("../mails/templates/courseEnrollmentEmail");
// const mongoose = require("mongoose");

// // capture the payment and initialises the razorpay order
// exports.capturePayment = async (req,res) => {
//         // get courseID and userID
//         // validation
//         // valid course id 
//         // valid course details
//         // user already pay for same course 
//         // order creation
//         // return response 

//         const {course_id} = req.body;
//         const userId = req.user.id;

//         if(!course_id){
//             return res.json({
//                 success:false,
//                 message:" please provide a valid course id",
//             });
//         }

//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.json({
//                     success:false,
//                     message:" could not find the course ",
//                 });
//             }

//             //  have user already paid for the course
//             const userkiId = new mongoose.Types.ObjectId;
//             if(course.studentsEnrolled.includes(userkiId)){
//                 return res.json({
//                     success:false,
//                     message:" Student is already enrolled ",
//                 });
//             }
//         }catch(error){
//             return res.json({
//                 success:false,
//                 message:" Student is already enrolled ",
//             });
//         }
//         // check for try catch block if necessary


//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt : Math.random(Date.now()).toString(),
//             notes:{
//                 course_id: course_id,
//                 userId,
//             }
//         }



//         try{
//             // initiate payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//             });

//         }catch(error){
//             console.log(error);
//             return res.json({
//                 success:false,
//                 message:"could not intiate the order"
//             })
//         }

    
// }



// // Verifying signature of the payment 
// exports.verifySignature = async (req,res) => {
//     const webhookSecret = "1234567";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     // comapre signature and digest
//     if(signature == digest){
//         console.log("payment is authorised");

//         const {course_id, userId} = req.body.payload.payment.entity.notes; // recheck please

//         try{
//             //  fulfilling the action
//             //  make the student enroll by finding the course

//             const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id:course_id},
//                                                 {$push:{studentsEnrolled:userId}},
//                                                 {new:true},
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//             }

//             //  find the student and add the course in course enrolled in list
//             const enrolledStudent = await User.findOneAndUpdate(
//                                                     {_id:userId},
//                                                     {$push:{courses:course_id}},
//                                                     {new:true},
//             );
//             console.log(enrolledStudent);


//             // mailSender banado confirmation wala
//             const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         " Congratulation u are onboarded ",
//                                         "lakh lakh vadaiya ",
//             );
//             console.log(emailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verifeid and course added",
//             });

//         }catch(error){
//             return res.status(500).json({
//                 success:false,
//                 message:"course addition failed",
//             });
//         }
//     }
//     else{
//         return res.status(500).json({
//             success:false,
//             message:"invalid request",
//         });
//     }
// }



// //  send successfuull email
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

const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const {courseEnrollmentEmail} = require("../../server/mails/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../../server/mails/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   const courses = req.body.courses || req.body["courses[]"];
//   const userId = req.user.id;

//   console.log("DEBUG req.body", req.body);
//   console.log("DEBUG courses", courses);


//   if (courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   // Check if courses is missing or not an array
//   if (!Array.isArray(courses) || courses.length === 0) {
//     return res.json({ 
//       success: false,
//       message: "Please provide at least one course ID." 
//     });
//   }


//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Could not find the Course" })
//       }

//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnrolled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }

//   const options = {
//     amount: total_amount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   }

//   try {
//     // Initiate the payment using Razorpay
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)
//     res.json({
//       success: true,
//       data: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }

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
      message: "Please provide at least one course ID." 
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
          message: `Course not found: ${course_id}` 
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({ 
          success: false, 
          message: "You are already enrolled in one of the selected courses." 
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
      message: "Could not initiate payment order." 
    });
  }
};


// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses
  const userId = req.user.id

  console.log("razor pay order id ", razorpay_order_id);
  console.log("razor pay payment id ", razorpay_payment_id);
  console.log("razorpay signature" ,razorpay_signature);
  console.log("razorpay courses", courses);
  console.log("razorpay", userId);

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  console.log("expected signature", expectedSignature);

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}





// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}