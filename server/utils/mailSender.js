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

// const nodemailer = require("nodemailer");

// // from here we can send our otp to our mail
// const mailSender = async (email, title, body) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",   // Gmail SMTP
//             port: 465,                // use 465 with secure: true
//             secure: true,             
//             auth: {
//                 user: process.env.MAIL_USER, // your Gmail address
//                 pass: process.env.MAIL_PASS, // your App Password
//             },
//         });

//         let info = await transporter.sendMail({
//             from: `"Mayank" <${process.env.MAIL_USER}>`, // must match auth user
//             to: email,
//             subject: title,
//             html: body,
//         });

//         console.log("✅ Email sent:", info.messageId);
//         return info;

//     } catch (error) {
//         console.log("❌ SEND OTP ERROR:", error.message);
//         throw error;
//     }
// };

// module.exports = mailSender;



// utils/mailSender.js
const nodemailer = require("nodemailer");

let transporter;

function initTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // verify once on init to surface auth/config issues early
  transporter.verify()
    .then(() => console.log("✅ SMTP transporter verified and ready"))
    .catch((err) => console.error("❌ SMTP verify failed:", err && err.message ? err.message : err));

  return transporter;
}

const mailSender = async (email, title, body) => {
  try {
    const t = initTransporter();

    const info = await t.sendMail({
      from: `"DSAverse" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email send attempted:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return info;
  } catch (error) {
    console.error("❌ SEND OTP ERROR (mailSender):", error && error.message ? error.message : error);
    throw error;
  }
};

module.exports = mailSender;
