// to check validity of token / authentcicity of thr role
// so that unauthenticated person cant visit unauthenticate route
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth -> to check the authentication
exports.auth = async (req,res,next) => {
    try{
        // extract token
        const token = req.cookies.token || req.body.token
                        || req.header("Authorisation").replace("Bearer", "");

        // if token is missing return the response
        if(!token){
            return res.status(401).json({
                sucess:false,
                message:" the token is missing ",
            });
        }

        // verufy the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode; // passing my id in req
        }catch(error){
            // verification issue 
            return res.status(401).json({
                success:false,
                message:" token is invalid"
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:" something went wron while validating the token"
        });
    }
}

// isStudent
exports.isStudent = async (req,res,next) => {
    try{
        // data already exits with us 
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:" Protected Routes for student only "
            });
        }

        // testing change 
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:" User role cannot be verified "
        });
    }
}


// isInstructor

exports.isinstructor = async (req,res,next) => {
    try{
        // data already exits with us 
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:" Protected Routes for Instructor only "
            });
        }

        next(); // testing change 

    }catch(error){
        return res.status(500).json({
            success:false,
            message:" User role cannot be verified "
        });
    }
}


// isAdmin

exports.isAdmin = async (req,res,next) => {
    try{
        // data already exits with us 

        // while testing 
        // req.user.accountType is undefined
        console.log("printing account type",req.user.accountType);
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:" Protected Routes for Admin only "
            });
        }

        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:" User role cannot be verified "
        });
    }
}