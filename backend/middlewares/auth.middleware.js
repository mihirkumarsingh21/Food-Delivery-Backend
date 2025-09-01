import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authProtect = async (req, res, next) => {

    try {

         if (!req.cookies["authToken"] || !req.cookies.authToken) {
            return res.status(401).json({ 
                success: false,
                error: "Unauthorized - No Token Provided" 
            });
        }

        const token = req.cookies["authToken"] || req.cookies.authToken;

        // console.log(`jwt token : ${token}`);

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            })
        }

        // console.log(`DECODED : ${JSON.stringify(decoded["userId"])}`);

        const authUserId = decoded["userId"] || decoded.userId;

        const authUser = await User.findById({_id: authUserId});

        if(!authUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user exist..."
            })
        }

        // console.log(`AUTHENTICATED USER : ${authUser}`);
        
        req.user = authUser._id        
        
        next();

    } catch(error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while verify jwt token : ${error}`);

    } 
}