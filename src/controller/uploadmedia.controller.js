
import asyncHandler from '../utils/asyncHandler.js';
import {User} from '../model/user.model.js';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import cloudinary from '../utils/cloudinary.js';



const uploadMedia = asyncHandler(async (req, res,next) => {
    const files = req.files
    const { username } = req.params

    if (!files || files.length === 0 || !username) {
        throw new apiError(400, "No files uploaded");
    }


    const uploadToCloudinary = (file) =>
        new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'user_uploads' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }
            );
            stream.end(file.buffer);
        });

    const urls = await Promise.all(files.map((file) => uploadToCloudinary(file)));

const updatedUser = await User.findOneAndUpdate(
  { username },
  { $push: { uploadedMedia: { $each: urls } } },
  { new: true }
).select('+uploadedMedia');

res.status(200).json(
  new apiResponse(200, updatedUser.uploadedMedia, "Media uploaded successfully", true)
);


})

export {uploadMedia}