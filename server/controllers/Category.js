// kisi bhi course ko banane ya post karne se pehle we should always create tag
//  beacuse uss tag ke under ki koi bhi course present hoga
//  jab bhi main course banaunga tab i will update the tag as i also nedd course in my tag

const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// helper to safely escape regex (prevents injection)
const escapeRegExp = (s = "") => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// create category ka handler function

exports.createCategory = async (req,res) => {
    try{

        // fetch data from body
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(403).json({
                success:false,
                message:"all filed are required, it cant be empty",
            });
        }

        // create entry in database
        const  categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        // returning the response
        return res.status(200).json({
            success:true,
            message:" category created succesfully",
        });

    }catch(error){
      console.error("CREATE‑CATEGORY ERROR ➜", error);
        return res.status(500).json({
            success:false,
            message:"something went wrong , category couldnt be created"
        });
    }
}



// get all category handler function


// Controller for GET all categories
// exports.showAllCategories = async (req, res) => {
//   try {
//     const allCategories = await Category.find({}).populate("courses").exec();

//     res.status(200).json({
//       success: true,
//       message: "All categories fetched successfully",
//       data: allCategories,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


exports.showAllCategories = async (req, res) => {
  try {
    console.log("➡️  Incoming request: GET /showAllCategories");

    const allCategories = await Category.find({})
      .populate("courses")
      .exec();

    console.log("✅ Categories found:", allCategories.length);

    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories,
    });

  } catch (error) {
    console.error("❌ showAllCategories ERROR:", error.stack || error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,  // <-- expose reason (temporary)
    });
  }
};



// exports.categoryPageDetails = async (req, res) => {
//   try {
//     // Accept categoryId from body OR query (works for POST or GET)
//     const categoryId = req.body?.categoryId || req.query?.categoryId;
//     console.log("PRINTING CATEGORY ID: ", categoryId);

//     if (!categoryId) {
//       return res.status(400).json({
//         success: false,
//         message: "Category ID is required",
//       });
//     }

//     const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

//     // selectedCategory
//     const selectedCategory = await Category.findById(categoryObjectId).lean().exec();
//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // categoryCourses (published + instructor)
//     const categoryCourses = await Course.find({
//       category: categoryObjectId,
//       status: "Published",
//       instructor: { $ne: null },
//     })
//       .populate("instructor")
//       .lean()
//       .exec();

//     // differentCategory: pick another category and fetch its published courses
//     const differentCategoryDoc = await Category.findOne({
//       _id: { $ne: categoryObjectId },
//     })
//       .lean()
//       .exec();

//     let differentCategory = null;
//     if (differentCategoryDoc) {
//       const differentCategoryCourses = await Course.find({
//         category: differentCategoryDoc._id,
//         status: "Published",
//         instructor: { $ne: null },
//       })
//         .populate("instructor")
//         .lean()
//         .exec();

//       differentCategory = {
//         ...differentCategoryDoc,
//         courses: differentCategoryCourses,
//       };
//     }

//     // top selling: gather published courses with instructor, sort safely, pick top 10
//     const topSellingCoursesRaw = await Course.find({
//       status: "Published",
//       instructor: { $ne: null },
//     })
//       .populate("instructor")
//       .lean()
//       .exec();

//     topSellingCoursesRaw.sort(
//       (a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
//     );

//     const top10Courses = topSellingCoursesRaw.slice(0, 10);

//     // Return keys matching frontend expectations
//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         categoryCourses,
//         differentCategory,      // now includes .courses
//         mostSellingCourses: top10Courses, // <-- name used by your frontend
//       },
//     });
//   } catch (error) {
//     console.log("CATEGORY PAGE DETAILS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     // Accept categoryId from body OR query (works for POST or GET)
//     let categoryIdOrSlug = req.body?.categoryId || req.query?.categoryId;
//     console.log("PRINTING CATEGORY ID/SLUG: ", categoryIdOrSlug);

//     if (!categoryIdOrSlug) {
//       return res.status(400).json({
//         success: false,
//         message: "Category ID (or slug) is required",
//       });
//     }

//     let categoryObjectId = null;

//     // If it's a valid ObjectId, use it
//     if (mongoose.isValidObjectId(categoryIdOrSlug)) {
//       categoryObjectId = new mongoose.Types.ObjectId(categoryIdOrSlug);
//     } else {
//       // Treat as slug / friendly-name: "web-development" -> "web development"
//       // Convert hyphens to spaces and try a case-insensitive exact match.
//       const slugToName = categoryIdOrSlug.replace(/-/g, " ").trim();
//       const safeName = escapeRegExp(slugToName);
//       const categoryDoc = await Category.findOne({
//         name: { $regex: `^${safeName}$`, $options: "i" },
//       })
//         .lean()
//         .exec();

//       if (!categoryDoc) {
//         return res.status(404).json({
//           success: false,
//           message: "Category not found for given id/slug",
//         });
//       }

//       categoryObjectId = categoryDoc._id;
//     }

//     // selectedCategory
//     const selectedCategory = await Category.findById(categoryObjectId).lean().exec();
//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // categoryCourses (published + instructor)
//     const categoryCourses = await Course.find({
//       category: categoryObjectId,
//       status: "Published",
//       instructor: { $ne: null },
//     })
//       .populate("instructor")
//       .lean()
//       .exec();

//     // differentCategory: pick another category and fetch its published courses
//     const differentCategoryDoc = await Category.findOne({
//       _id: { $ne: categoryObjectId },
//     })
//       .lean()
//       .exec();

//     let differentCategory = null;
//     if (differentCategoryDoc) {
//       const differentCategoryCourses = await Course.find({
//         category: differentCategoryDoc._id,
//         status: "Published",
//         instructor: { $ne: null },
//       })
//         .populate("instructor")
//         .lean()
//         .exec();

//       differentCategory = {
//         ...differentCategoryDoc,
//         courses: differentCategoryCourses,
//       };
//     }

//     // top selling: gather published courses with instructor, sort safely, pick top 10
//     const topSellingCoursesRaw = await Course.find({
//       status: "Published",
//       instructor: { $ne: null },
//     })
//       .populate("instructor")
//       .lean()
//       .exec();

//     topSellingCoursesRaw.sort(
//       (a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
//     );

//     const top10Courses = topSellingCoursesRaw.slice(0, 10);

//     // Return keys matching frontend expectations
//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         categoryCourses,
//         differentCategory, // includes .courses
//         mostSellingCourses: top10Courses,
//       },
//     });
//   } catch (error) {
//     console.error("CATEGORY PAGE DETAILS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };



exports.categoryPageDetails = async (req, res) => {
  try {
    // Accept categoryId from body OR query (works for POST or GET)
    let categoryIdOrSlug = req.body?.categoryId || req.query?.categoryId;
    console.log("PRINTING CATEGORY ID/SLUG: ", categoryIdOrSlug);

    if (!categoryIdOrSlug) {
      return res.status(400).json({
        success: false,
        message: "Category ID (or slug) is required",
      });
    }

    let categoryObjectId = null;

    // If it's a valid ObjectId string, use it directly (Mongoose will coerce)
    if (mongoose.isValidObjectId(categoryIdOrSlug)) {
      categoryObjectId = categoryIdOrSlug; // DO NOT call mongoose.Types.ObjectId(...) here
    } else {
      // Treat as slug / friendly-name: "web-development" -> "web development"
      const slugToName = categoryIdOrSlug.replace(/-/g, " ").trim();
      const safeName = escapeRegExp(slugToName);

      const categoryDoc = await Category.findOne({
        name: { $regex: `^${safeName}$`, $options: "i" },
      })
        .lean()
        .exec();

      if (!categoryDoc) {
        return res.status(404).json({
          success: false,
          message: "Category not found for given id/slug",
        });
      }

      categoryObjectId = categoryDoc._id; // this will be either ObjectId or string - both ok
    }

    // selectedCategory
    const selectedCategory = await Category.findById(categoryObjectId).lean().exec();
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // categoryCourses (published + instructor)
    const categoryCourses = await Course.find({
      category: categoryObjectId,
      status: "Published",
      instructor: { $ne: null },
    })
      .populate("instructor")
      .lean()
      .exec();

    // differentCategory: pick another category and fetch its published courses
    const differentCategoryDoc = await Category.findOne({
      _id: { $ne: categoryObjectId },
    })
      .lean()
      .exec();

    let differentCategory = null;
    if (differentCategoryDoc) {
      const differentCategoryCourses = await Course.find({
        category: differentCategoryDoc._id,
        status: "Published",
        instructor: { $ne: null },
      })
        .populate("instructor")
        .lean()
        .exec();

      differentCategory = {
        ...differentCategoryDoc,
        courses: differentCategoryCourses,
      };
    }

    // top selling: gather published courses with instructor, sort safely, pick top 10
    const topSellingCoursesRaw = await Course.find({
      status: "Published",
      instructor: { $ne: null },
    })
      .populate("instructor")
      .lean()
      .exec();

    topSellingCoursesRaw.sort(
      (a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
    );

    const top10Courses = topSellingCoursesRaw.slice(0, 10);

    // Return keys matching frontend expectations
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        categoryCourses,
        differentCategory, // includes .courses
        mostSellingCourses: top10Courses,
      },
    });
  } catch (error) {
    console.error("CATEGORY PAGE DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};