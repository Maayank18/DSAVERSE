// use cloudinary here 
const cloudinary = require("cloudinary").v2;

//  not only image but help in uplaoding file
// we can pass various parameters like file folder height and quality 
exports.uploadImageToCloudinary = async (file,folder,height,quality) => {
    const options = {folder};

    if(height){
        options.height = height;
    }
    
    if(quality){
        options.quality = quality;
    }

    // options.resource_type = "auto";
    if (file.mimetype.startsWith("video")) {
    options.resource_type = "video";
} else {
    options.resource_type = "image";
}


    return await cloudinary.uploader.upload(file.tempFilePath, options);
}