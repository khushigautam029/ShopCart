import { sendError } from "./responseHandler.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return sendError(
        res,
        statusCode,
        err.message || "Internal Server Error",
        err.errors || null
    );
};

export default errorHandler;