// kisi bhi course ko banane ya post karne se pehle we should always create tag
//  beacuse uss tag ke under ki koi bhi course present hoga
//  jab bhi main course banaunga tab i will update the tag as i also nedd course in my tag

const Category = require("../models/Category");


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

exports.showAllcategory = async (req,res) => {
    try{

    //though i dont have any parameter of finding but name and description should be present
    const allcategory = await Category.find({}, { name: 1, description: 1 });
    // DEBUG CHAANGE 

    // returning the response
        return res.status(200).json({
            success:true,
            message:" All category returned successfully ",
            allcategory,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong , category couldnt be created"
        });
    }
}


// category page details 
exports.categoryPageDetails = async (req, res) => {
    try {

        //  get category id 
        // get couress for specific category ID
        //  validatin
        //  get course for different categories
        //  get top selling courses 
        //  return response

      const { categoryId } = req.body

      console.log("PRINTING CATEGORY ID: ", categoryId);

      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate("courses")
        .exec();
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res.status(404).json({
            success: false,
            message: "Category not found",
         });
      }

      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      const differentCategories = await Category.find({
                                        _id:{$ne:categoryId},                               
      }).populate("courses").exec();

      // ✅ Get top-selling courses (most studentsEnrolled)
    const allCourses = await Course.find({})
      .sort({ studentsEnrolled: -1 }) // This won't work directly
      .exec();

    // We manually sort by length of studentsEnrolled
    const topSellingCourses = await Course.find({})
      .populate("instructor") // optional: populate instructor or category
      .lean();

    topSellingCourses.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length);

    const top10Courses = topSellingCourses.slice(0, 10);

    // ✅ Return everything
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses: top10Courses,
      },
    });
      

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }