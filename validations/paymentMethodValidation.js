import Joi from "joi";

export const addPaymentMethodSchema = Joi.object({
    type: Joi.string()
        .valid("CARD")
        .required()
        .messages({
            "string.empty": "Payment method type is required",
            "any.only": "Payment method type must be CARD",
            "any.required": "Payment method type is required",
        }),

    provider: Joi.string()
        .valid("STRIPE")
        .required()
        .messages({
            "string.empty": "Payment provider is required",
            "any.only": "Payment provider must be STRIPE",
            "any.required": "Payment provider is required",
        }),

    providerPaymentMethodId: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty":
                "Provider payment method ID is required",
            "any.required":
                "Provider payment method ID is required",
        }),
});