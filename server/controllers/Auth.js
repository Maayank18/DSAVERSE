// 1.sabse pehle otp send hoga and then tumhara sign up hoga and then login hoga

const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator"); // testing changes 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// sendOTP ( sign up wala page )
// -> check user exist or not -> yes return yes and if no ->actual otp generate
// -> that should be unique -> storing otp in db and send the response

exports.sendOTP = async (req, res) => {
  try {
    // ✅ fetch email and checkUserPresent flag from body
    const { email, checkUserPresent } = req.body;

    // ✅ check if user exists
    const checkUserExist = await User.findOne({ email });

    // ✅ block or allow based on checkUserPresent logic
    if (checkUserPresent && checkUserExist) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // if (!checkUserPresent && !checkUserExist) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "User not found",
    //   });
    // }

    // ✅ generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated is : ", otp);

    // ✅ ensure OTP is unique in the DB
    let result = await OTP.findOne({ otp:otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp:otp }); // checking
    }

    // ✅ save OTP in DB
    const otpPayload = { email, otp };
    const otpEntry = await OTP.create(otpPayload);
    console.log("OTP saved in DB:", otpEntry);

    // ✅ return success
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp, // remove this in production
    });
  } catch (error) {
    console.log("SEND OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// exports.sendOTP = async (req, res) => {
//   try {
//     const { email, checkUserPresent } = req.body;
//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     // normalize email to avoid case/space mismatch
//     const normalizedEmail = String(email).trim().toLowerCase();

//     // check user exists if required
//     const checkUserExist = await User.findOne({ email: normalizedEmail });
//     if (checkUserPresent && checkUserExist) {
//       return res.status(401).json({ success: false, message: "User already exists" });
//     }

//     // cooldown: don't create a new OTP if one was created recently
//     const COOLDOWN_MS = 30 * 1000; // 30 seconds (adjust as needed)
//     const recentOtp = await OTP.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });

//     if (recentOtp) {
//       const age = Date.now() - new Date(recentOtp.createdAt).getTime();
//       if (age < COOLDOWN_MS) {
//         console.log(`Reusing recent OTP for ${normalizedEmail}, age=${age}ms`);
//         // For development you could send the OTP back; in production DO NOT return otp
//         return res.status(200).json({
//           success: true,
//           message: "OTP already sent recently. Please wait before requesting another.",
//           // otp: recentOtp.otp  // do NOT return OTP in production
//         });
//       }
//     }

//     // generate new OTP
//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });
//     console.log("Generated OTP:", otp);

//     // optional: ensure uniqueness across DB if you must (not strictly necessary)
//     // You can skip the uniqueness loop — collisions are rare for 6-digit numbers.
//     let duplicate = await OTP.findOne({ otp });
//     while (duplicate) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       });
//       duplicate = await OTP.findOne({ otp });
//     }

//     // upsert a single OTP document per email (overwrite existing or create new)
//     const otpEntry = await OTP.findOneAndUpdate(
//       { email: normalizedEmail },
//       { $set: { otp, createdAt: new Date() } },
//       { upsert: true, new: true }
//     );

//     console.log("OTP upserted in DB:", otpEntry);

//     // send email logic here (not shown)
//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       // otp // remove in production
//     });
//   } catch (error) {
//     console.log("SEND OTP ERROR:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



// controllers/authController.js (replace sendOTP with this)
// exports.sendOTP = async (req, res) => {
//   try {
//     const { email, checkUserPresent } = req.body;
//     if (!email) return res.status(400).json({ success:false, message:"Email is required" });

//     const normalizedEmail = String(email).trim().toLowerCase();

//     // optional: check existing user
//     const checkUserExist = await User.findOne({ email: normalizedEmail });
//     if (checkUserPresent && checkUserExist) {
//       return res.status(401).json({ success:false, message:"User already exists" });
//     }

//     // cooldown (30s)
//     const COOLDOWN_MS = 30 * 1000;
//     const recentOtp = await OTP.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
//     if (recentOtp) {
//       const age = Date.now() - new Date(recentOtp.createdAt).getTime();
//       if (age < COOLDOWN_MS) {
//         return res.status(200).json({
//           success: true,
//           message: "OTP already sent recently",
//           ...(process.env.NODE_ENV !== "production" ? { otp: recentOtp.otp } : {})
//         });
//       }
//     }

//     // generate OTP
//     let otp = otpGenerator.generate(6, { upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false });

//     // optional collision avoidance
//     while (await OTP.findOne({ otp })) {
//       otp = otpGenerator.generate(6, { upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false });
//     }

//     // upsert OTP doc
//     const otpEntry = await OTP.findOneAndUpdate(
//       { email: normalizedEmail },
//       { $set: { otp, createdAt: new Date() } },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     console.log("[sendOTP] OTP upserted:", otpEntry._id);

//     // === SEND EMAIL EXPLICITLY HERE ===
//     try {
//       const mailResponse = await mailSender(normalizedEmail, "Your verification code", `Your OTP is: ${otp}`);
//       console.log("[sendOTP] mailResponse:", mailResponse);
//       // success response (in dev include otp)
//       return res.status(200).json({
//         success: true,
//         message: "OTP sent successfully",
//         ...(process.env.NODE_ENV !== "production" ? { otp } : {})
//       });
//     } catch (mailErr) {
//       console.error("[sendOTP] mail send failed:", mailErr);
//       // rollback OTP so DB doesn't contain an undelivered OTP
//       await OTP.deleteOne({ _id: otpEntry._id }).catch(() => {});
//       return res.status(500).json({ success: false, message: "Failed to send OTP email" });
//     }
//   } catch (err) {
//     console.error("[sendOTP] ERROR:", err);
//     return res.status(500).json({ success:false, message: err.message });
//   }
// };







// signup
exports.signup = async (req,res) => {
    try{
        // data fetch from req ki body
        // validate the data
        // 2 password aaye hai password and ek confirm password match both
        // check if user exits or not 
        // if everthing good find recent otp for the user
        // then validate the otp
        // hash kardo password kp
        // entry create kardo database mein
        // return karo response

        // stepwise implementation

        const {firstName, lastName,email,password,confirmPassword,otp,
            accountType, contactNumber 
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success:false,
                message:" All fields are required ",
            });
        }

        if( password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:" Password and confirm password value doesnt match",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:" the user is already existing ",
            });
        }

        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp is : ", recentOtp);

        if(!recentOtp){ // testing changes 
            return res.status(400).json({
                success:false,
                message:" the otp is not valid/  not found",
            });
        }if (String(recentOtp.otp) !== String(otp)) {
          return res.status(400).json({
            success: false,
            message: "Invalid OTP",
          });
        }


        const hashedPassword  = await bcrypt.hash(password,10);

        const profileDetails = await Profile.create({ // testing chnages 
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName, lastName, email, contactNumber, password:hashedPassword, accountType,
            additionalDetails:profileDetails._id, 
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
            // user ke first name and lastname ke first letter as profile
        })

        return res.status(200).json({
            success:true,
            message: " User successfully created",
            user,
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
} 







// login
// signup
exports.login = async (req,res) => {
    try{
        // get data from req body
        // validate the data 
        // check if user is registered or not or doest it exist 
        // match the password
        // generate a token jwt
        // create cookie
        // send response

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:" password or email is empty  ",
            });
        }

        // population may or may not necessary
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:" not registered user ",
            });
        }

        // if password sahi hai then ek token generate karwado
        // testing change 
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({
                email: user.email, id:user._id, accountType : user.accountType
            },
            process.env.JWT_SECRET,{
                expiresIn:"24h",
            }
        );

            // user mein ek token banado and add kardo created token usme 
            user.token = token;
            user.password = undefined;

            const options = { 
                // expre the cookie in 3 days 
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:" Logged in successfully ",
            });

        }else{
            return res.status(400).json({
                success:false,
                message:" password is incorrect ",
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure",
        });
    }
}
// change Password

exports.changePassword = async (req, res) => {
  try {

        // get data from req body
        // get oldpassword, newpassword, confirm new password 
        // validation ( macth password , empty data )
        // ipdate password in database 
        // send mail for password updated
        // send response
    const { currentPassword, newPassword } = req.body;

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Find user
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check current password
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Hash and update new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    // Return success
    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {
    console.error("Change Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing the password.",
    });
  }
};
