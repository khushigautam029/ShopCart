import { sendError } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return sendError(
                res,
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.AUTHENTICATION_REQUIRED
            );
        }
        if (!roles.includes(req.user.role)) {
            return sendError(
                res,
                STATUS_CODES.FORBIDDEN,
                MESSAGES.ACCESS_DENIED
            );
        }
        next();
    };
};

export default authorizeRoles;