import { Category } from "../models/category.model.js";
import { categorySchemaValidation } from "../validations/category.validation.js";
import mongoose from "mongoose";

// Adding category...

export const addingFoodCategory = async (req, res) => {
    try {
       const value  = await categorySchemaValidation.validateAsync(req.body);
       const { name, description } = value;

       const categoryAdded = await Category.create({
        name,
        description
       })

       if(!categoryAdded) {
            return res.status(400).json({
                success: false,
                message: "Failed to add category."
            })
       }

       res.status(201).json({
        success: true,
        message: `category added successfully : ${categoryAdded}`
       })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error   }`
        })
        console.log(`error while adding category : ${error}`);
        
    }
}

// Updating category...

export const updateFoodCategory = async (req, res) => {
    try {
        const { foodId } = req.params;
        console.log(`FOOD ID : ${foodId}`);
        
        const isValidFoodId = mongoose.Types.ObjectId.isValid(foodId); // it gives a boolean value : true or false

        const { name, description } = req.body;

        if(!isValidFoodId) {
            return res.status(400).json({
                success: false,
                message: "Invalid food id"
            })
        }

        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: "these fields can not be leave empty"
            })
        }

        const updatedFoodCategory = await Category.findByIdAndUpdate({ _id: foodId }, { name, description }, { new: true });

        if(!updatedFoodCategory) {
            return res.status(400).json({
                success: false,
                message: "Food does not exist with this id or invalid id."
            })
        }

        res.status(200).json({
            success: true,
            message: "food category updated successfully",
            updatedFoodCategory: updatedFoodCategory
        })

       await updatedFoodCategory.save();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while updating food category : ${error}`);
        
    }
}

// Deleting category...

export const  deletingFoodCategory = async (req, res) => {
    try {

        const { foodId } = req.params;
        const isValidFoodId = mongoose.Types.ObjectId.isValid(foodId);
        
        if(!isValidFoodId) {
            return res.status(400).json({
                success: false,
                message: "Invalid food id"
            })
        }

        const deletedCategory = await Category.findByIdAndDelete({_id: foodId});

        if(!deletedCategory) {
            return res.status(400).json({
                success: false,
                message: "Food does not exist with this id or invalid id."
            })
        }

        res.status(200).json({
            success: true,
            message: "food deleted sucessfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
    }
}

// listing all food category items...

export const gettingAllFoodCategoryList = async (_, res) => {
    try {
        const allFoodCategoryList = await Category.find();

        if(!allFoodCategoryList) {
            return res.status(401).json({
                success: false,
                message: "failed to get all food list or can not find any food list items"
            })
        }

        res.status(200).json({
            success: true,
            allFoodCategory: allFoodCategoryList
            
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:`server error something went wrong : ${error}`,
        })

        console.log(`error while listing all food category : ${error}`);
        
    }
}

// listing single category food...

export const getttingSingleCategoryFood = async (req, res) => {
    try {
        const { foodId } = req.params;
        console.log(`food id : ${foodId}`);
        
        const isValidFoodId = mongoose.Types.ObjectId.isValid(foodId);
        if(!isValidFoodId) {
            return res.status(400).json({
                success: false,
                message: "Invalid food category id."
            })
        }

        const singleFoodCategory = await Category.findById({_id: foodId});
        if(!singleFoodCategory) {
            return res.status(404).json({
                success: false,
                message: "food category does not exist with this id."
            })
        }

        res.status(200).json({
            success: true,
            singleFoodCategoryListed: singleFoodCategory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
    }
}