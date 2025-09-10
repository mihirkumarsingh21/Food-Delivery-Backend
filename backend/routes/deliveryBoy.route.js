import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { addingDeliveryBoyDetails, givingDeliveryRole, ownerAssignOrderFoodToDeliveryBoy  } from "../controllers/deliveryBoy.controller.js";
import { owner } from "../middlewares/owner.middleware.js";
import { checkDeliveryRole } from "../middlewares/delivery.middleware.js";

const router = express.Router();

router.post("/adding-details", authProtect, addingDeliveryBoyDetails);
router.patch("/role", authProtect, owner, givingDeliveryRole);
// router.put("/update-order-status", checkDeliveryRole, deliveryBoyUpdaingOrderStatus);
router.patch("/orders/:orderId/assign", authProtect, checkDeliveryRole, owner, ownerAssignOrderFoodToDeliveryBoy);



export default router;