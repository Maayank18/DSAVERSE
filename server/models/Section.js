const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true,
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection",
        }
    ],
    courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Optional: if you want to track which course the section belongs to
  },
});

module.exports = mongoose.model("Section",sectionSchema);