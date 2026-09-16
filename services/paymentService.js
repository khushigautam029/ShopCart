import sequelize from "../config/database.js";
import Coupon from "../models/Coupon.js";
import CouponUsage from "../models/CouponUsage.js";
import Order from "../models/Order.js";
import OrderStatusHistory from "../models/OrderStatusHistory.js";
import Payment from "../models/Payment.js";
import PaymentMethod from "../models/PaymentMethod.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const createPayment = async (
    userId,
    orderId,
    paymentMethodId
) => {
    const transaction =
        await sequelize.transaction();

    try {
        // 1. CHECK ORDER
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId,
            },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!order) {
            throw new AppError(
                "Order not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        // 2. CHECK IF ORDER IS ALREADY PAID
        if (order.paymentStatus === "PAID") {
            throw new AppError(
                "Order is already paid",
                STATUS_CODES.CONFLICT
            );
        }

        // 3. CHECK PAYMENT METHOD
        const paymentMethod =
            await PaymentMethod.findOne({
                where: {
                    id: paymentMethodId,
                    isActive: true,
                },
                transaction,
            });

        if (!paymentMethod) {
            throw new AppError(
                "Payment method not found or inactive",
                STATUS_CODES.NOT_FOUND
            );
        }

        // 4. CREATE PAYMENT
        const payment = await Payment.create(
            {
                orderId: order.id,
                userId,
                paymentMethodId:
                    paymentMethod.id,
                provider:
                    paymentMethod.code,
                amount: order.totalAmount,
                currency: "INR",
                status: "PAID",
                paidAt: new Date(),
            },
            {
                transaction,
            }
        );

        // 5. HANDLE COUPON USAGE
        if (order.couponId) {
            // Get coupon
            const coupon =
                await Coupon.findByPk(
                    order.couponId,
                    {
                        transaction,
                        lock: transaction.LOCK.UPDATE,
                    }
                );

            if (!coupon) {
                throw new AppError(
                    "Coupon associated with this order was not found",
                    STATUS_CODES.NOT_FOUND
                );
            }

            // Check coupon status
            if (coupon.status !== "ACTIVE") {
                throw new AppError(
                    "Coupon is no longer active",
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Check usage limit again
            if (
                coupon.usageLimit !== null &&
                coupon.usedCount >=
                    coupon.usageLimit
            ) {
                throw new AppError(
                    "Coupon usage limit has been reached",
                    STATUS_CODES.BAD_REQUEST
                );
            }

            // Check whether customer already used coupon
            const existingUsage =
                await CouponUsage.findOne({
                    where: {
                        couponId: coupon.id,
                        userId,
                    },
                    transaction,
                        });

            if (existingUsage) {
                throw new AppError(
                    "You have already used this coupon",
                    STATUS_CODES.CONFLICT
                );
            }

            // Create CouponUsage
            await CouponUsage.create(
                {
                    couponId: coupon.id,
                    userId,
                    orderId: order.id,
                    discountAmount:
                        order.discount,
                    usedAt: new Date(),
                },
                {
                    transaction,
                }
            );

            // Increment coupon usage count
            coupon.usedCount =
                Number(coupon.usedCount) + 1;

            await coupon.save({
                transaction,
            });
        }

        // 6. UPDATE ORDER
        order.paymentStatus = "PAID";
        order.status = "CONFIRMED";

        await order.save({
            transaction,
        });

        // 7. CREATE ORDER STATUS HISTORY
        await OrderStatusHistory.create(
            {
                orderId: order.id,
                status: "CONFIRMED",
                note:
                    order.couponId
                        ? `Order confirmed successfully with coupon ${order.couponCode}`
                        : "Order confirmed successfully",
                changedBy: userId,
            },
            {
                transaction,
            }
        );

        // 8. COMMIT TRANSACTION
        await transaction.commit();

        // 9. RETURN PAYMENT DETAILS
        return await Payment.findByPk(
            payment.id,
            {
                include: [
                    {
                        model: Order,
                        as: "order",
                        attributes: [
                            "id",
                            "orderNumber",
                            "subtotal",
                            "discount",
                            "couponId",
                            "couponCode",
                            "shippingFee",
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
            }
        );
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// GET ALL PAYMENTS OF USER
export const getPaymentsByUser = async (
    userId
) => {
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
                    "subtotal",
                    "discount",
                    "couponId",
                    "couponCode",
                    "shippingFee",
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
        order: [["created_at", "DESC"]],
    });
};

// GET PAYMENT BY ID
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
                    "subtotal",
                    "discount",
                    "couponId",
                    "couponCode",
                    "shippingFee",
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
