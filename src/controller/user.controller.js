
import asyncHandler from '../utils/asyncHandler.js';
import {User} from '../model/user.model.js';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import cloudinary from '../utils/cloudinary.js';


const createUserAccount = asyncHandler(async (req, res, next) => {
    const {
        username,
        password
    } = req.body;

    if (!username || !password) {
        return next(new apiError(400, "Username and password are required"));
    }

    const user = await User.findOne({
        username: username
    })

    if (user) {
        throw new apiError(400, "Username already exists");  // order statusCode,data,message
    }

    const newUser = User.create({
        username,
        password
    })

    if (!newUser) {
        throw new apiError(500, "Failed to create user account");
    }

    res.status(201).json(new apiResponse(201, null, "User account created successfully", true));
})

const getUserProfile = asyncHandler(async (req, res, next) => {

    const userId = req.body // currently 

    const user = await User.findById(userId).select('uploadedMedia -_id');

    if (!user) {
        throw new apiError(404, "User not found");
    }
    res.status(200).json(new apiResponse(200, user, "User profile fetched successfully", true));
})

const userLogin = asyncHandler(async (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) {
        return next(new apiError(400, "Username and password are required"));
    }
    const user = await User.findOne({ username: username })

    if (!user) {
        throw new apiError(401, "Invalid username or password");
    }

    const isPasswordValid = await user.comparePassword(user.password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid username or password");
    }
    res.status(200).json(new apiResponse(200, user, "User logged in successfully", true));
})

const uploadMedia = asyncHandler(async (req, res) => {
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

const getAllMedia = asyncHandler(async (req, res) => {
        const {username} = req.params 
        const user = await User.findOne({username})
        if(!user){
            throw new apiError(404, "User not found");
        }
        res.status(200).json(new apiResponse(200, user.uploadedMedia, "Media uploaded successfully", true));
})

export {
    createUserAccount,
    getUserProfile,
    userLogin,
    uploadMedia,
    getAllMedia
}





// if we have gone through diskStorage concept 

    // const uploadPromises = files.map(file =>
    //     cloudinary.uploader.upload(file.path, { resource_type: "auto" })     // allows all type of media 
    // );

    // const uploadedMediaUrls = await Promise.all(uploadPromises);

    // files.forEach(file => {
    //     fs.unlink(file.path, err => {
    //         if (err) console.error('Failed to delete temp file:', err);
    //     });
    // });
