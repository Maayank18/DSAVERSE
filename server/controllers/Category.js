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


// category page details 
// exports.categoryPageDetails = async (req, res) => {
//     try {

//         //  get category id 
//         // get couress for specific category ID
//         //  validatin
//         //  get course for different categories
//         //  get top selling courses 
//         //  return response

//       const { categoryId } = req.body

//       console.log("PRINTING CATEGORY ID: ", categoryId);

//       // Get courses for the specified category
//       const selectedCategory = await Category.findById(categoryId)
//         .populate("courses")
//         .exec();
  
//       //console.log("SELECTED COURSE", selectedCategory)
//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res.status(404).json({
//             success: false,
//             message: "Category not found",
//          });
//       }

//       // Handle the case when there are no courses
//       if (selectedCategory.course.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }
  
//       const differentCategory = await Category.find({
//                                         _id:{$ne:categoryId},                               
//       }).populate("courses").exec();

//       // ✅ Get top-selling courses (most studentsEnrolled)
//     const allCourses = await Course.find({})
//       .sort({ studentsEnrolled: -1 }) // This won't work directly
//       .exec();

//     // We manually sort by length of studentsEnrolled
//     const topSellingCourses = await Course.find({})
//       .populate("instructor") // optional: populate instructor or category
//       .lean();

//     topSellingCourses.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length);

//     const top10Courses = topSellingCourses.slice(0, 10);

//     // ✅ Return everything
//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory: differentCategories[0], // debug change 
//         topSellingCourses: top10Courses,
//       },
//     });
      

//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     // get category id 
//     const { categoryId } = req.body;

//     console.log("PRINTING CATEGORY ID: ", categoryId);

//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate("courses")
//       .exec();

//     // Handle the case when the category is not found
//     if (!selectedCategory) {
//       console.log("Category not found.");
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Handle the case when there are no courses
//     if (selectedCategory.courses.length === 0) {
//       console.log("No courses found for the selected category.");
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       });
//     }

//     const differentCategory = await Category.find({
//       _id: { $ne: categoryId },
//     }).populate("course").exec();

//     // ✅ Get top-selling courses (most studentsEnrolled)
//     const allCourses = await Course.find({})
//       .sort({ studentsEnrolled: -1 }) // This won't work directly
//       .exec();

//     // We manually sort by length of studentsEnrolled
//     const topSellingCourses = await Course.find({})
//       .populate("instructor") // optional: populate instructor or category
//       .lean();

//     topSellingCourses.sort(
//       (a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
//     );

//     const top10Courses = topSellingCourses.slice(0, 10);

//     // ✅ Return everything
//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory: differentCategory[0], // ✅ fixed here
//         topSellingCourses: top10Courses,
//       },
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body;
//     console.log("PRINTING CATEGORY ID: ", categoryId);

//     // ✅ Step 1: Check if category exists
//     const selectedCategory = await Category.findById(categoryId).exec();
//     if (!selectedCategory) {
//       console.log("Category not found.");
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // ✅ Step 2: Get all courses linked to this category
//     const categoryCourses = await Course.find({ category: categoryId })
//       .populate("instructor") // optional: for instructor info
//       .exec();

//     // Handle if no courses found in that category
//     if (categoryCourses.length === 0) {
//       console.log("No courses found for the selected category.");
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       });
//     }

//     // ✅ Step 3: Get different category (for recommendation)
//     const differentCategory = await Category.findOne({ _id: { $ne: categoryId } });

//     // ✅ Step 4: Get top 10 best-selling courses
//     const topSellingCourses = await Course.find({})
//       .populate("instructor") // optionally populate category too
//       .lean();

//     topSellingCourses.sort(
//       (a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
//     );

//     const top10Courses = topSellingCourses.slice(0, 10);

//     // ✅ Step 5: Return everything
//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         categoryCourses, // send the list of courses separately
//         differentCategory,
//         topSellingCourses: top10Courses,
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