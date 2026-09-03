import joi from "joi";

export const categorySchema = joi.object({
    name: joi.string().trim().min(3).max(100).required().messages({
        "string.empty": "Category name is required",
        "string.min": "Category name must be at least 3 characters long",
        "string.max": "Category name must not exceed 100 characters",
        "any.required": "Category name is required",
    }),
    description: joi.string().trim().allow("").max(1000).optional().messages({
        "string.max": "Description must not exceed 1000 characters",
    }),
    image: joi.string().trim().allow("").max(255).optional().messages({
        "string.max": "Image URL must not exceed 255 characters",
    })
});

export const updateCategorySchema = joi.object({
    name: joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    description: joi.string()
        .trim()
        .allow("")
        .max(1000)
        .optional(),

    image: joi.string()
        .trim()
        .allow("")
        .max(255)
        .optional(),

    status: joi.string()
        .valid("ACTIVE", "INACTIVE")
        .optional(),
}).min(1);