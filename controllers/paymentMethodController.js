import {
    addPaymentMethod,
    deletePaymentMethod,
    getPaymentMethods,
    setDefaultPaymentMethod,
} from "../services/paymentMethodService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const createPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await addPaymentMethod(
            req.user.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.PAYMENT_METHOD_ADDED,
            { data: paymentMethod }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

export const getMyPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await getPaymentMethods(
            req.user.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_METHOD_FETCHED,
            { data: paymentMethods }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

export const removePaymentMethod = async (req, res) => {
    try {
        await deletePaymentMethod(
            req.user.id,
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PAYMENT_METHOD_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

export const makeDefaultPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await setDefaultPaymentMethod(
            req.user.id,
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.DEFAULT_PAYMENT_METHOD_UPDATED,
            { data: paymentMethod }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};