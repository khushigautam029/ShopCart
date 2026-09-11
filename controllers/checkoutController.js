import { checkout } from "../services/checkoutService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";

export const checkoutOrder = asyncHandler(
    async (req, res) => {
        const result = await checkout(
            req.user.id,
            req.body
        );

        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.ORDER_PLACED,
            {
                data: result,
            }
        );
    }
);