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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    ratingSum:{
        type: Number,
        default: 0
    },

    totalRatings: {
        type: Number,
        default: 0
    },

    averageRating: {
        type: Number,
        default: 0
    },


    isAvailable: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })

foodProductSchema.plugin(mongoosePaginate);
foodProductSchema.indexes({name: 1}, { price: -1 }); // not working well.


export const FoodProductItem = mongoose.model("Product", foodProductSchema);

