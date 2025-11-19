// // get our instance of express 
// const express = require("express");
// const app = express();

// const dotenv = require("dotenv");
// dotenv.config();

// // middlewares
// app.use(express.json());

// // fetchin all our routes
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const contactRoutes = require("./routes/Contact");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const {cloudinary, cloudinaryConnect} = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");


// const PORT = process.env.PORT || 4000;

// // database connect
// database.dbConnect();


// app.use(cookieParser());
// // app.use(
// //     cors({
// //         origin:"http://localhost:3000", // front end ki request handler karna
// //         credentials:true,
// //     })
// // )
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000", // for local dev
//       "https://dsaverse.vercel.app" // for deployed frontend
//     ],
//     credentials: true,
//   })
// );


// app.use(
//     fileUpload({
//         useTempFiles:true,
//         tempFileDir:"/tmp",
//     })
// )

// // cloudinary connection
// cloudinaryConnect();

// // routes
// app.use("/api/v1/auth",userRoutes);
// app.use("/api/v1/profile",profileRoutes);
// app.use("/api/v1/payment",paymentRoutes);
// app.use("/api/v1/course",courseRoutes);
// app.use("/api/v1/contact",contactRoutes);

// // default route
// app.get("/", (req,res) => {
//     return res.json({
//         success:true,
//         message:"Your server is up and running ...",
//     });
// })

// // activate the server
// app.listen(PORT, () => {
//     console.log(`app is running at ${PORT}`)
// })

// get our instance of express 

// server/index.js (replace your current file with this)
const express = require("express");
const app = express();
const database = require("./config/database");

const dotenv = require("dotenv");
dotenv.config();

// middlewares
app.use(express.json());

// fetchin all our routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");

const cookieParser = require("cookie-parser");
// const cors = require("cors"); // not used for now
const {cloudinary, cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// database connect
database.dbConnect();

app.use(cookieParser());

/**
 * Build allowed origins:
 * - If FRONTEND_URLS env exists, it should be a comma-separated list of full urls:
 *   e.g. "https://dsaverse-five.vercel.app,https://dsaverse-git-main-....vercel.app"
 * - Otherwise we fall back to sensible defaults for local dev + your known Vercel hosts.
 */
const frontendEnv = (process.env.FRONTEND_URLS || "").trim();
const envOrigins = frontendEnv.length
  ? frontendEnv.split(",").map(s => s.trim()).filter(Boolean)
  : [];

const defaultOrigins = [
  "*",
  "http://localhost:3000",
  "https://dsaverse-five.vercel.app",
  "https://dsaverse-git-main-mayank-gargs-projects-3b98a4f8.vercel.app",
  "https://dsaverse-lqy1v0mu9-mayank-gargs-projects-3b98a4f8.vercel.app",
];

const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

console.log("CORS allowed origins:", allowedOrigins);

/**
 * Minimal CORS middleware (explicit) — avoids using app.options(...) which
 * can sometimes interact unexpectedly with route registration.
 */
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // If no origin (curl, server-to-server), allow
  if (!origin) {
    // Allow basic headers for non-browser clients
    res.header("Access-Control-Allow-Credentials", "true");
    return next();
  }

  if (allowedOrigins.includes(origin)) {
    // Allow this origin
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");
    // Allow common headers and methods (adjust as needed)
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // If this is a preflight request, respond immediately
    if (req.method === "OPTIONS") {
      return res.sendStatus(204); // No Content
    }

    return next();
  } else {
    console.warn("Blocked CORS origin:", origin);
    // For browser clients, respond with 403 (you can also send 204)
    return res.status(403).json({ success: false, message: "CORS origin not allowed" });
  }
});

// file upload
app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
  })
);

// cloudinary connection
cloudinaryConnect();

// routes (unchanged)
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/contact",contactRoutes);

// default route
app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running ...",
    });
})

// activate the server
app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`)
})


