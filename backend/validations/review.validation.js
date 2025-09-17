import Joi from "joi";


export const validationReviewSchema = Joi.object({

    userId: Joi.string(),

    productId: Joi.string(),

    rating: Joi.number(),
    // .required(),

    comment: Joi.string()
})
