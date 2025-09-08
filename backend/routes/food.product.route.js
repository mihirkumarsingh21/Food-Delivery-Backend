import express from "express";
import { addingFoodItems, updatingFoodItems, gettingAllFoodItems, gettingSingleFoodItem, filteringFoodItemsByCategory, filteringFoodItemsByPrice, foodItemsWithCategory, gettingFoodsWithNameAndPrice, gettingFoodItemsBySearching, gettingFoodList } from "../controllers/food.product.controller.js";
import { authProtect } from "../middlewares/auth.middleware.js";
import { owner } from "../middlewares/owner.middleware.js";


const router = express.Router();

router.post("/adding-food-items", authProtect, owner, addingFoodItems);
router.put("/update-food-items/:foodItemId", authProtect, owner, updatingFoodItems);
router.get("/all-food-lists", gettingAllFoodItems);
router.get("/single-food/:singleFoodItemId", gettingSingleFoodItem);
router.get("/products/food-category", filteringFoodItemsByCategory); // get food items  filter by category
router.get("/foods/price", filteringFoodItemsByPrice); // get food items filter by max & min price.
router.get("/foods/category", foodItemsWithCategory);

router.get("/foods/fields", gettingFoodsWithNameAndPrice);
router.get("/foods/search", gettingFoodItemsBySearching);
router.get("/foods/food-list", gettingFoodList);






export default router;