import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import PaymentMethod from "../models/PaymentMethod.js";

export const getPaymentsByUser = async (userId) => {
    return await Payment.findAll({
        where: {
            userId,
        },
        include: [
            {
                model: Order,
                as: "order",
                attributes: [
                    "id",
                    "orderNumber",
                    "totalAmount",
                    "status",
                ],
            },
            {
                model: PaymentMethod,
                as: "paymentMethod",
                attributes: [
                    "id",
                    "type",
                    "provider",
                    "last4",
                    "cardBrand",
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};

export const getPaymentById = async (userId, paymentId) => {
    const payment = await Payment.findOne({
        where: {
            id: paymentId,
            userId,
        },
        include: [
            {
                model: Order,
                as: "order",
                attributes: [
                    "id",
                    "orderNumber",
                    "totalAmount",
                    "status",
                ],
            },
            {
                model: PaymentMethod,
                as: "paymentMethod",
                attributes: [
                    "id",
                    "type",
                    "provider",
                    "last4",
                    "cardBrand",
                ],
            },
        ],
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    return payment;
};