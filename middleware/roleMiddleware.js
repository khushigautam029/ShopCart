import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.AUTHENTICATION_REQUIRED,
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(STATUS_CODES.FORBIDDEN).json({
                success: false,
                message: MESSAGES.ACCESS_DENIED,
            });
        }
        next();
    };
};

export default authorizeRoles;