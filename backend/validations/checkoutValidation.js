import Joi from "joi";

export const checkoutSchema = Joi.object({
    addressId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Address ID must be a number",
            "number.integer": "Address ID must be an integer",
            "number.positive": "Address ID must be a positive number",
            "any.required": "Address ID is required",
        }),

    couponCode: Joi.string()
        .trim()
        .uppercase()
        .min(3)
        .max(50)
        .optional()
        .allow("")
        .messages({
            "string.empty": "Coupon code cannot be empty",
            "string.min":
                "Coupon code must be at least 3 characters",
            "string.max":
                "Coupon code must not exceed 50 characters",
        }),
}).messages({
    "object.unknown": "Unknown field is not allowed",
});