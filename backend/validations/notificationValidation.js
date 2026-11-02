import Joi from "joi";

const createNotificationSchema = Joi.object({
    userId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "User ID must be a number",
            "number.integer": "User ID must be an integer",
            "number.positive": "User ID must be a positive number",
            "any.required": "User ID is required",
        }),

    title: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "Notification title must be a string",
            "string.empty": "Notification title cannot be empty",
            "string.min": "Notification title must be at least 3 characters",
            "string.max": "Notification title cannot exceed 255 characters",
            "any.required": "Notification title is required",
        }),

    message: Joi.string()
        .trim()
        .min(3)
        .required()
        .messages({
            "string.base": "Notification message must be a string",
            "string.empty": "Notification message cannot be empty",
            "string.min": "Notification message must be at least 3 characters",
            "any.required": "Notification message is required",
        }),

    type: Joi.string()
        .trim()
        .valid(
            "ORDER",
            "PAYMENT",
            "SHIPPING",
            "DELIVERY",
            "CANCELLATION",
            "GENERAL"
        )
        .required()
        .messages({
            "string.base": "Notification type must be a string",
            "string.empty": "Notification type cannot be empty",
            "any.only":
                "Notification type must be one of ORDER, PAYMENT, SHIPPING, DELIVERY, CANCELLATION, or GENERAL",
            "any.required": "Notification type is required",
        }),
});

const notificationIdSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Notification ID must be a number",
            "number.integer": "Notification ID must be an integer",
            "number.positive": "Notification ID must be a positive number",
            "any.required": "Notification ID is required",
        }),
});

export {
    createNotificationSchema,
    notificationIdSchema
};
