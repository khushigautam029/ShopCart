import joi from "joi";

export const createProductSchema = joi.object({
    categoryId: joi.number().integer().positive().required().messages({
        "number.base":"Category id number be number",
        "number.integer":"Category id must be an integer",
        "number.positive":"Category id must be a positive number",
        "any.required":"Category id is required",
    }),
    name: joi.string().trim().min(3).max(100).required().messages({
        "string.empty":"Product name is required",
        "string.min":"Product name must be of 3 character",
        "string.max":"Product name must be of 100 character",
        "any.required":"Product name is required",
    }),
    description: joi.string().trim().allow("").max(5000).optional(),
    price: joi.number().positive().precision(2).required().messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
            "any.required": "Price is required",
    }),
});

export const updateProductSchema = joi.object({
    categoryId:joi.number().integer().positive().optional(),
    name:joi.string().trim().min(3).max(100).optional(),
    description:joi.string().trim().allow("").max(5000).optional(),
    price: joi.number().positive().precision(2).optional(),
    status:joi.string().valid("ACTIVE","INACTIVE").optional(),
}).min(1);