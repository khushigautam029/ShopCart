import Joi from "joi";

export const createAttributeSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Attribute name is required",
            "string.min": "Attribute name must be at least 2 characters",
            "string.max": "Attribute name cannot exceed 100 characters",
            "any.required": "Attribute name is required",
        }),
});

export const updateAttributeSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Attribute name is required",
            "string.min": "Attribute name must be at least 2 characters",
            "string.max": "Attribute name cannot exceed 100 characters",
            "any.required": "Attribute name is required",
        }),
});