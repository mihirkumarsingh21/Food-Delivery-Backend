
import { cartSchemaValidation } from "../validations/cart.validation.js";
import { Cart } from "../models/cart.model.js";
import mongoose from "mongoose";
// import { User } from "../models/user.model.js";
import { FoodProductItem } from "../models/product.model.js";

// Auth user adding product cart. 

export const authUserAddingProductCart = async (req, res) => {
    try {

       const value = await cartSchemaValidation.validateAsync(req.body);
       const { userId, items:[{ productId, quantity }] } = value;
       const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
       const isValidProductId = mongoose.Types.ObjectId.isValid(productId);

       if(!isValidUserId || !isValidProductId) return res.status(400).json({
            success: false,
            message: "Invalid user or product id."
       })

       if(req.user != userId) return res.status(401).json({
            success: false,
            message: "Only auth user can add product into cart."
       })

       const food = await FoodProductItem.findById(productId);
       if(!food) return res.status(400).json({
            success: false,
            message: "this food product can not be add into the cart."
       })

       const cart = await Cart.findOne({ userId });

       if(!cart) {
            const newCart = await Cart.create({
                userId,
                items: [{
                    productId,
                    price: food.price,
                    quantity,
                    subTotal: food.price * quantity
                }],
                totalAmount: food.price * quantity
            })

            return res.status(201).json({
                success: true,
                message: "Cart added successfully.",
                newCart: newCart
            })
       }

    
       const isProductItemExsitInCart = cart.items.find((item) => item.productId.toString() === productId); 
        console.log(`isProductExsitInCartItem: ${isProductItemExsitInCart}`);
               
       
       if(isProductItemExsitInCart) {
          
            isProductItemExsitInCart.quantity += quantity;
            isProductItemExsitInCart.subTotal = isProductItemExsitInCart.quantity * isProductItemExsitInCart.price;

             cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subTotal, 0);
            await cart.save();
        }


        return res.status(200).json({
            success: true,
            cartList: cart 
        })
      
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
        console.log(`error while auth user adding product cart : ${error}`);
        
    }
}

// Auth user updating product cart.

export const authUserUpdatingProductCart = async (req, res) => {
    try {

        const { cartId } = req.params;
         const { userId, items } = req.body;
         const [ { productId, price, quantity } ] = items;

         const isCartIdValid = mongoose.Types.ObjectId.isValid(cartId);
         const isUserIdValid = mongoose.Types.ObjectId.isValid(userId);
         const isProductIdValid = mongoose.Types.ObjectId.isValid(productId);

         if(!isUserIdValid || !isProductIdValid || !isCartIdValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid user or product id or exsiting cart id."
            })
         }

         if(req.user != userId) {
            return res.status(401).json({
                success: false,
                message: "Only authorized user can update the cart."
            })
         }

         const foods = await FoodProductItem.findById(productId);
         
         if(foods._id != productId) {
            return res.status(400).json({
                success: false,
                message: "please enter a correct product id."
            })
         }

         const updatedCart = await Cart.findByIdAndUpdate(cartId, { userId, items: [ {
            productId,
            price,
            quantity
         }]}, {new: true});


         if(!updatedCart) {
            return res.status(400).json({
                success: false,
                message: "failed to update cart details or the provided cart id in params are not exits in db."
            })
         }
                  
         res.status(200).json({
            success: true,
            message: "cart updated successfully",
            updatedCart: updatedCart
         })
         
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while auth user updating product cart : ${error}`);
        
    }
}

// Auth user remove product cart.

export const authUserRemoveProductCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const isCartIdValid = mongoose.Types.ObjectId.isValid(cartId);
        if(!isCartIdValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart id."
            })
        } 

        const removedCart = await Cart.findByIdAndDelete(cartId);
        if(!removedCart) {
            return res.status(400).json({
                success: false,
                message: "failed to remove cart."
            })
        }

        res.status(200).json({
            success: true,
            message: "Cart removed successfully."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while auth user removing cart item : ${error}`);
        
    }
}

// Auth user getting a cart lits.

export const authUserGettingProductCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const isCartIdValid = mongoose.Types.ObjectId.isValid(cartId);
        if(!isCartIdValid) {
            return res.status({
                success: false,
                message: "Invalid cart id."
            })
        }

        const cartListed = await Cart.findById(cartId);
        if(!cartListed) {
            return res.status(404).json({
                success: false,
                message: "Cart not found please check cart id."
            })
        }

        res.status(200).json({
            success: true,
            cartListed:cartListed 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })

        console.log(`error while auth user listing carts: ${error}`);
        
    }
}

