const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // check if reference should be of the instructor
        // required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true,
    },
    courseContent:[ // section ki id is being stored here
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:String,
        required:true,
        trim:true,
    },
    thumbnail:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    tag:{
        type:[String],
        required:true,
        trim:true,
    },
    instructions:{
        type: [String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },


});

module.exports = mongoose.model("Course",courseSchema);