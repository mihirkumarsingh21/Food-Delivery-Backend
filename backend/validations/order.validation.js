import Joi from "joi";

export const validationOrderSchema = Joi.object({

    userId: Joi.string(),
    assignedTo: Joi.string(),

    items: Joi.array(),

    totalAmount: Joi.number(),

    addresses: Joi.array()
    .items(Joi.object({

        street: Joi.string()
        .required(),

        city: Joi.string()
        .required(),

        state: Joi.string()
        .required(),

        pincode: Joi.string()
        .required(),

        phone: Joi.string()
        .min(13)
        .required()
        

    })),
    orderStatus: Joi.string()
})

