const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mails/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");

// capture the payment and initialises the razorpay order
exports.capturePayment = async (req,res) => {
        // get courseID and userID
        // validation
        // valid course id 
        // valid course details
        // user already pay for same course 
        // order creation
        // return response 

        const {course_id} = req.body;
        const userId = req.user.id;

        if(!course_id){
            return res.json({
                success:false,
                message:" please provide a valid course id",
            });
        }

        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    success:false,
                    message:" could not find the course ",
                });
            }

            //  have user already paid for the course
            const userkiId = new mongoose.Types.ObjectId;
            if(course.studentsEnrolled.includes(userkiId)){
                return res.json({
                    success:false,
                    message:" Student is already enrolled ",
                });
            }
        }catch(error){
            return res.json({
                success:false,
                message:" Student is already enrolled ",
            });
        }
        // check for try catch block if necessary


        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{
                course_id: course_id,
                userId,
            }
        }



        try{
            // initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            });

        }catch(error){
            console.log(error);
            return res.json({
                success:false,
                message:"could not intiate the order"
            })
        }

    
}



// Verifying signature of the payment 
exports.verifySignature = async (req,res) => {
    const webhookSecret = "1234567";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    // comapre signature and digest
    if(signature == digest){
        console.log("payment is authorised");

        const {course_id, userId} = req.body.payload.payment.entity.notes; // recheck please

        try{
            //  fulfilling the action
            //  make the student enroll by finding the course

            const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id:course_id},
                                                {$push:{studentsEnrolled:userId}},
                                                {new:true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                });
            }

            //  find the student and add the course in course enrolled in list
            const enrolledStudent = await User.findOneAndUpdate(
                                                    {_id:userId},
                                                    {$push:{courses:course_id}},
                                                    {new:true},
            );
            console.log(enrolledStudent);


            // mailSender banado confirmation wala
            const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        " Congratulation u are onboarded ",
                                        "lakh lakh vadaiya ",
            );
            console.log(emailResponse);

            return res.status(200).json({
                success:true,
                message:"Signature verifeid and course added",
            });

        }catch(error){
            return res.status(500).json({
                success:false,
                message:"course addition failed",
            });
        }
    }
    else{
        return res.status(500).json({
            success:false,
            message:"invalid request",
        });
    }
}



//  send successfuull email
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