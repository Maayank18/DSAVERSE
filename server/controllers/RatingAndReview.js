const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");


// create Rating and Review
exports.createRating = async (req,res) => {
    try{
        // get user id 
        // fetch data from req ki body
        // validate the user( if user is enrolled or not) like if course buyed by user then only review 
        // check if user has already reviwed in review collection
        // create the rating if everthing is good
        // update the course model which ever got the rating
        // return response

        const userId = req.user.id;

        const {rating, review, courseId} = req.body;

        const courseDetails = await Course.findOne({_id:courseId, 
                                    studentsEnrolled: {$eleMatch: {$eq:userId}},});

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student not enrolled in course",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
                                                    user:userId,
                                                    course:courseId,
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Already reviewed by user",
            });
        }

        const ratingReview = await RatingAndReview.create({
                                            rating, review,
                                            course:courseId,
                                            user:userId,
        });

        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push:{
                                            ratingAndReview: ratingReview._id,
                                        }
                                    },
                                    {new:true},
        );
        console.log(updatedCourseDetails);

        return res.status(200).json({
                success:true,
                message:"Rating and review created successfully",
            });

    }catch(error){
        return res.status(400).json({
                success:false,
                message:"Rating and review cant be created",
            });
    }
}





// get average rating
exports.getAverageRating = async (req,res) => {
    try{

        // get course id 
        // calculate average rating
        //  return rating

        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null, // sabhi entreis ko ek single group me wrap kar dia
                    averageRating: {$avg : "$rating"},
                },
            },
        ]);

        if(result.length > 0){ // rating mil gyi
            return res.status(200).json({
                success:true,
                averageRating : result[0].averageRating,
            });
        }

        // if no result no review
        return res.status(200).json({
                success:true,
                message:" 0 rating , no one has reviewed it yet",
                averageRating : 0,
            });


    }catch(error){
        return res.status(400).json({
                success:false,
                message:"average rating cant be fecthed",
            });
    }
}



// get all rating and reviews
exports.getAllRatingAndReviews = async (req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName",
                                            })
                                            .exec();
        
        return res.status(200).json({
                success:true,
                message:" fetched successfully ",
                data:allReviews,
            });
        
    }catch(error){
        return res.status(400).json({
                success:false,
                message:" cant be fetched ",
            });
    }
}


// course specific rating and review