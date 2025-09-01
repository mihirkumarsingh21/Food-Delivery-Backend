import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        
         match: [
            /^\S+@\S+\.\S+$/,
            "please provide a valid email adress"
            ]
    },

    password: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        default: ""
    },

    isVerified: {
        type: Boolean,
        default: false
     },

    role: {
        type: String,
        enum: ["customer", "owner", "delivery"],
        default: "customer"
        
    },

    passwordResetToken: String,
    passwordResetTokenExpAt: Date,
    
    verificationToken: String,
    verificationTokenExpAt: Date

    
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);


