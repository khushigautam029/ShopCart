import Joi from "joi";

export const createOrderSchema = Joi.object({
    addressId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Address ID must be a number",
            "number.integer": "Address ID must be an integer",
            "number.positive": "Address ID must be greater than 0",
            "any.required": "Address ID is required",
        }),

    paymentMethod: Joi.string()
        .valid("COD", "CARD")
        .required()
        .messages({
            "any.only": "Payment method must be COD or CARD",
            "any.required": "Payment method is required",
        }),

    paymentMethodId: Joi.number()
        .integer()
        .positive()
        .when("paymentMethod", {
            is: "CARD",
            then: Joi.required(),
            otherwise: Joi.optional(),
        })
        .messages({
            "number.base": "Payment method ID must be a number",
            "number.integer": "Payment method ID must be an integer",
            "number.positive": "Payment method ID must be greater than 0",
            "any.required":
                "Payment method ID is required for card payment",
        }),
});