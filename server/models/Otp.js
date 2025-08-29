const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,   // normalize
        index: true,       // speed lookups
    },
    otp:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now, // testing change
        expires:5*60,
    },
});

// a function to send email
// async function sendVerificationEmail( email, otp){
//     try{

//         const mailResponse = await mailSender(email,"verification mail from mayank ",otp);
//         console.log("email send successfully", mailResponse);

//     }catch(error){
//         console.log("error while sending the mail : " , error);
//         throw error;
//     }
// }

// using pre middle ware run before saving
// otpSchema.pre("save", async function(next){
//     await sendVerificationEmail(this.email, this.otp);
// });

module.exports = mongoose.model("OTP",otpSchema);