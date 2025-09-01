import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
    },

    items: [{
    
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },

        price: {
            type: Number,
        },

        quantity: {
            type: Number,
            default: 1
        }
    }]


}, {timestamps: true});


export const Cart = mongoose.model("Cart", cartSchema);
