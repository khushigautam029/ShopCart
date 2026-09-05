import Joi from "joi";

export const loginSchema = Joi.object({
    phone: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Please provide a valid 10-digit Indian phone number",
            "any.required": "Phone number is required",
        }),
});

export const verifyOtpSchema = Joi.object({
    phone: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Please provide a valid 10-digit Indian phone number",
            "any.required": "Phone number is required",
        }),

    otp: Joi.string()
        .trim()
        .length(6)
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            "string.empty": "OTP is required",
            "string.length": "OTP must be exactly 6 digits",
            "string.pattern.base":
                "OTP must contain only numbers",
            "any.required": "OTP is required",
        }),
});

