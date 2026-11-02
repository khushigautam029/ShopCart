import Joi from "joi";

export const createReviewSchema = Joi.object({
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),

    comment: Joi.string()
        .trim()
        .max(2000)
        .allow("", null),
});

export const updateReviewSchema = Joi.object({
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5),

    comment: Joi.string()
        .trim()
        .max(2000)
        .allow("", null),
}).min(1);