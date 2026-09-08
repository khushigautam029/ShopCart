import joi from "joi";

export const createProductSchema = joi
    .object({
        categoryId: joi
            .number()
            .integer()
            .positive()
            .required()
            .messages({
                "number.base":
                    "Category ID must be a number",
                "number.integer":
                    "Category ID must be an integer",
                "number.positive":
                    "Category ID must be a positive number",
                "any.required":
                    "Category ID is required",
            }),

        name: joi
            .string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty":
                    "Product name is required",
                "string.min":
                    "Product name must be at least 3 characters",
                "string.max":
                    "Product name must not exceed 100 characters",
                "any.required":
                    "Product name is required",
            }),

        description: joi
            .string()
            .trim()
            .allow("")
            .max(5000)
            .optional()
            .messages({
                "string.max":
                    "Product description must not exceed 5000 characters",
            }),

        brand: joi
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional()
            .allow("")
            .messages({
                "string.empty":
                    "Brand cannot be empty",
                "string.min":
                    "Brand must be at least 2 characters",
                "string.max":
                    "Brand must not exceed 100 characters",
            }),

        gender: joi
            .string()
            .valid(
                "MEN",
                "WOMEN",
                "UNISEX",
                "KIDS"
            )
            .optional()
            .messages({
                "any.only":
                    "Gender must be MEN, WOMEN, UNISEX, or KIDS",
            }),

        price: joi
            .number()
            .positive()
            .precision(2)
            .required()
            .messages({
                "number.base":
                    "Price must be a number",
                "number.positive":
                    "Price must be greater than 0",
                "number.precision":
                    "Price can have a maximum of 2 decimal places",
                "any.required":
                    "Price is required",
            }),

        discount: joi
            .number()
            .min(0)
            .max(100)
            .precision(2)
            .optional()
            .default(0)
            .messages({
                "number.base":
                    "Discount must be a number",
                "number.min":
                    "Discount cannot be less than 0%",
                "number.max":
                    "Discount cannot be greater than 100%",
                "number.precision":
                    "Discount can have a maximum of 2 decimal places",
            }),

        deliveryTime: joi
            .number()
            .integer()
            .positive()
            .optional()
            .messages({
                "number.base":
                    "Delivery time must be a number",
                "number.integer":
                    "Delivery time must be a whole number of days",
                "number.positive":
                    "Delivery time must be greater than 0 days",
            }),
    })
    .messages({
        "object.unknown":
            "Unknown field is not allowed",
    });

export const updateProductSchema = joi
    .object({
        categoryId: joi
            .number()
            .integer()
            .positive()
            .optional()
            .messages({
                "number.base":
                    "Category ID must be a number",
                "number.integer":
                    "Category ID must be an integer",
                "number.positive":
                    "Category ID must be a positive number",
            }),

        name: joi
            .string()
            .trim()
            .min(3)
            .max(100)
            .optional()
            .messages({
                "string.empty":
                    "Product name cannot be empty",
                "string.min":
                    "Product name must be at least 3 characters",
                "string.max":
                    "Product name must not exceed 100 characters",
            }),

        description: joi
            .string()
            .trim()
            .allow("")
            .max(5000)
            .optional()
            .messages({
                "string.max":
                    "Product description must not exceed 5000 characters",
            }),

        brand: joi
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional()
            .allow("")
            .messages({
                "string.empty":
                    "Brand cannot be empty",
                "string.min":
                    "Brand must be at least 2 characters",
                "string.max":
                    "Brand must not exceed 100 characters",
            }),

        gender: joi
            .string()
            .valid(
                "MEN",
                "WOMEN",
                "UNISEX",
                "KIDS"
            )
            .optional()
            .messages({
                "any.only":
                    "Gender must be MEN, WOMEN, UNISEX, or KIDS",
            }),

        price: joi
            .number()
            .positive()
            .precision(2)
            .optional()
            .messages({
                "number.base":
                    "Price must be a number",
                "number.positive":
                    "Price must be greater than 0",
                "number.precision":
                    "Price can have a maximum of 2 decimal places",
            }),

        discount: joi
            .number()
            .min(0)
            .max(100)
            .precision(2)
            .optional()
            .messages({
                "number.base":
                    "Discount must be a number",
                "number.min":
                    "Discount cannot be less than 0%",
                "number.max":
                    "Discount cannot be greater than 100%",
                "number.precision":
                    "Discount can have a maximum of 2 decimal places",
            }),

        deliveryTime: joi
            .number()
            .integer()
            .positive()
            .optional()
            .messages({
                "number.base":
                    "Delivery time must be a number",
                "number.integer":
                    "Delivery time must be a whole number of days",
                "number.positive":
                    "Delivery time must be greater than 0 days",
            }),

        status: joi
            .string()
            .valid("ACTIVE", "INACTIVE")
            .optional()
            .messages({
                "any.only":
                    "Status must be either ACTIVE or INACTIVE",
            }),
    })
    .min(1)
    .messages({
        "object.min":
            "At least one field is required to update the product",
        "object.unknown":
            "Unknown field is not allowed",
    });