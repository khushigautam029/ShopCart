import PaymentMethod from "../models/PaymentMethod.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const getPaymentMethods = async () => {
    return await PaymentMethod.findAll({
        where: {
            isActive: true,
        },
        attributes: [
            "id",
            "name",
            "code",
            "type",
            "isActive",
        ],
        order: [["id", "ASC"]],
    });
};

export const getPaymentMethodById = async (paymentMethodId) => {
    const paymentMethod = await PaymentMethod.findOne({
        where: {
            id: paymentMethodId,
            isActive: true,
        },
        attributes: [
            "id",
            "name",
            "code",
            "type",
            "isActive",
        ],
    });
    if (!paymentMethod) {
        throw new AppError(
            "Payment method not found or inactive",
            STATUS_CODES.NOT_FOUND
        );
    }
    return paymentMethod;
};