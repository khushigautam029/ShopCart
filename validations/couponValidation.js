import Joi from "joi";

export const createCouponSchema = Joi.object({
    code: Joi.string()
        .trim()
        .uppercase()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty":
                "Coupon code is required",
            "string.min":
                "Coupon code must be at least 3 characters",
            "string.max":
                "Coupon code must not exceed 50 characters",
            "any.required":
                "Coupon code is required",
        }),

    discountType: Joi.string()
        .valid("FLAT", "PERCENTAGE")
        .required()
        .messages({
            "any.only":
                "Discount type must be either FLAT or PERCENTAGE",
            "any.required":
                "Discount type is required",
        }),

    discountValue: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            "number.base":
                "Discount value must be a number",
            "number.positive":
                "Discount value must be greater than 0",
            "number.precision":
                "Discount value can have a maximum of 2 decimal places",
            "any.required":
                "Discount value is required",
        }),

    minOrderAmount: Joi.number()
        .min(0)
        .precision(2)
        .optional()
        .default(0)
        .messages({
            "number.base":
                "Minimum order amount must be a number",
            "number.min":
                "Minimum order amount cannot be less than 0",
            "number.precision":
                "Minimum order amount can have a maximum of 2 decimal places",
        }),

    maxDiscount: Joi.number()
        .positive()
        .precision(2)
        .optional()
        .allow(null)
        .messages({
            "number.base":
                "Maximum discount must be a number",
            "number.positive":
                "Maximum discount must be greater than 0",
            "number.precision":
                "Maximum discount can have a maximum of 2 decimal places",
        }),

    startDate: Joi.date()
        .required()
        .messages({
            "date.base":
                "Start date must be a valid date",
            "any.required":
                "Start date is required",
        }),

    endDate: Joi.date()
        .greater(Joi.ref("startDate"))
        .required()
        .messages({
            "date.base":
                "End date must be a valid date",
            "date.greater":
                "End date must be after start date",
            "any.required":
                "End date is required",
        }),

    usageLimit: Joi.number()
        .integer()
        .positive()
        .optional()
        .allow(null)
        .messages({
            "number.base":
                "Usage limit must be a number",
            "number.integer":
                "Usage limit must be a whole number",
            "number.positive":
                "Usage limit must be greater than 0",
        }),

    status: Joi.string()
        .valid("ACTIVE", "INACTIVE")
        .optional()
        .default("ACTIVE")
        .messages({
            "any.only":
                "Status must be either ACTIVE or INACTIVE",
        }),
}).messages({
    "object.unknown":
        "Unknown field is not allowed",
});


export const updateCouponSchema = Joi.object({
    code: Joi.string()
        .trim()
        .uppercase()
        .min(3)
        .max(50)
        .optional()
        .messages({
            "string.empty":
                "Coupon code cannot be empty",
            "string.min":
                "Coupon code must be at least 3 characters",
            "string.max":
                "Coupon code must not exceed 50 characters",
        }),

    discountType: Joi.string()
        .valid("FLAT", "PERCENTAGE")
        .optional()
        .messages({
            "any.only":
                "Discount type must be either FLAT or PERCENTAGE",
        }),

    discountValue: Joi.number()
        .positive()
        .precision(2)
        .optional()
        .messages({
            "number.base":
                "Discount value must be a number",
            "number.positive":
                "Discount value must be greater than 0",
            "number.precision":
                "Discount value can have a maximum of 2 decimal places",
        }),

    minOrderAmount: Joi.number()
        .min(0)
        .precision(2)
        .optional()
        .messages({
            "number.base":
                "Minimum order amount must be a number",
            "number.min":
                "Minimum order amount cannot be less than 0",
            "number.precision":
                "Minimum order amount can have a maximum of 2 decimal places",
        }),

    maxDiscount: Joi.number()
        .positive()
        .precision(2)
        .optional()
        .allow(null)
        .messages({
            "number.base":
                "Maximum discount must be a number",
            "number.positive":
                "Maximum discount must be greater than 0",
            "number.precision":
                "Maximum discount can have a maximum of 2 decimal places",
        }),

    startDate: Joi.date()
        .optional()
        .messages({
            "date.base":
                "Start date must be a valid date",
        }),

    endDate: Joi.date()
        .optional()
        .messages({
            "date.base":
                "End date must be a valid date",
        }),

    usageLimit: Joi.number()
        .integer()
        .positive()
        .optional()
        .allow(null)
        .messages({
            "number.base":
                "Usage limit must be a number",
            "number.integer":
                "Usage limit must be a whole number",
            "number.positive":
                "Usage limit must be greater than 0",
        }),

    status: Joi.string()
        .valid("ACTIVE", "INACTIVE")
        .optional()
        .messages({
            "any.only":
                "Status must be either ACTIVE or INACTIVE",
        }),
})
    .min(1)
    .messages({
        "object.min":
            "At least one field is required to update the coupon",
        "object.unknown":
            "Unknown field is not allowed",
    });


export const applyCouponSchema = Joi.object({
    code: Joi.string()
        .trim()
        .uppercase()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty":
                "Coupon code is required",
            "string.min":
                "Coupon code must be at least 3 characters",
            "string.max":
                "Coupon code must not exceed 50 characters",
            "any.required":
                "Coupon code is required",
        }),
}).messages({
    "object.unknown":
        "Unknown field is not allowed",
});
