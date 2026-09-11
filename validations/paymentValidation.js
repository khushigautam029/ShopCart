import Joi from "joi";

export const createPaymentSchema = Joi.object({
    orderId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base":
                "Order ID must be a number",

            "number.integer":
                "Order ID must be an integer",

            "number.positive":
                "Order ID must be greater than 0",

            "any.required":
                "Order ID is required",
        }),

    paymentMethodId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base":
                "Payment method ID must be a number",

            "number.integer":
                "Payment method ID must be an integer",

            "number.positive":
                "Payment method ID must be greater than 0",

            "any.required":
                "Payment method ID is required",
        }),
});