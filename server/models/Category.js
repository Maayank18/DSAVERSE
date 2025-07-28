const mongoose = require("mongoose");

const categorychema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    // course should be an array as a course can be in multiple category
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        // required:true, // may or may not be used testing change 
    },
});

module.exports = mongoose.model("Category",categorychema);