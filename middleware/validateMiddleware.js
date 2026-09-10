import { sendError } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], {
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
        req[source] = value;
        next();
    };
};

export default validate;
