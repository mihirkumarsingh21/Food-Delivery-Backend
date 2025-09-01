import Joi from "joi";

export const cartSchemaValidation = Joi.object({
        userId: Joi.string()
        .required(),

        items: Joi.array()
        .items( Joi.object({
            productId: Joi.string()
            .required(),

            price: Joi.number()
            .required(),

            quantity: Joi.number()
            .min(1)
        }) )


})
