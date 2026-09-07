import {
    getOrderStatusHistory,
} from "../services/orderStatusHistoryService.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
    sendSuccess,
} from "../utils/responseHandler.js";
import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";

export const getCustomerOrderStatusHistory =
    asyncHandler(async (req, res) => {
        const { orderId } = req.params;
        const history =
            await getOrderStatusHistory(
                req.user.id,
                Number(orderId)
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ORDER_STATUS_HISTORY_FETCHED,
            {
                data: history,
        }
    );
});

