import Joi from "joi";

export const createAttributeValueSchema = Joi.object({
    value: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            "string.empty": "Attribute value is required",
            "string.min": "Attribute value must be at least 1 character",
            "string.max":
                "Attribute value cannot exceed 100 characters",
            "any.required": "Attribute value is required",
        }),
});

export const updateAttributeValueSchema = Joi.object({
    value: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            "string.empty": "Attribute value is required",
            "string.min": "Attribute value must be at least 1 character",
            "string.max":
                "Attribute value cannot exceed 100 characters",
            "any.required": "Attribute value is required",
        }),
});