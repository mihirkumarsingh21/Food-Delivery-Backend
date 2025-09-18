import mongoose from "mongoose";
import { DeliveryBoy } from "../models/deliveryBoy.model.js";
import { User } from "../models/user.model.js";
import { deliveryBoySchemaValidation } from "../validations/deliveryBoy.validation.js";
import { Order } from "../models/order.model.js";

export const addingDeliveryBoyDetails = async (req, res) => {
    try {

        const value = await deliveryBoySchemaValidation.validateAsync(req.body);
        if(!value) return res.status(400).json({ success: false, message: "cannot get any value."} );

        const { userId, vehicleType, licenseNumber, address, phone, rating, activeStatus } = value;
        

        const deliveryBoy = await DeliveryBoy.create({
            userId,
            vehicleType,
            licenseNumber,
            address,
            phone,
            rating,
            activeStatus
        })

        if(!deliveryBoy) return res.status(400).json({
            success: false,
            message: "Failed to add delivery boy details."
        })

        res.status(201).json({
            success: true,
            message: "Delivery boy details added successfully." 
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: `sever error something went wrong: ${error}`
        })
        console.log(`error while adding delivery boy details: ${error}`);
        
    }
}

export const givingDeliveryRole = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        if(user.role != "delivery") {

              const updatedRole = await User.findByIdAndUpdate(req.user, { $set: { role: "delivery" }}, { new: true });

              if(!updatedRole) return res.status(400).json({ success: false, message: "Failed to update role."});

              res.status(201).json({
                    success: true,
                    updatedRole: updatedRole
              })
        }
      
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })

        console.log(`error while giving delivery role :${error}`);
        
    }
}

// Owner assign order food to delivery boy.

export const ownerAssignOrderFoodToDeliveryBoy = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { deliveryBoyId } = req.body;

        console.log(`orderId: ${orderId}`);
        console.log(`deliveryBoyId: ${deliveryBoyId}`);
        

        const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
        if(!isValidOrderId) return res.status(400).json({
            success: false,
            message: "Invalid order id."
        })

        if(!deliveryBoyId) return res.status(400).json({
            success: false, 
            message: "please provide delivery boy id."
        })

        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({
            success: false,
            message: "order not found."
        })

        const deliveryBoy = await User.findById(deliveryBoyId);
        if(!deliveryBoy) return res.status(404).json({
            success: false,
            message: "delivery boy not found."
        })

        order.assignedTo = deliveryBoyId;
        await order.save();
        
        res.status(200).json({
            success: true,
            assignedOrderToDeliveryBoy: order
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error}`
        })

        console.log(`error while owner assign order food to delivery boy : ${error}`);
        
    }
}
 
// Delivery boy fetching assigned orders.

export const deliveryBoyFetchingAssignOrder = async (req, res) => {
        try {
            const { id } = req.params;
            const assignOrder = await Order.findOne({assignedTo: id});
            const isValidDeliveryBoyId = mongoose.Types.ObjectId.isValid(id);
            
            if(!isValidDeliveryBoyId) return res.status(400).json({
                success: false,
                message: "Invalid delivery boy id."
            })
            
            if(!assignOrder) return res.status({
                success: false,
                message: "any order are not assign to delivery boy."
            })

            res.status(200).json({
                success: true,
                assignOrder: assignOrder 
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: `server error something went wrong: ${error}`
            })

            console.log(`error while delivery boy fetching assign order: ${error}`);
            
        }
}

// Delivery boy updating ordered food status.

export const deliveryBoyUpdatingOrderStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { orderStatus } = req.body;
            
            const isValidDeliveryBoyId = mongoose.Types.ObjectId.isValid(id);
            if(!isValidDeliveryBoyId) return res.status(400).json({
                success: false,
                message: "Invalid delivery boy id."
            })
            

        //    const updatedAssignOrderStatus = await Order.findOneAndUpdate(
        //     { assignedTo: id },
        //     { orderStatus },
        //     { new: true }
// );

        const updatedAssignOrderStatus = await Order.updateOne({
            assignedTo: id
        }, {
            $set: { orderStatus }
        })

        if (!updatedAssignOrderStatus) {
        return res.status(400).json({
            success: false,
            message: "Failed to update order status"
        });
        }

        res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        updatedAssignOrderStatus
        });


        } catch (error) {
            res.status(500).json({
                success: false,
                message: `server error something went wrong : ${error}`
            })
            console.log(`error while delivery boy updating order food status :${error}`);
            
        }
}


