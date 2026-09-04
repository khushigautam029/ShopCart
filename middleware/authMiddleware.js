import jwt from "jsonwebtoken";
import { sendError } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendError(
                res,
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.AUTHENTICATION_REQUIRED
            );
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.UNAUTHORIZED,
            MESSAGES.INVALID_TOKEN
        );
    }
};

export default protect;