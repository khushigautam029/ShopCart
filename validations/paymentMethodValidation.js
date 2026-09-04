import Joi from "joi";

export const addPaymentMethodSchema = Joi.object({
    type: Joi.string()
        .valid("CARD")
        .required(),

    provider: Joi.string()
        .valid("STRIPE")
        .required(),

    providerPaymentMethodId: Joi.string()
        .trim()
        .required(),
});