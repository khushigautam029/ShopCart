import Joi from "joi";

export const createProductVariantSchema = Joi.object({
    sku: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "SKU is required",
            "string.min": "SKU must be at least 2 characters",
            "string.max": "SKU cannot exceed 100 characters",
            "any.required": "SKU is required",
        }),

    price: Joi.number()
        .positive()
        .precision(2)
        .optional()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
        }),

    status: Joi.string()
        .valid("ACTIVE", "INACTIVE")
        .optional(),

    attributeValueIds: Joi.array()
        .items(
            Joi.number()
                .integer()
                .positive()
        )
        .min(1)
        .required()
        .messages({
            "array.min":
                "At least one attribute value is required",
            "any.required":
                "Attribute values are required",
        }),
});

export const updateProductVariantSchema = Joi.object({
    sku: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    price: Joi.number()
        .positive()
        .precision(2)
        .optional(),

    status: Joi.string()
        .valid("ACTIVE", "INACTIVE")
        .optional(),

    attributeValueIds: Joi.array()
        .items(
            Joi.number()
                .integer()
                .positive()
        )
        .min(1)
        .optional(),
}).min(1);