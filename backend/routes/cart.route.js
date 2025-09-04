import express from "express";
import { authProtect } from "../middlewares/auth.middleware.js";
import { authUserAddingProductCart, authUserUpdatingProductCart, authUserClearProductCart, authUserGettingProductCart, authUserRemoveProductCart ,authUserClearOneProductCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add-cart", authProtect, authUserAddingProductCart);
router.get("/cart-list/:cartId", authProtect, authUserGettingProductCart);
router.put("/update-cart/:cartId", authProtect, authUserUpdatingProductCart);
router.delete("/remove-cart/:cartId", authProtect, authUserRemoveProductCart);
router.delete("/clear-cart", authProtect, authUserClearProductCart);
router.delete("/cart/:cartId/item/:productId", authProtect, authUserClearOneProductCart);


export default router;
