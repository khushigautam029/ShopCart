import {
    getPaymentById,
    getPaymentsByUser,
} from "../services/paymentService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const getMyPayments = async (req, res) => {
    try {
        const payments = await getPaymentsByUser(req.user.id);
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_FETCHED,
            { data: payments }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

export const getMyPaymentById = async (req, res) => {
    try {
        const payment = await getPaymentById(
            req.user.id,
            req.params.id
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_FETCHED,
            { data: payment }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
};