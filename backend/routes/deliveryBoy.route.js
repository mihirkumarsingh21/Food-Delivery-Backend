import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { addingDeliveryBoyDetails, givingDeliveryRole, ownerAssignOrderFoodToDeliveryBoy, deliveryBoyFetchingAssignOrder,  deliveryBoyUpdatingOrderStatus  } from "../controllers/deliveryBoy.controller.js";
import { owner } from "../middlewares/owner.middleware.js";
import { checkDeliveryRole } from "../middlewares/delivery.middleware.js";
import { orderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/adding-details", authProtect, addingDeliveryBoyDetails);
router.patch("/role", authProtect, owner, givingDeliveryRole);
router.patch("/orders/:orderId/assign", authProtect, owner, checkDeliveryRole, ownerAssignOrderFoodToDeliveryBoy);
router.get("/deliveryBoy/:id/orders", authProtect, owner, checkDeliveryRole, deliveryBoyFetchingAssignOrder);
router.patch("/deliveryBoy/:id/order/status", authProtect, owner, deliveryBoyUpdatingOrderStatus);
router.get("/:id/orderStatus", authProtect, owner, orderStatus);

export default router;