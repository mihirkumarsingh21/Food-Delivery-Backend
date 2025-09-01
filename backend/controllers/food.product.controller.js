import { FoodProductItem } from "../models/product.model.js";
import { foodProductSchemaValidation } from "../validations/food.product.validation.js";
import mongoose from "mongoose";

// Adding new food items.
export const addingFoodItems = async (req, res) => {
    try {

        const value = await foodProductSchemaValidation.validateAsync(req.body);

        const { name, description, price, category, isAvailable } = value;
        console.log(`category : ${category}`);
        
        const addingFoodItems = await FoodProductItem.create({
                name,
                description,
                price,
                category,
                isAvailable
        })

        if(!addingFoodItems) {
            return res.status(400).json({
                success: false,
                message: "failed to add food items something you are doing wrong please try again."
            })
        }

          await addingFoodItems.populate("category");

        res.status(201).json({
            success: true,
            message: "Food items added successfully",
            addedFoodItems: addingFoodItems,
           
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
        console.log(`error while adding food items : ${error}`);

    }
    
} 

// updating foods items.

export const updatingFoodItems = async (req, res) => {
    try {
        
        const { foodItemId } = req.params;
        const { name, description, category, price, isAvailable } = req.body;

        const isValidId = mongoose.Types.ObjectId.isValid(foodItemId);

        if(!isValidId) {
            return res.status(404).json({
                success: false,
                message: "invalid food id."
            })
        }

        const updatedFoodItem = await FoodProductItem.findByIdAndUpdate({_id: foodItemId}, {
            name, 
            description,
            price,
            category,
            isAvailable
        }, {new: true});

        if(!updatedFoodItem) {
            return res.status(400).json({
                success: false,
                message: "failed to update with this id there is not any food item present."
            })
        }


        res.status(200).json({
            success: true,
            message: "your product updated successfully."
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
    }
}

// getting all food items.

export const gettingAllFoodItems = async (req, res) => {
    try {
        const { page, limit } = req.query;

        if(page <= 0 || limit <= 0) {
            return res.status(400).json({
                success: false,
                message: `page or limit cannot be lessthan or equal to 0`
            })
        }
        
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { price: 1 },
            populate: { path: "category", select: ["name", "description", "-_id"] },
        }

        const foodItems = await FoodProductItem.paginate({}, options);

        if(!foodItems) {
            return res.status(400).json({
                success: false,
                message: "failed to get food items please try after sometime"
            })
        }
            
        res.status(200).json({
            success: true,
            
            /*foodItems: foodItems.docs.map((foods) => ({
                name: foods.name,
                description: foods.description,
                price: foods.price,
                category: foods.category
            })
        )*/

            foodItems: foodItems
        
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong ${error}`
        })

        console.log(`error while getting all food items : ${error}`);
        
    }
}

// getting single food items. 

export const gettingSingleFoodItem = async (req, res) => {
    try {
        const { singleFoodItemId } = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(singleFoodItemId);

        if(!isValidId) {
            return res.status(400).json({
                success: false,
                message: "Invalid id."
            })
        }

       const singleFoodItem = await FoodProductItem.findById({_id: singleFoodItemId });
       if(!singleFoodItem) {
            return res.status(404).json({
                success: false,
                message: "food does not exist with this id."
            })
       }

       res.status(200).json({
        success: true,
        singleFoodItem: singleFoodItem
       })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
    }
}

// Filter food items by category.

export const filteringFoodItemsByCategory = async (req, res) => {
    try {
        
        const { id } = req.query;
        const isValidId = mongoose.Types.ObjectId.isValid(id);

        if(!isValidId) {
            return res.status(400).json({
                success: false,
                message: "Invalid food category id"
            })
        }


      const filterFoodItemsByCategory = await FoodProductItem.find({ category: id });
    
      if(!filterFoodItemsByCategory) {
        return res.status(404).json({
            success: false,
            message: "With thoes food category id you are trying to fetch food items that does not exits, please try with valid id."
        })
      }

      res.status(200).json({
        success: true,
        foodItemsFilteredByFoodCtegory: filterFoodItemsByCategory.map((foods) => ({
            name: foods.name,
            description: foods.description,
            price: foods.price,
            category: foods.category,
            isAvailable: foods.isAvailable
        })
    )
      })
          
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while filtering food items by category : ${error}`);
        
    }
}



// Filter food items by price.

export const filteringFoodItemsByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        
        const parseMinPrice = parseInt(minPrice);
        const parseMaxPrice = parseInt(maxPrice);

        if( parseMinPrice < 0 || parseMaxPrice < 0 ) {
            return res.status(400).json({
                success: false,
                message: "please enter a valid range price."
            })
        }

        if( parseMinPrice < 100 || parseMaxPrice > 500) {
            return res.status(400).json({
                success: false,
                message: "price range must be under 100 & 500"
            })
        }

        const foodItems = await FoodProductItem.find({price: { $gte: parseMinPrice, $lte: parseMaxPrice }});

        if(!foodItems) {
            return res.status(404).json({
                success: false,
                message: "food not found something went wrong."
            })
        }

        res.status(200).json({
            success: true,
            foodItems: foodItems
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
        console.log(`error while filtering food items by price : ${error}`);
    }
}

// Getting food items with category.

export const foodItemsWithCategory = async ( req, res ) => {
    try {
        const { categoryId } = req.query;
        const foodItem = await FoodProductItem.find({category: categoryId}).populate("category");
        if(!foodItem) {
            return res.status(400).json({
                success: false,
                message: "food items not found with this id."
            })
        }

        res.status(200).json({
            success: true,
            foodItem: foodItem
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while getting food items with category : ${error}`);
        
    }
}

// Getting food items with name & price only.

export const gettingFoodsWithNameAndPrice = async (req, res) => {
    try {
        const { name, price } = req.query;

        const foodItem = await FoodProductItem.find({
            $and: [ { name }, { price } ]
        })

        if(!foodItem) {
            return res.status(400).json({
                success: false,
                message: "food not found with this name and price"
            })
        }

        res.status(200).json({
            success: true,
            foodItem: foodItem.map((foods) => ({
                name: foods.name,
                price: foods.price
            })
        )
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while getting food items with name & price only : ${error}`);
        
    }
}

// Getting food items via searching.

export const gettingFoodItemsBySearching = async (req, res) => {
    try {
        const { name, description } = req.query;
        
        console.table([name, description]);
        const foodItems = await FoodProductItem.find({
            $or: [
                { name: { $regex: name, $options: "i" } },
                { description: { $regex: description, $options: "i" }}
            ]
        })

        if(!foodItems) {
            return res.status(404).json({
                success: false,
                message: "unable to getting a food items please enter correct name & description of a food."
            })
        }

        res.status(200).json({
            success: true,
            searchedFoodItems: foodItems
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrongsss : ${error}`
        })

        console.log(`error while getting food items by searching : ${error}`);
        
    }
}








