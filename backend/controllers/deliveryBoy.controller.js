import { DeliveryBoy } from "../models/deliveryBoy.model.js";
import { deliveryBoySchemaValidation } from "../validations/deliveryBoy.validation.js";

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
