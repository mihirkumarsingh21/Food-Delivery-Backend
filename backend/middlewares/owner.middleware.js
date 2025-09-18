import { User } from "../models/user.model.js"

export const owner = async (req, res, next) => {
    try {
        
       const authenticatedUser = await User.findById(req.user);
       
       const restaurantOwner = await User.findOne({role: "owner"});  
    //    const deliveryBoy = await User.findOne({role: "delivery"});

       if(restaurantOwner.role === "customer" || authenticatedUser.role === "owner" ||  restaurantOwner.role === "delivery") {
            return res.status(403).json({
                success: false,
                message: "Access denied : Only owner have access."
            })
       }
       
    //    console.log(`customer: ${authenticatedUser}`);
       
    //    console.log(`owner: ${restaurantOwner}`);
       

       next();
  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error in owner middleware : ${error}`);
        
    }
}