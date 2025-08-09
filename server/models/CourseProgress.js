// const mongoose = require("mongoose");

// const courseprogressSchema = new mongoose.Schema({
//     courseID:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Course",
//     },
//     completedVideos:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"SubSection"
//         }
//     ]
// });

// module.exports = mongoose.model("CourseProgress",courseprogressSchema);

const mongoose = require("mongoose");

const courseprogressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

// optional: compound index so one doc per user+course
courseprogressSchema.index({ userId: 1, courseID: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress", courseprogressSchema);
