import {
    createPayment,
    getPaymentById,
    getPaymentsByUser,
} from "../services/paymentService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";

export const makePayment = asyncHandler(
    async (req, res) => {
        const {
            orderId,
            paymentMethodId,
        } = req.body;
        const payment = await createPayment(
            req.user.id,
            Number(orderId),
            Number(paymentMethodId)
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.PAYMENT_CREATED,
            {
                data: payment,
            }
        );
    }
);

export const getMyPayments = asyncHandler(
    async (req, res) => {
        const payments =
            await getPaymentsByUser(req.user.id);
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_FETCHED,
            {
                data: payments,
            }
        );
    }
);

export const getMyPaymentById = asyncHandler(
    async (req, res) => {
        const payment =
            await getPaymentById(
                req.user.id,
                Number(req.params.id)
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_FETCHED,
            {
                data: payment,
            }
        );
    }
);