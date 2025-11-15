import express from "express"
const router = express.Router()
import { upload } from "../middleware/multer.middleware.js";
import {
    createUserAccount,
    getUserProfile,
    userLogin,
    uploadMedia,
    getAllMedia
} from "../controller/user.controller.js";

import {
    generateQR
} from "../controller/qr.controller.js";

router.post("/register", createUserAccount)
router.post("/login", userLogin)
router.get("/profile/:username", getUserProfile)
router.post("/upload/:username", upload.array('files', 10), uploadMedia)
router.get("/media/:username", getAllMedia)
router.post("/generate/QR/:username", generateQR)

export default router

