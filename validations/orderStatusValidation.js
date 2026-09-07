import Joi from "joi";

export const updateOrderStatusSchema = Joi.object({
    status: Joi.string()
        .valid(
            "PENDING",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        )
        .required(),

    note: Joi.string()
        .max(255)
        .allow("", null)
        .optional(),
});
