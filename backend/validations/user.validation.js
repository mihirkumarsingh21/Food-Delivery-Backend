import Joi from "joi";


export const userSchemaValidation = Joi.object({

    name: Joi.string()
    .min(4)
    .max(10)
    .required(),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    profilePic: Joi.string(),

    email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
    .required()
    .lowercase(),

    role: Joi.string()
    .default("customer"),

    passwordResetToken: Joi.string(),
    passwordResetTokenExpAt: Joi.date()

    
})