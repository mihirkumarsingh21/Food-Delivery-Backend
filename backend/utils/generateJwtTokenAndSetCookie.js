import jwt from "jsonwebtoken";

export const generateJwtTokenAndSetCookie = async (userId, role, res) => {
    try {
     
        const token = jwt.sign({userId, role}, process.env.JWT_SECRET_KEY, {
            expiresIn: 1000 * 60 * 60 * 7
        })

        console.log(`JWT token : ${token}`);
        

        if(!token) {
            return res.status(400).json({
                success: false,
                message: "Failed to generate authentication token. Please try again."
            })
        }

        res.cookie("authToken", token, {
            maxAge: 1000 * 60 * 60 * 7,
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        console.log(`jwt token created successfully.`);
        
        return token

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })

        console.log(`error while generating jwt token : ${error}`);
        
    }
}
