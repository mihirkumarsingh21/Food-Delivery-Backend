
import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";   
import { authUserGettingAllOrderFoodList, authUserGettingOrderFoodListBySearching, authUserMakingOrder, gettingOrderHistory } from "../controllers/order.controller.js";
import { owner } from "../middlewares/owner.middleware.js";
import { ownerUpdatingOrderStatus, ownerListedOrderFood } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/make-order/:cartId", authProtect, authUserMakingOrder);
router.patch("/:orderId/status",  owner, ownerUpdatingOrderStatus);
router.patch("/:orderId/history", authProtect, owner, gettingOrderHistory);
router.get("/my", authProtect, authUserGettingAllOrderFoodList);
router.get("/search/my", authProtect, authUserGettingOrderFoodListBySearching);


router.get("/order-list", authProtect, owner, ownerListedOrderFood);




export default router;