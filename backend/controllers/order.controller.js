import mongoose from "mongoose";
import { validationOrderSchema } from "../validations/order.validation.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

export const authUserMakingOrder = async (req, res) => {
    try {

        const { cartId } = req.params;
        const value = await validationOrderSchema.validateAsync(req.body);
        const isValidCartId = mongoose.Types.ObjectId.isValid(cartId);    
        const { addresses } = value;

        if(!isValidCartId) return res.status(400).json({ success: false, message: "Invalid cart id."} );

        if (!addresses || addresses.length === 0) {
        return res.status(400).json({
        success: false,
        message: "For making the order of food please provide an address."
      });
    }
       
        const { street, city, state, pincode, phone } = addresses[0];
  
       const cart = await Cart.findById(cartId);

       if(!cart) return res.status(404).json({ success: false, message: "cart not found." });

       if(cart.items.length === 0) return res.status(404).json( { success: false, message: "cart is empty so you cannot make a order."} );

       const user = await User.findById(req.user);

       const orderedFood = await Order.create({
            userId: req.user,
            items: cart.items,
            totalAmount: cart.totalAmount,
            addresses: [{
                name: user.name,
                street,
                city,
                state,
                pincode,
                phone
            }],
            orderStatus: "pending"
       })
       if(!orderedFood) return res.status(400).json({ success: false, message: "failed to create a order."});

         orderedFood.orderHistory.push({
            orderStatus: orderedFood.orderStatus,
            changeAt: Date.now(),
            changeBy: "owner"
       })
       res.status(200).json({ success: true, message: "Your order successfully.", orderedFood: orderedFood });

       await Cart.findByIdAndUpdate(cartId, {
            $set: {
                items: [],
                totalAmount: 0
            }
       }, { new: true })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })        
    }
}

export const ownerUpdatingOrderStatus = async ( req, res ) => {
        try {
            
            const { orderId } = req.params;
            const { requestStatus } = req.body;

            const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
            if(!isValidOrderId) return res.status(400).json({ success: false, message: "Invalid order id "});

            if(!requestStatus) return res.status(400).json({ success: false, message: "the order status field cannot be empty."});

            const order = await Order.findById(orderId);
            if(!order) return res.status(404).json({
                success: false,
                message: "order not found."
            })

            const allowedTransitions = {

                pending: ["placed"],
                placed: ["confirmed", "cancelled"],
                confirmed: ["preparing", "cancelled"],
                preparing: ["out for delivery"],
                outForDelivery: ["delivered"],
                delivered: [],
                cancelled: []

            }

            const currentOrderStatus = order.orderStatus;
            
            const isRequestOrderStatusPresent = allowedTransitions[currentOrderStatus].includes(requestStatus);
            
            if(!isRequestOrderStatusPresent) return res.status(400).json({ success: false, message: "Invalid Transition." });

            order.orderStatus = requestStatus;

            order.orderHistory.push({
                orderStatus: requestStatus,
                changeAt: Date.now(),
                changeBy: "owner"
            })

            await order.save();

            res.status(200).json({
                success: true,
                updatedOrderStatus: order
            })
          

        } catch (error) {
            res.status(500).json({
                success: false,
                message: `server error something went wrong: ${error}`
            })
            console.log(`error while owener updating order status: ${error}`);
            
        }
}

export const gettingOrderHistory = async (req, res) => {
    try {
        const { orderId } = req.params;
        const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
        if(!isValidOrderId) return res.status(400).json({ success: false, message: "Invalid order id."});

        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({ success: false, message: "order not found."});

        res.status(200).json({
            success: true,
            orderHistory: order.orderHistory
        })


    } catch (error) {
        res.status(500).json({ success: false, message: `server error something went wrong :${error}`})
        console.log(`error while getting order histroy :${error}`);
        
    }
}

export const authUserGettingAllOrderFoodList = async (req, res) => {
    try {

        const { page= 1, limit= 2 } = req.query;
        const parsePage = parseInt(page);
        const parseLimit = parseInt(limit);

         if(page <= 0 || limit <= 0) {
            return res.status(400).json({
                success: false,
                message: `page or limit cannot be lessthan or equal to 0`
            })
        }
        
        const options = {
            page: parsePage,
            limit: parseLimit,
            sort: { order: 1 }
        }

        const order = await Order.find({userId: req.user}).paginate({}, options);
        if(!order) return res.status(404).json({ success: fasle, message: "food not found." });

        res.status(200).json({ success: true, order: order.docs.map((doc) => ({
                items: doc.items,
                totalAmount: doc.totalAmount
        })) })

    } catch (error) {
        res.status(500).json({ success: false, message: `server error something went wrong: ${error}`})
        console.log(`error while auth user getting all order food list: ${error}`);
        
    }
}

export const authUserGettingOrderFoodListBySearching = async (req, res) => {
        try {
            const { orderStatus } = req.query;
            console.log(`order status: ${orderStatus}`);
            
            if(!orderStatus) return res.status(400).json({ success: false, message: "cannot get order status."});

            const filterOrder = await Order.find({
                orderStatus: { $regex:  orderStatus, $options: "i"  }
            });
            if(!filterOrder) return res.status(404).json({ success: false, message: "food not found with status code please choose different one."});

    
            res.status(200).json({ success: true, filterOrder: filterOrder });

        } catch (error) {
            res.status(500).json({ success: false, message: `server error something went wrong: ${error}`})
            console.log(`error while auth user getting order food list by searching:${error}`);
            
        }
}


export const ownerListedOrderFood = async (req, res) => {
    
    try {

        const { page = 1, limit = 2 } = req.query;

        if(page <= 0 || limit <= 0) return res.status(400).json({ success: false, message: "page or limit must be greater than 0"});

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: { path: "userId items.productId", select: [ "name", "email", "isVerified", "role" ,"description", "price", "isAvailable"  ]},
        }
        
        const orders =  await Order.paginate({}, options);
        
        if(!orders) return res.status(404).json({success: false, message: "Ordered food not found."});

        res.status(200).json({
            success: true,
            orderedFood: orders.docs
        })

    } catch (error) {
        res.status(500).json({ success: false, message: `server error something went error: ${ error}` })
        console.log(`error while owner listed order food: ${error}`);
        
    }
}


export const ownerSortedOrderFood = async ( req, res) => {
    try {
            const { sortBy, order } = req.query;


            const options = {
                sort: { createdAt: sortBy, createdAt: order },
                
            }

            const orders = await Order.paginate({}, options);
            if(!orders) return res.status(404).json({ success: false, message: "order food not found."});

            

            res.status(200).json({ success: true, sortedOrderList: orders});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        console.log(`error while owner sorted order food: ${error}`);

    }
}  

export const ownerFilterOrderFood = async ( req, res ) => {
        try {
            const { orderStatus } = req.query;
              await Order.createIndexes({userId: 1, orderStatus: 1, createdAt: 1});
        
            const order = await Order.find({ orderStatus: { $regex: orderStatus, $options: "i" }});

            
            if(!order) return res.status(404).json({ success: false, message: "order not found : you don't have any order list with this order status." });

            res.status(200).json({ success: true, filterOrderList: order });
        
        } catch (error) {
            res.status(500).json({ success: false, message: `server error something went wrong: ${error}`})
        }
}








