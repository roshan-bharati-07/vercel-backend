// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  

//   const fileFilter = (req,file,cb) => {
//       const allowedMimeTypes = [
//     'image/jpeg',
//     'image/png',
//     'audio/mpeg',    
//     'video/mp4',
//     'video/mpeg'
//   ];
  
//     if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('❌ Invalid file type. Only images, mp3, and videos are allowed.'));
//   }

//   }
// export const upload = multer({ 
//     storage, fileFilter
// })


import multer from 'multer';

const storage = multer.memoryStorage(); 
export const upload = multer({ storage });


// diff between diskStorage and memoryStorage 