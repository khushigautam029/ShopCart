import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import PaymentMethod from "../models/PaymentMethod.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const createPayment = async (
    userId,
    orderId,
    paymentMethodId
) => {
    // 1. Check order
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId,
        },
    });

    if (!order) {
        throw new AppError(
            "Order not found",
            STATUS_CODES.NOT_FOUND
        );
    }

    // 2. Check if order is already paid
    if (order.paymentStatus === "PAID") {
        throw new AppError(
            "Order is already paid",
            STATUS_CODES.CONFLICT
        );
    }

    // 3. Check payment method
    const paymentMethod = await PaymentMethod.findOne({
        where: {
            id: paymentMethodId,
            isActive: true,
        },
    });

    if (!paymentMethod) {
        throw new AppError(
            "Payment method not found or inactive",
            STATUS_CODES.NOT_FOUND
        );
    }

    // 4. Create payment
    const payment = await Payment.create({
        orderId: order.id,
        userId,
        paymentMethodId: paymentMethod.id,
        provider: paymentMethod.code,
        amount: order.totalAmount,
        currency: "INR",
        status: "PAID",
        paidAt: new Date(),
    });

    // 5. Update order payment status
    order.paymentStatus = "PAID";
    await order.save();

    // 6. Return payment with details
    return await Payment.findByPk(payment.id, {
        include: [
            {
                model: Order,
                as: "order",
                attributes: [
                    "id",
                    "orderNumber",
                    "totalAmount",
                    "status",
                    "paymentStatus",
                ],
            },
            {
                model: PaymentMethod,
                as: "paymentMethod",
                attributes: [
                    "id",
                    "name",
                    "code",
                    "type",
                    "isActive",
                ],
            },
        ],
    });
};

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
                    "paymentStatus",
                ],
            },
            {
                model: PaymentMethod,
                as: "paymentMethod",
                attributes: [
                    "id",
                    "name",
                    "code",
                    "type",
                    "isActive",
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};

export const getPaymentById = async (
    userId,
    paymentId
) => {
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
                    "paymentStatus",
                ],
            },
            {
                model: PaymentMethod,
                as: "paymentMethod",
                attributes: [
                    "id",
                    "name",
                    "code",
                    "type",
                    "isActive",
                ],
            },
        ],
    });

    if (!payment) {
        throw new AppError(
            "Payment not found",
            STATUS_CODES.NOT_FOUND
        );
    }

    return payment;
};