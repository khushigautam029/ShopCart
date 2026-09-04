import Joi from "joi";

export const addToCartSchema = Joi.object({
    variantId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Variant ID must be a number",
            "number.integer": "Variant ID must be an integer",
            "number.positive": "Variant ID must be greater than 0",
            "any.required": "Variant ID is required",
        }),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Quantity must be a number",
            "number.integer": "Quantity must be an integer",
            "number.min": "Quantity must be at least 1",
            "any.required": "Quantity is required",
        }),
});


export const updateCartItemSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Quantity must be a number",
            "number.integer": "Quantity must be an integer",
            "number.min": "Quantity must be at least 1",
            "any.required": "Quantity is required",
        }),
});