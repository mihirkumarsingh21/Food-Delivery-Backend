import Joi from "joi";

export const categorySchemaValidation = Joi.object({

    name: Joi.string()
    .min(3)
    .max(20)
    .required(),
     
    description: Joi.string()
    .min(5)

})

