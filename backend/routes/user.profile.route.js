import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { gettingAuthUserProfile, updatingAuthUserProfile, uploadingAuthUserProfilePic, deletingAuthUserProfilePic, updatingAuthUserProfilePic, authUserProfilePic } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();


router.post("/auth-user/upload-profile-pic", authProtect, upload.single("profilePic"), uploadingAuthUserProfilePic);

router.put("/auth-user/update-profile-pic", authProtect, upload.single("profilePic"),updatingAuthUserProfilePic);

router.get("/auth-user/profile-pic", authProtect, authUserProfilePic);

router.delete("/auth-user/delete-profile-pic", authProtect, deletingAuthUserProfilePic);




router.get("/auth-user-profile", authProtect, gettingAuthUserProfile);
router.put("/auth-user-profile/update", authProtect, updatingAuthUserProfile)

export default router;
