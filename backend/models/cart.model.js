import mongoose from "mongoose";
import  mongoosePaginate  from "mongoose-paginate-v2";

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
        },
        
        subTotal: {
            type: Number
        }
    }],

        totalAmount: {
            type: Number
        }


}, {timestamps: true});

cartSchema.plugin(mongoosePaginate);


export const Cart = mongoose.model("Cart", cartSchema);
