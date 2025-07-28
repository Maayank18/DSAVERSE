// getting our instance of mongoose
const mongoose = require("mongoose");

// getting our port from our .env file
require("dotenv").config();


// exporting our database so that it could be used in our index.js 
exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }) // now if in case this is successfull send a success response
    .then(() => console.log("DB connected Successfully"))
    .catch((error) => { // incase we caught an error in between
        console.log("connection Failed");
        console.log(error);
        process.exit(1);
    })
}