// // getting our instance of mongoose
// const mongoose = require("mongoose");

// // getting our port from our .env file
// require("dotenv").config();


// // exporting our database so that it could be used in our index.js 
// exports.dbConnect = () => {
//     mongoose.connect(process.env.DATABASE_URL, {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     }) // now if in case this is successfull send a success response
//     .then(() => console.log("DB connected Successfully"))
//     .catch((error) => { // incase we caught an error in between
//         console.log("connection Failed");
//         console.log(error);
//         process.exit(1);
//     })
// }
// config/database.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not defined");
    return;
  }

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url); // defaults are fine with driver v4+
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:");
    console.error(err);
    // optional: process.exit(1);
  }
};

module.exports = { dbConnect };
