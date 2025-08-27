// // to check validity of token / authentcicity of thr role
// // so that unauthenticated person cant visit unauthenticate route
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

// // auth -> to check the authentication
// exports.auth = async (req,res,next) => {
//     try{
//         // extract token
//         const token = req.cookies.token || req.body.token
//                         || req.header("Authorization").replace("Bearer", "");

//         // if token is missing return the response
//         if(!token){
//             return res.status(401).json({
//                 sucess:false,
//                 message:" the token is missing ",
//             });
//         }

//         // verufy the token
//         try{
//             const decode = jwt.verify(token,process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode; // passing my id in req
//         }catch(error){
//             // verification issue 
//             return res.status(401).json({
//                 success:false,
//                 message:" token is invalid"
//             });
//         }
//         next();
//     }catch(error){
//         return res.status(401).json({
//             success:false,
//             message:" something went wron while validating the token"
//         });
//     }
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    // 1) get token from cookie, body or Authorization header (robustly)
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log("Token from cookie (len):", token?.length);
    } else if (req.body && req.body.token) {
      token = req.body.token;
      console.log("Token from body (len):", token?.length);
    } else {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      console.log("Auth header:", authHeader);
      if (authHeader && typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.split(" ")[1];
        console.log("Token from header (len):", token?.length);
      }
    }

    // 2) missing token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // 3) ensure JWT secret exists (helpful debug)
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment!");
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration: JWT secret not set",
      });
    }

    // 4) verify token
    try {
      const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
      console.log("JWT decoded payload:", decoded);

      // normalize req.user so controllers can rely on consistent fields
      req.user = {
        id: decoded.id || decoded._id || decoded.userId,
        email: decoded.email,
        accountType: decoded.accountType || decoded.role,
        // copy any other fields you need
      };

      return next();
    } catch (verifyErr) {
      console.error("JWT verify error:", verifyErr.name, verifyErr.message);
      return res.status(401).json({
        success: false,
        message: `Token invalid: ${verifyErr.message}`,
      });
    }
  } catch (error) {
    console.error("Auth middleware unexpected error:", error);
    return res.status(500).json({
      success: false,
      message: "Auth middleware error",
    });
  }
};

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