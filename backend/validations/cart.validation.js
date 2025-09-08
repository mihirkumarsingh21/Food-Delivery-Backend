import Joi from "joi";

export const cartSchemaValidation = Joi.object({
    
        userId: Joi.string()
        .required(),

        items: Joi.array()
        .items( Joi.object({

            productId: Joi.string()
            .required(),

            price: Joi.number(),

            quantity: Joi.number()
            .min(1),

            subTotal: Joi.number()

        })),

        totalAmount: Joi.number(),
        address: Joi.string(),
        orderStatus: Joi.string()
        .default("pending")
})
