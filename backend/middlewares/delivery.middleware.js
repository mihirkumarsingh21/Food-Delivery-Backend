import { User } from "../models/user.model.js";

export const checkDeliveryRole = async (req, res, next) => {
    try {
        const deliveryBoy = await User.findOne({role: "delivery"});
        console.log(`delivery boy:${deliveryBoy}`);
        
        if(!deliveryBoy) return res.status(401).json({ success: false, message: "access denied: only delivery boy have a access."});

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while checking delivery role: ${error}`);
        
    }
}