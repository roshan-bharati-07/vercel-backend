import QRCode from 'qrcode';
import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';

const generateQR = asyncHandler(async(req,res,next) => {
  const {username} = req.body;

  if(!username){
   throw new apiError(400, "Username is required")
  }

  // no need to check in DB whether user exist or not 
  const endpoint = `https://vercel-backend-nu-rust.vercel.app/user/media/${encodeURIComponent(username)}`

  const qrDataUrl = await QRCode.toDataURL(endpoint)
   
  return res.status(200).json(new apiResponse(200, qrDataUrl, "QR code generated successfully", true));
})

export {generateQR}