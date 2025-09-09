import Joi from "joi";

export const deliveryBoySchemaValidation = Joi.object({
    userId: Joi.string()
    .required(),
    vehicleType: Joi.string()
    .default("motorbike")
    .required(),
    licenseNumber: Joi.string()
    .required(),
    address: Joi.string(),
    phone: Joi.string()
    .max(13)
    .required(),
    rating: Joi.number()
    .default(0),
    activeStatus: Joi.boolean()
    .default(false)
})
