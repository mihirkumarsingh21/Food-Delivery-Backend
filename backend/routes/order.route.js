
import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";   
import { authUserGettingAllOrderFoodList, authUserGettingOrderFoodListBySearching, authUserMakingOrder, gettingOrderHistory, ownerFilterOrderFood} from "../controllers/order.controller.js";
import { owner } from "../middlewares/owner.middleware.js";
import { ownerUpdatingOrderStatus, ownerListedOrderFood, ownerSortedOrderFood, orderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/make-order/:cartId", authProtect, authUserMakingOrder);
router.patch("/:orderId/status",  owner, ownerUpdatingOrderStatus);
router.patch("/:orderId/history", authProtect, owner, gettingOrderHistory);
router.get("/my", authProtect, authUserGettingAllOrderFoodList);
router.get("/search/my", authProtect, authUserGettingOrderFoodListBySearching);

router.get("/order-list", authProtect, owner, ownerListedOrderFood);
router.get("/sorted-order-list", authProtect, owner, ownerSortedOrderFood);
router.get("/filter-order-list", authProtect, owner, ownerFilterOrderFood);

router.get("/deliveryBoy/:id/status", authProtect, owner, orderStatus);

export default router;