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
import deliveryBoyRoute from "./routes/deliveryBoy.route.js";
<<<<<<< HEAD
import reviewRoute from "./routes/review.route.js";
=======
>>>>>>> e2beb9c5c14743443b2de241c2c660f6a673b4db
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";



dotenv.config();
const app = express(); 


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set("trust proxy", 1);

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["PATCH", "POST", "PUT", "GET", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Headers",
      // "Access-Control-Allow-Origin",
    ],
    credentials: true,
    // optionsSuccessStatus: 200,
  }),
);

app.use(helmet());


const limiter = rateLimit({
    windowMs: 1000 * 60,
    limit: 100,
    statusCode: 429,
    message: "Too many requests, please try again later."
})

app.use(limiter);


app.use("/api/v1", authRoute);
app.use("/api/v1/profiles", authUserProfile)
app.use("/api/v1/food-category", categoryRoute);
app.use("/api/v1/food-items", foodItemsRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/delivery", deliveryBoyRoute);
app.use("/api/v1/reviews", reviewRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT : http://localhost:${PORT}`);
    connectToDatabase();
    
})
