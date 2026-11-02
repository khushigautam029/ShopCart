import Joi from "joi";

export const updateOrderStatusSchema = Joi.object({
    status: Joi.string()
        .valid(
            "PACKED",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED"
        )
        .required()
        .messages({
            "any.only":
                "Status must be PACKED, SHIPPED, OUT_FOR_DELIVERY, or DELIVERED",
            "any.required":
                "Order status is required",
        }),

    note: Joi.string()
        .max(255)
        .allow("", null)
        .optional()
        .messages({
            "string.max":
                "Note cannot exceed 255 characters",
        }),
});