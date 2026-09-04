import {
    getPaymentById,
    getPaymentsByUser,
} from "../services/paymentService.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const getMyPayments = async (req, res) => {
    try {
        const payments = await getPaymentsByUser(req.user.id);

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Payments fetched successfully",
            data: payments,
        });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyPaymentById = async (req, res) => {
    try {
        const payment = await getPaymentById(
            req.user.id,
            req.params.id
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Payment fetched successfully",
            data: payment,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};