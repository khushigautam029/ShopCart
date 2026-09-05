import Joi from "joi";

export const createAddressSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 2 characters",
            "string.max": "Full name cannot exceed 50 characters",
            "any.required": "Full name is required",
        }),

    addressLine1: Joi.string()
        .trim()
        .min(5)
        .max(255)
        .required()
        .messages({
            "string.empty": "Address line 1 is required",
            "string.min":
                "Address line 1 must be at least 5 characters",
            "string.max":
                "Address line 1 cannot exceed 255 characters",
            "any.required": "Address line 1 is required",
        }),

    addressLine2: Joi.string()
        .trim()
        .max(255)
        .allow("")
        .optional()
        .messages({
            "string.max":
                "Address line 2 cannot exceed 255 characters",
        }),

    city: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "City is required",
            "string.min": "City must be at least 2 characters",
            "string.max": "City cannot exceed 50 characters",
            "any.required": "City is required",
        }),

    state: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "State is required",
            "string.min": "State must be at least 2 characters",
            "string.max": "State cannot exceed 50 characters",
            "any.required": "State is required",
        }),

    postalCode: Joi.string()
        .pattern(/^[1-9][0-9]{5}$/)
        .required()
        .messages({
            "string.empty": "Postal code is required",
            "string.pattern.base":
                "Postal code must be a valid 6-digit number",
            "any.required": "Postal code is required",
        }),

    country: Joi.string()
        .trim()
        .max(100)
        .optional()
        .messages({
            "string.max": "Country cannot exceed 100 characters",
        }),

    addressType: Joi.string()
        .valid("HOME", "WORK", "OTHER")
        .optional()
        .messages({
            "any.only":
                "Address type must be HOME, WORK, or OTHER",
        }),

    isDefault: Joi.boolean()
        .optional()
        .messages({
            "boolean.base":
                "isDefault must be true or false",
        }),
});

export const updateAddressSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            "string.empty": "Full name cannot be empty",
            "string.min": "Full name must be at least 2 characters",
            "string.max": "Full name cannot exceed 50 characters",
        }),

    addressLine1: Joi.string()
        .trim()
        .min(5)
        .max(255)
        .optional()
        .messages({
            "string.empty":
                "Address line 1 cannot be empty",
            "string.min":
                "Address line 1 must be at least 5 characters",
            "string.max":
                "Address line 1 cannot exceed 255 characters",
        }),

    addressLine2: Joi.string()
        .trim()
        .max(255)
        .allow("")
        .optional()
        .messages({
            "string.max":
                "Address line 2 cannot exceed 255 characters",
        }),

    city: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            "string.empty": "City cannot be empty",
            "string.min": "City must be at least 2 characters",
            "string.max": "City cannot exceed 50 characters",
        }),

    state: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            "string.empty": "State cannot be empty",
            "string.min": "State must be at least 2 characters",
            "string.max": "State cannot exceed 50 characters",
        }),

    postalCode: Joi.string()
        .pattern(/^[1-9][0-9]{5}$/)
        .optional()
        .messages({
            "string.empty":
                "Postal code cannot be empty",
            "string.pattern.base":
                "Postal code must be a valid 6-digit number",
        }),

    country: Joi.string()
        .trim()
        .max(100)
        .optional()
        .messages({
            "string.empty": "Country cannot be empty",
            "string.max":
                "Country cannot exceed 100 characters",
        }),

    addressType: Joi.string()
        .valid("HOME", "WORK", "OTHER")
        .optional()
        .messages({
            "any.only":
                "Address type must be HOME, WORK, or OTHER",
        }),

    isDefault: Joi.boolean()
        .optional()
        .messages({
            "boolean.base":
                "isDefault must be true or false",
        }),
})
    .min(1)
    .messages({
        "object.min":
            "At least one field is required to update the address",
    });
