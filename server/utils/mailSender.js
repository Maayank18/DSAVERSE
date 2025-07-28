// use node mailer for sending the mail
const nodemailer = require("nodemailer");


// from here we can send our otp to our mail
const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = transporter.sendMail({
            from:"Mayank",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        console.log(info);
        return info;

    }catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;