// this model will contain all the necessary details for our profile page
// like wht type of data will be stored in our profile page

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({ // testing changes 
    gender:{
        type:String,
        default:"",
        trim:true,
    },
    dateOfBirth:{
        type:Date,
    },
    about:{
        type:String,
        default:"",
        trim:true,
    },
    contactNumber:{
        type:String,
    },
});

module.exports = mongoose.model("Profile",profileSchema);