const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");



// reset password token -> mail send karne wala kaam ye karenge taaki generated 
// link pe jaake hm reset kar sake  
exports.resetpasswordtoken = async (req,res) => {
    // get email from request body
    // check user for this email and email validation
    // (generate token) -> with expiry time add it to user model
    //  update user by adding token adn expiry time
    //  create a url
    //  send the mail containing the url
    // return resposne
    try{

        const email = req.body.email; // without destructuring

        const user = await User.findOne({email:email});

        if(!user){
            return res.json({
                success:false,
                messag:"Your email is not registered",
            });
        }

        // testing change
        const token = crypto.randomBytes(32).toString("hex"); // wider compatability 

        // const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate({email:email},{
            token:token,
            resetPasswordExpires: Date.now() + 5*60*1000, // 5 mins
        }, {new:true});

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email,"Password Reset Link",`Password Reset Link, ${url}` );

        return res.json({
            success:true,
            message:"Email sent succssfully , please check mail and update your password",
        });

    }catch(error){
        console.error("RESET‑PASSWORD‑TOKEN ERROR ➜", error); // testing chnage 
        return res.status(500).json({
            success:false,
            message:" password token updation failed, something went wrong ",
        });
    }
}




// reset password jo db me change karna hai vo ye karenge 

exports.resetpassword = async (req,res) => {
    // fetch the data from req 
    // validation of data
    // get user detail from database using token
    //  if no entry -> invalid token or time expires
    //  hash the password 
    // update the password 
    // return the response
    try{

        const {password,confirmPassword,token} = req.body;

        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:" Password doesnt match ",
            });
        }

        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.status(403).json({
                success:false,
                message:" Invalid token  ",
            });
        }

        // token expiry time check
        if( userDetails.resetPasswordExpires < Date.now() ){
            return res.status(403).json({
                success:false,
                message:" The token has been expired, please regenrate your token ",
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:" password changed scueessfully ",
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:" password updation failed, something went wrong ",
        });
    }
}