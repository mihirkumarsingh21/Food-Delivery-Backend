import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { owner } from "../middlewares/owner.middleware.js";
import { authUserGivingRatingOrderedfood, authUserGettingRatingOrderedfood, authUserUpdatingOurReview, authUserDeletingRatingOrderFood } from "../controllers/review.controller.js";


const router = express.Router();

router.post("/:productId", authProtect, owner, authUserGivingRatingOrderedfood);
router.get("/:productId", authProtect, owner, authUserGettingRatingOrderedfood);
router.put("/:reviewId", authProtect, owner, authUserUpdatingOurReview);
router.delete("/:reviewId", authProtect, owner, authUserDeletingRatingOrderFood);



export default router;
