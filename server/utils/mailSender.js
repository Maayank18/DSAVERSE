// // use node mailer for sending the mail
// const nodemailer = require("nodemailer");


// // from here we can send our otp to our mail
// const mailSender = async (email, title, body) => {
//     try{
//         let transporter = nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user: process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             }
//         })

//         let info = transporter.sendMail({
//             from:"Mayank",
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`,
//         })

//         console.log(info);
//         return info;

//     }catch(error){
//         console.log(error.message);
//     }
// }

// module.exports = mailSender;

const nodemailer = require("nodemailer");

// from here we can send our otp to our mail
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",   // Gmail SMTP
            port: 465,                // use 465 with secure: true
            secure: true,             
            auth: {
                user: process.env.MAIL_USER, // your Gmail address
                pass: process.env.MAIL_PASS, // your App Password
            },
        });

        let info = await transporter.sendMail({
            from: `"Mayank" <${process.env.MAIL_USER}>`, // must match auth user
            to: email,
            subject: title,
            html: body,
        });

        console.log("✅ Email sent:", info.messageId);
        return info;

    } catch (error) {
        console.log("❌ SEND OTP ERROR:", error.message);
        throw error;
    }
};

module.exports = mailSender;
