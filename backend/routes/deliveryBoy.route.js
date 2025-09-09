import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { addingDeliveryBoyDetails } from "../controllers/deliveryBoy.controller.js";

const router = express.Router();

router.post("/adding-details", authProtect, addingDeliveryBoyDetails);


export default router;