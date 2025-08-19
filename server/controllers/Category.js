// kisi bhi course ko banane ya post karne se pehle we should always create tag
//  beacuse uss tag ke under ki koi bhi course present hoga
//  jab bhi main course banaunga tab i will update the tag as i also nedd course in my tag

const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose = require("mongoose");


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

// exports.showAllcategory = async (req,res) => {
//     try{

//     //though i dont have any parameter of finding but name and description should be present
//     const allcategory = await Category.find({}, { name: 1, description: 1 });
//     // DEBUG CHAANGE 

//     // returning the response
//         return res.status(200).json({
//             success:true,
//             message:" All category returned successfully ",
//             allcategory,
//         });

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"something went wrong , category couldnt be created"
//         });
//     }
// }


// Controller for GET all categories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}).populate("courses").exec();

    res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);

    // Validate input
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    // ✅ Step 1: Check if category exists
    const selectedCategory = await Category.findById(categoryObjectId).exec();
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // ✅ Step 2: Get only valid courses linked to this category
    const categoryCourses = await Course.find({
      category: categoryObjectId,
      status: "Published",
      instructor: { $ne: null },
    })
      .populate("instructor")
      .exec();

    if (categoryCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No published courses found in this category.",
      });
    }

    // ✅ Step 3: Get a different category (for recommendations)
    const differentCategory = await Category.findOne({
      _id: { $ne: categoryObjectId },
    }).exec();

    // ✅ Step 4: Top 10 best-selling courses (with instructor)
    const topSellingCourses = await Course.find({
      status: "Published",
      instructor: { $ne: null },
    })
      .populate("instructor")
      .lean();

    topSellingCourses.sort(
      (a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
    );
    const top10Courses = topSellingCourses.slice(0, 10);

    // ✅ Step 5: Send response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        categoryCourses,
        differentCategory,
        topSellingCourses: top10Courses,
      },
    });
  } catch (error) {
    console.log("CATEGORY PAGE DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// exports.deleteCategory = async (req, res) => {
//   const { categoryId } = req.params;
//   const action = (req.query.action || "").toLowerCase(); // "", "unset", "delete"

//   try {
//     // 1) Admin guard - expects req.user to be populated by auth middleware
//     if (!req.user || req.user.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admins only.",
//       });
//     }

//     // 2) Validate input
//     if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid categoryId is required.",
//       });
//     }

//     const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

//     // 3) Check category exists
//     const category = await Category.findById(categoryObjectId).exec();
//     if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found.",
//       });
//     }

//     // 4) Count courses tied to this category
//     const coursesCount = await Course.countDocuments({ category: categoryObjectId });

//     // 5) If there are courses and action not specified, refuse deletion
//     if (coursesCount > 0 && action === "") {
//       return res.status(400).json({
//         success: false,
//         message:
//           `Category has ${coursesCount} course(s). ` +
//           `Provide query ?action=unset to disassociate category from courses OR ?action=delete to remove those courses.`,
//         coursesCount,
//       });
//     }

//     // 6) Start transaction to ensure atomicity
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       if (action === "unset") {
//         // disassociate category but keep courses
//         await Course.updateMany(
//           { category: categoryObjectId },
//           { $unset: { category: "" } },
//           { session }
//         );
//       } else if (action === "delete") {
//         // delete all courses under that category
//         await Course.deleteMany({ category: categoryObjectId }, { session });
//         // NOTE: if courses have related files (cloudinary, etc.) you should delete those first
//       }

//       // finally delete the category document
//       await Category.deleteOne({ _id: categoryObjectId }, { session });

//       await session.commitTransaction();
//       session.endSession();

//       return res.status(200).json({
//         success: true,
//         message: "Category deleted successfully.",
//         deletedCategoryId: categoryId,
//         affectedCourses: coursesCount,
//         actionTaken: action || "refused-if-courses-present",
//       });
//     } catch (err) {
//       await session.abortTransaction();
//       session.endSession();
//       console.error("DELETE CATEGORY TX ERROR:", err);
//       return res.status(500).json({ success: false, message: "Transaction failed" });
//     }
//   } catch (error) {
//     console.error("DELETE CATEGORY ERROR:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };