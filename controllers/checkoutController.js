import { checkout } from "../services/checkoutService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const checkoutOrder = async (req, res) => {
    try {
        const result = await checkout(
            req.user.id,
            req.body
        );

        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.ORDER_PLACED,
            { data: result }
        );
    } catch (error) {
        console.error("Checkout Error:", error);

        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};