import Joi from "joi";

export const foodProductSchemaValidation = Joi.object({
    name: Joi.string()
    .required()
    .min(3)
    .max(20),

    description: Joi.string()
    .min(3),

    price: Joi.number()
    .required(),

    category: Joi.string()
    .required(),

    isAailable: Joi.boolean()
    .default(true)
})