import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import authRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import categoryRoute from "./routes/category.route.js";
import foodItemsRoute from "./routes/food.product.route.js";
import authUserProfile from "./routes/user.profile.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";


dotenv.config();
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1", authRoute);
app.use("/api/v1/profiles", authUserProfile)
app.use("/api/v1/food-category", categoryRoute);
app.use("/api/v1/food-items", foodItemsRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT : http://localhost:${PORT}`);
    connectToDatabase();
    
})