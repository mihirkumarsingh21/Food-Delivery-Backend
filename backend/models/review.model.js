import mongoose from 'mongoose';
import paginate from "mongoose-paginate-v2";

const reviewSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodProductItem",
        },

        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            // required: true,
            default: 0
        },

        comment: {
            type: String,
            default: ""
        }

}, {timestamps: true});

reviewSchema.plugin(paginate);

export const Review = mongoose.model("Review", reviewSchema);


