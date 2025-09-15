
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
       console.log(`productId: ${productId}`);
       console.log(`quantity: ${quantity}`);
       
       
       const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
       const isValidProductId = mongoose.Types.ObjectId.isValid(productId);

       if(!isValidUserId || !isValidProductId) return res.status(400).json({
            success: false,
            message: "Invalid user or product id."
       })

       if(req.user != userId) return res.status(401).json({
            success: false,
            message: "You don't have a permission to add a product into cart."
       })

       const food = await FoodProductItem.findById(productId);

       if(!food) return res.status(400).json({
            success: false,
            message: "this food product cannot be add into the cart."
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
        // console.log(`isProductExsitInCartItem: ${isProductItemExsitInCart}`);
               
       if(isProductItemExsitInCart) {
          
            isProductItemExsitInCart.quantity += quantity;
            isProductItemExsitInCart.subTotal = isProductItemExsitInCart.quantity * isProductItemExsitInCart.price;

             cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subTotal, 0);

        } else {
            
            cart.items.push({
                productId,
                quantity,
                price: food.price,
                subTotal: food.price * quantity
            })

            cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subTotal, 0);
            
        }

            await cart.save();

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

// Auth user clear the food items from cart.

export const authUserClearProductCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({userId});
        
        if(cart) {

            await Cart.updateOne({userId: userId}, {$set: { items: [], totalAmount: 0 }});

        } else {
            res.send("cart already empty.")
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "cart clear successfully."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error}`
        })
        console.log(`error while auth user clear the food carts : ${error}`);
    }
}

// Auth user clear one food item from cart.

export const authUserClearOneProductCart = async (req, res) => {
    try {
            const { cartId } = req.params;
            const { productId } = req.params;

            const isValidCartId = mongoose.Types.ObjectId.isValid(cartId);
            const isValidProductId = mongoose.Types.ObjectId.isValid(productId);

            if(!isValidCartId || !isValidProductId) return res.status(400).json({ success: false, message: "Invalid cart or product id." })

            const cart = await Cart.findById(cartId);
            if(!cart) return res.status(404).json({ success: false, message: "cart not found."})
                
            const isProductExsitInCartItem = cart.items.find((item) => item.productId.toString() === productId);

            if(isProductExsitInCartItem) {
                const updatedCart = await Cart.updateOne({_id: cartId}, { $pull: {items: {productId: productId}} });                
                cart.totalAmount = cart.items.reduce((acc, item) => {
                acc + item.subTotal;

            }, 0)            

            await cart.save();
       
            res.status(200).json({
                success: 200,
                updatedCart: updatedCart
            })

            } else {
               return res.status(400).json({
                success: false,
                message: "this food item are not in cart."
            }
         )}
          
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
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

         const cart = await Cart.findById(cartId);
         if(cart.items.length == 0 || cart.totalAmount === 0) {
            return res.status(400).json({
                success: false,
                message: "empty cart cannot be updated."
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
                message: "failed to update cart details"
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


export const authUserListingCarts = async ( req, res )  => {
    try {

        const { page = 1, limit = 2 } = req.query;
         if(page <= 0 || limit <= 0) return res.status(400).json({ success: false, message: "page or limit value must be greater than 0"});
    
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: {
                path: "userId", select: ["name", ""]
            }
        }

        const cart = await Cart.paginate({ userId: req.user }, options);

        if(!cart) return res.status(404).json({ success: false, message: "cart not found."});
       
        res.status(200).json({ success: true, cartList: cart.docs });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while auth user listing carts: ${error}`);
        
    }
}


export const authUserFilterCarts = async ( req, res ) => {
    try {
        const userId = req.user;
        await Cart.createIndexes({userId: 1});
        const cart = await Cart.find({userId});
        if(!cart) return res.status(400).json({success: false, message: "cart not found."});
        res.status(200).json({success: true, filterCarts: cart})
    } catch (error) {
        res.status(500).json({ success: false, message: `sever error something went wrong: ${error}`})
    }
}