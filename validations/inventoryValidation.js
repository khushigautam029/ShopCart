import Joi from "joi";

export const updateInventorySchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Quantity must be a number",
            "number.integer": "Quantity must be an integer",
            "number.min": "Quantity cannot be negative",
            "any.required": "Quantity is required",
        }),

    reservedQuantity: Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            "number.base": "Reserved quantity must be a number",
            "number.integer": "Reserved quantity must be an integer",
            "number.min": "Reserved quantity cannot be negative",
        }),
});