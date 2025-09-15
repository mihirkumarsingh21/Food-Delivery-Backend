import express from "express";
import csrf from "csurf";
import { registerUser, verifyEmail, loginUser, generateCsrfToken, logOutUser,  sendingPasswordResetToken, resetPassword } from "../controllers/user.controller.js";


const router = express.Router();


const csrfProtection = csrf({ cookie: true });

router.post("/register-user",  registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login-user", loginUser);
router.get("/csrf-token", csrfProtection, generateCsrfToken);
router.get("/logout-user", logOutUser);

router.post("/send-password-reset-token", sendingPasswordResetToken);
router.post("/reset-password/:token", resetPassword);

// router.get("/test", authProtect, test);



export default router;
