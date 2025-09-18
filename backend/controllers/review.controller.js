import { isValidObjectId } from "mongoose";
import { Order } from "../models/order.model.js";
import { FoodProductItem } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { validationReviewSchema } from "../validations/review.validation.js"

export const authUserGivingRatingOrderedfood = async ( req, res ) => {
    try {

        const { productId } = req.params;
        const value = await validationReviewSchema.validateAsync(req.body);
        
        const { userId, rating, comment } = value;   
        if(!userId || !rating) return res.status(400).json({
            success: false,
            message: "please provide a userId or rating."
        })     

        if(rating < 0) return res.save(400).json({
            success: false,
            message: "rating must be greater than 0."
        })

        if(!isValidObjectId(productId)) return res.status(400).json({
                success: false,
                message: "Invalid product id."
        })

        if(!isValidObjectId(userId)) return res.status(400).json({
            success: false,
            message: "Invalid user id."
        })

        const isUserOrderFood = await Order.findOne({userId: userId});
        if(!isUserOrderFood || isUserOrderFood.orderStatus != "delivered") return res.status(400).json({
            success: false,
            message: "you are not allowed to give any kind of rating, so you have to be order a food. OR your order is not delivered yet."
        })

       const ratingTOFood = await Review.create({
        userId,
        productId,
        rating,
        comment
       })

       if(!ratingTOFood) return res.status(400).json({
            success: false,
            message: "failed to give rating."
       })

      const orderedFood = await FoodProductItem.findById(productId);
      orderedFood.ratingSum += rating;
      orderedFood.totalRatings += 1;
      orderedFood.averageRating = orderedFood.ratingSum / orderedFood.totalRatings;


      res.status(200).json({
        success: true,
        orderedFoodRating: ratingTOFood,
        orderedFood: orderedFood

      })

      await orderedFood.save();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while auth user giving rating ordered food: ${error}`);
        
    }
} 

export const authUserGettingRatingOrderedfood = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const { productId } = req.params;

        if(page <= 0 || limit <= 0) return res.status(400).json({
            success: false,
            message: "page or limit must be greater than 0"
        })

        if(!isValidObjectId(productId)) return res.status(400).json({
            success: false,
            message: "Invalid productId"
        })

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 2;

        const offSet = (pageNum - 1) * limitNum;
       
        const ratingFoods = await Review.find({productId}).skip(offSet).limit(limitNum).populate({path: ["userId"]});
        if(!ratingFoods) return res.status(404).json({
            success: false,
            message: "Rating food not found."
        })

        res.status(200).json({
            success: true,
            foodRating: ratingFoods
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error}`
        })

        console.log(`error while auth user getting rating ordered food: ${error}`);
        
    }
}

export const authUserUpdatingOurReview = async ( req, res ) => {
    try {

        const { reviewId } = req.params;
        const { rating }  = req.body;
        
        if(!isValidObjectId(reviewId)) return res.status(400).json({
            success: false,
            message: "Invalid review id"
        })

        if(!rating) return res.status(400).json({
            success: false,
            message: "this field is required for updating rating."
        })

        if(rating > 5 || rating < 0) return res.status(400).json({
            success: false,
            message: "rating must be less than or equal to 5 OR not less than zero."
        })

        const oldRating = await Review.findById(reviewId);
        if(!oldRating) return res.status(404).json({
            success: false,
            message: "old rating not found."
        })

        if(oldRating.userId != req.user) return res.status(403).json({
            success: false,
            message: "you can only update your own rating not other."
        })

        const updatedOrderedFoodRating = await Review.findByIdAndUpdate(reviewId, {rating}, {new: true});
        if(!updatedOrderedFoodRating) return res.status(400).json({
            success: false,
            message: "failed to update rating."
        })
        
        const orderedFood = await FoodProductItem.findById(updatedOrderedFoodRating.productId);
        if(!orderedFood) return res.status(404).json({
            success: false,
            message: "ordered food not found : not any food order by this id."
        })


        orderedFood.ratingSum = orderedFood.ratingSum - oldRating.rating + rating;
        
        orderedFood.averageRating = orderedFood.ratingSum  / orderedFood.totalRatings;

        await orderedFood.save();

        res.status(200).json({
            success: true,
            message: "your food rating updated succesfully.",
            updatedOrderedFoodRating: updatedOrderedFoodRating,
            orderedFoodUpdatedRating: orderedFood
        })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })

        console.log(`error while auth user updating our review: ${error}`);
        
    }
}

export const  authUserDeletingRatingOrderFood = async (req, res)  => {
    try {
        const { reviewId } = req.params;
        if(!isValidObjectId(reviewId)) return res.status(400).json({
            success: false,
            message: "Invalid review id."
        })

    
        if(!reviewId) res.status(400).json({
            success: false,
            message: "please provide a review id."
        })

        const oldRating = await Review.findById(reviewId);
        if(!oldRating) return res.status(404).json({
            success: false,
            message: "Old rating not found with this id,  please choose any other id."
        })

        const deletingRating = await Review.findByIdAndDelete(reviewId);
        if(!deletingRating) return res.status(404).json({
            success: false,
            message: "Rating not found or failed to deleting rating, please use a correct id."
        })

        const orderedFood = await FoodProductItem.findById(deletingRating.productId);
        if(!orderedFood) return res.status(404).json({
            success: false,
            message: "ordered not found : any orther i not exist with this id."
        })

        orderedFood.ratingSum = orderedFood.ratingSum - oldRating.rating;
        orderedFood.totalRatings -= 1;
        orderedFood.averageRating = orderedFood.totalRatings > 0 ? orderedFood.ratingSum / orderedFood.totalRatings: 0;

        await orderedFood.save();

        res.status(200).json({
            success: true,
            message: "food rating deleted successfully.",
            orderedFoodAfterDeletedRating: orderedFood
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while auth user deleting rating order food: ${error}`);
        
    }
}

export const gettingAllRatingList = async (req, res) => {
    try {
        const {page = 1, limit = 2} = req.query;
        
        if(page <= 0 || limit <= 0) return res.status(400).json({
            success: false,
            message: "page or limit must be greater than 0"
        })

        if(!isValidObjectId(productId)) return res.status(400).json({
            success: false,
            message: "Invalid product id."
        })

        const offSet = ( page - 1 ) * limit;

        const ratingList = await Review.findOne({productId}).skip(offSet).limit(limit).populate("productId");

        if(!ratingList) return res.status(404).json({
            success: false,
            message: "rating not found."
        })

        res.status(200).json({
            success: true,
            ratingList: ratingList 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while getting all rating list: ${error}`);
        
    }
}

export const authUserSortingRatingFoodItems = async (req, res) => {
    try {

        const { productId } = req.params;
        let {sort} = req.query;
        let sortNum;
        
        if(sort == "latest") {
             sortNum = sort = -1
            
        } else if(sort == "highest") {
             sortNum = sort = -1;

        } else if(sort == "oldest") {
             sortNum = sort = 1;

        } else if(sort == "lowest") {
             sortNum = sort = 1;

        }
    
                
        if(!isValidObjectId(productId)) return res.status(400).json({
            success: false,
            message: "Invalid product id."
        })

        if(!sort || !sortNum) return res.status(400).json({
            success: false,
            message: "the sort or sortnum field cannot leave empty"
        })

    
        const options = {
            sort: { 
                createdAt: sortNum,
                rating: sortNum
            }
        }

        const ratingFood = await Review.paginate({productId}, options);
        if(!ratingFood) return res.status(404).json({
            success: false,
            message: "failed to sorting rating foods, please provide a correct product id."
        })

        res.status(200).json({
            success: true,
            sortedRatingFoods: ratingFood
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while auth user sorting rating food items: ${error}`);
        
    }
}


