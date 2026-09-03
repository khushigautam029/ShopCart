import Joi from "joi";

export const createAddressSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 2 characters",
            "string.max": "Full name cannot exceed 100 characters",
            "any.required": "Full name is required",
        }),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Please enter a valid 10-digit Indian phone number",
            "any.required": "Phone number is required",
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
        .optional(),

    city: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "City is required",
            "any.required": "City is required",
        }),

    state: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "State is required",
            "any.required": "State is required",
        }),

    postalCode: Joi.string()
        .pattern(/^[1-9][0-9]{5}$/)
        .required()
        .messages({
            "string.empty": "Postal code is required",
            "string.pattern.base":
                "Please enter a valid 6-digit postal code",
            "any.required": "Postal code is required",
        }),

    country: Joi.string()
        .trim()
        .max(100)
        .optional(),

    addressType: Joi.string()
        .valid("HOME", "WORK", "OTHER")
        .optional(),

    isDefault: Joi.boolean()
        .optional(),
});

export const updateAddressSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .optional(),

    addressLine1: Joi.string()
        .trim()
        .min(5)
        .max(255)
        .optional(),

    addressLine2: Joi.string()
        .trim()
        .max(255)
        .allow("")
        .optional(),

    city: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    state: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    postalCode: Joi.string()
        .pattern(/^[1-9][0-9]{5}$/)
        .optional(),

    country: Joi.string()
        .trim()
        .max(100)
        .optional(),

    addressType: Joi.string()
        .valid("HOME", "WORK", "OTHER")
        .optional(),

    isDefault: Joi.boolean()
        .optional(),
}).min(1);