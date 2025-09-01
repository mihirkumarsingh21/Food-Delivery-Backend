import { User } from "../models/user.model.js"

export const owner = async (req, res, next) => {
    try {
       const authenticatedUser = await User.findById({_id: req.user});

       if(authenticatedUser.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Access denied : Only owner have access."
            })
       }

       next();
  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error in owner middleware : ${error}`);
        
    }
}