import mongoose from "mongoose";

const deliveryBoySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

   vehicleType: {
        type: String,
        enum: ["motorbike"],
        default: "motorbike",
        required: true
   },

   licenseNumber: {
        type: String,
        required: true
   },

   address: String,

   phone: {
        type: String,
        required: true
   },

   rating: {
        type: Number,
        default: 0
   },

   activeStatus: {
    type: Boolean,
    default: true
   }


}, {timestamps: true})

export const DeliveryBoy = mongoose.model("DeliveryBoy", deliveryBoySchema);
