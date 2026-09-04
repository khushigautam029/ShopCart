import {
    addPaymentMethod,
    deletePaymentMethod,
    getPaymentMethods,
    setDefaultPaymentMethod,
} from "../services/paymentMethodService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const createPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await addPaymentMethod(
            req.user.id,
            req.body
        );

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.PAYMENT_METHOD_ADDED,
            data: paymentMethod,
        });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await getPaymentMethods(
            req.user.id
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PAYMENT_METHOD_FETCHED,
            data: paymentMethods,
        });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const removePaymentMethod = async (req, res) => {
    try {
        await deletePaymentMethod(
            req.user.id,
            req.params.id
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PAYMENT_METHOD_DELETED,
        });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const makeDefaultPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await setDefaultPaymentMethod(
            req.user.id,
            req.params.id
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.DEFAULT_PAYMENT_METHOD_UPDATED,
            data: paymentMethod,
        });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};