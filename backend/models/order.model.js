import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

    assignedTo: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },

    items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }
        }
    ],

     totalAmount: {
        type: Number
     },

    addresses: [{

        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        }

     }],

     deliveryPartnerId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
     },
    
     orderStatus: {
        type: String,
        enum: [ "placed", "pending", "confirmed", "preparing", "out for delivery",  "delivered", "cancelled" ],
        default: "pending"
     },

     orderHistory: [{

        orderStatus: {
            type: String
        },
        changeAt: {
            type: Date
        },
        changeBy: {
            type: String,
            enum: ["customer", "owner", "system"]
        }

     }]

}, {timestamps: true})

orderSchema.plugin(mongoosePaginate);

export const Order = mongoose.model("Order", orderSchema);

