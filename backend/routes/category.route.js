import express from "express";
import { addingFoodCategory, updateFoodCategory, deletingFoodCategory, gettingAllFoodCategoryList, getttingSingleCategoryFood } from "../controllers/food.category.controller.js";
import { authProtect } from "../middlewares/auth.middleware.js";
import { owner } from "../middlewares/owner.middleware.js";


const router = express.Router();

router.post("/add-food-category", authProtect, owner, addingFoodCategory);
router.put("/update-food-category/:foodId", authProtect, owner, updateFoodCategory);
router.delete("/delete-food-category/:foodId", authProtect, owner, deletingFoodCategory);
router.get("/all-food-category-list", gettingAllFoodCategoryList);
router.get("/single-category-food/:foodId", getttingSingleCategoryFood);

export default router;
