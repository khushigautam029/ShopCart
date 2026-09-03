import Joi from "joi";

export const createProductImageSchema = Joi.object({
    imageUrl: Joi.string()
        .trim()
        .max(500)
        .required()
        .messages({
            "string.empty": "Image URL is required",
            "string.max": "Image URL cannot exceed 500 characters",
            "any.required": "Image URL is required",
        }),

    isPrimary: Joi.boolean()
        .optional()
        .default(false),

    sortOrder: Joi.number()
        .integer()
        .min(0)
        .optional()
        .default(0),
});

export const updateProductImageSchema = Joi.object({
    imageUrl: Joi.string()
        .trim()
        .max(500)
        .optional(),

    isPrimary: Joi.boolean()
        .optional(),

    sortOrder: Joi.number()
        .integer()
        .min(0)
        .optional(),
}).min(1);