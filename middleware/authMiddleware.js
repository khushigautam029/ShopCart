import jwt from "jsonwebtoken";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.AUTHENTICATION_REQUIRED,
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            message: MESSAGES.INVALID_TOKEN,
        });
    }
};

export default protect;