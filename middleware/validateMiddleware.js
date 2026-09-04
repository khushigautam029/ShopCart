import { sendError } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return sendError(
                res,
                STATUS_CODES.BAD_REQUEST,
                MESSAGES.VALIDATION_FAILED,
                error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message,
                }))
            );
        }
        req.body = value;
        next();
    };
};

export default validate;