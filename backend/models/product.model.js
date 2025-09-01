import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const foodProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

    isAvailable: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })

foodProductSchema.plugin(mongoosePaginate);


export const FoodProductItem = mongoose.model("Product", foodProductSchema);

