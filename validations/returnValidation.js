import Joi from "joi";

// CREATE RETURN
export const createReturnSchema = Joi.object({
    orderId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Order ID must be a number",
            "number.integer": "Order ID must be an integer",
            "number.positive": "Order ID must be a positive number",
            "any.required": "Order ID is required",
        }),

    orderItemId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Order item ID must be a number",
            "number.integer": "Order item ID must be an integer",
            "number.positive": "Order item ID must be a positive number",
            "any.required": "Order item ID is required",
        }),

    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Return quantity must be a number",
            "number.integer": "Return quantity must be an integer",
            "number.positive": "Return quantity must be greater than 0",
            "any.required": "Return quantity is required",
        }),

    reason: Joi.string()
        .valid(
            "DAMAGED",
            "DEFECTIVE",
            "WRONG_ITEM",
            "ITEM_NOT_AS_DESCRIBED",
            "SIZE_ISSUE",
            "CHANGED_MIND",
            "OTHER"
        )
        .required()
        .messages({
            "string.base": "Return reason must be a string",
            "any.only": "Return reason must be DAMAGED, DEFECTIVE, WRONG_ITEM, ITEM_NOT_AS_DESCRIBED, SIZE_ISSUE, CHANGED_MIND, or OTHER",
            "any.required": "Return reason is required",
        }),

    description: Joi.string()
        .trim()
        .max(1000)
        .allow("", null)
        .optional()
        .messages({
            "string.base": "Return description must be a string",
            "string.max": "Return description cannot exceed 1000 characters",
        }),
});

// REJECT RETURN
export const rejectReturnSchema = Joi.object({
    note: Joi.string().trim().max(500).allow("", null).optional()
        .messages({
            "string.base": "Rejection note must be a string",
            "string.max": "Rejection note cannot exceed 500 characters",
        }),
});