import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodProductItem",
            unique: true
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

export const Review = mongoose.model("Review", reviewSchema);

