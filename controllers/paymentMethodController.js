import {
    getPaymentMethodById,
    getPaymentMethods,
} from "../services/paymentMethodService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";

export const getAllPaymentMethods = asyncHandler(
    async (req, res) => {
        const paymentMethods = await getPaymentMethods();
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_METHOD_FETCHED,
            {
                data: paymentMethods,
            }
        );
    }
);

export const getPaymentMethod = asyncHandler(
    async (req, res) => {
        const paymentMethod =
            await getPaymentMethodById(
                Number(req.params.id)
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_METHOD_FETCHED,
            {
                data: paymentMethod,
            }
        );
    }
);