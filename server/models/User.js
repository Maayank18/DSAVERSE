// Models generally refers to the schema or we can say the type of data 
// a layout of data it would be storing in it 

// we require mongoose as we need mongoose.schema for structure of our document
const mongoose = require("mongoose");

// creating our user schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true, // automatically remove whitespace start and end
    },
    lastName:{
        type:String,
        required:true,
        trim:true, 
    },
    email:{
        type:String,
        required:true,
        trim:true, 
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{ // admin, student, instructor
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId, // reference to whole new schema in Profile model
        required:true,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Courses",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    coursesProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],
    
});

module.exports = mongoose.model("User",userSchema);