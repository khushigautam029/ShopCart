import Joi from "joi";

export const checkoutSchema = Joi.object({
    addressId: Joi.number()
        .integer()
        .positive()
        .required(),

    paymentMethodId: Joi.number()
        .integer()
        .positive()
        .required(),
});