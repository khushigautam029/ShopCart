import sequelize from "../config/database.js";

import { randomUUID } from "crypto";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Coupon from "../models/Coupon.js";
import CouponUsage from "../models/CouponUsage.js";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import OrderStatusHistory from "../models/OrderStatusHistory.js";
import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

export const checkout = async (userId, data) => {
    const transaction = await sequelize.transaction();
    try {
        const { addressId, couponCode } = data;
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
            transaction,
        });
        if (!address) {
            throw new AppError(
                "Address not found",
                STATUS_CODES.NOT_FOUND
            );
        }
        const cart = await Cart.findOne({
            where: {
                userId,
            },
            transaction,
        });
        if (!cart) {
            throw new AppError(
                "Cart not found",
                STATUS_CODES.NOT_FOUND
            );
        }
        const cartItems = await CartItem.findAll({
            where: {
                cartId: cart.id,
            },
            include: [
                {
                    model: ProductVariant,
                    as: "variant",
                    include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: [
                                "id",
                                "name",
                                "price",
                                "status",
                                "sellerId",
                            ],
                        },
                        {
                            model: Inventory,
                            as: "inventory",
                        },
                    ],
                },
            ],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (cartItems.length === 0) {
            throw new AppError(
                "Cart is empty",
                STATUS_CODES.BAD_REQUEST
            );
        }
        let subtotal = 0;
        const orderItemsData = [];
        const sellerSubtotals = {};

        for (const cartItem of cartItems) {
            const variant = cartItem.variant;
            if (!variant) {
                throw new AppError(
                    `Product variant not found for cart item ${cartItem.id}`,
                    STATUS_CODES.NOT_FOUND
                );
            }
            const product = variant.product;

            if (!product) {
                throw new AppError(
                    `Product not found for variant ${variant.id}`,
                    STATUS_CODES.NOT_FOUND
                );
            }
            if (product.status !== "ACTIVE") {
                throw new AppError(
                    `Product "${product.name}" is inactive`,
                    STATUS_CODES.BAD_REQUEST
                );
            }
            if (variant.status !== "ACTIVE") {
                throw new AppError(
                    `Product variant "${variant.sku}" is inactive`,
                    STATUS_CODES.BAD_REQUEST
                );
            }

            if (!variant.price) {
                throw new AppError(
                    `Price not available for variant "${variant.sku}"`,
                    STATUS_CODES.BAD_REQUEST
                );
            }
            const inventory = variant.inventory;
            if (!inventory) {
                throw new AppError(
                    `Inventory not found for variant "${variant.sku}"`,
                    STATUS_CODES.NOT_FOUND
                );
            }
            // Available stock
            const availableQuantity =
                Number(inventory.quantity) -
                Number(inventory.reservedQuantity);
            if (
                availableQuantity <
                Number(cartItem.quantity)
            ) {
                throw new AppError(
                    `Insufficient stock for "${product.name}". Available: ${availableQuantity}`,
                    STATUS_CODES.BAD_REQUEST
                );
            }
            const unitPrice = Number(variant.price);
            const quantity = Number(cartItem.quantity);
            const itemSubtotal =
                unitPrice * quantity;
            subtotal += itemSubtotal;

            const sellerId = product.sellerId;
            if (!sellerSubtotals[sellerId]) {
                sellerSubtotals[sellerId] = 0;
            }
            sellerSubtotals[sellerId] += itemSubtotal;
            orderItemsData.push({
                variantId: variant.id,
                productName: product.name,
                sku: variant.sku,
                quantity,
                unitPrice,
                subtotal: itemSubtotal,
            });
        }
        let coupon = null;
        let discount = 0;
        let eligibleSubtotal = 0;

        if (couponCode) {
            const normalizedCouponCode =
                couponCode.trim().toUpperCase();
            coupon = await Coupon.findOne({
                where: {
                    code: normalizedCouponCode,
                },
                transaction,
                lock: transaction.LOCK.UPDATE,
            });
            if (!coupon) {
                throw new AppError(
                    "Invalid coupon code",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            if (coupon.status !== "ACTIVE") {
                throw new AppError(
                    "Coupon is inactive",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            const currentDate = new Date();
            if (
                currentDate <
                new Date(coupon.startDate)
            ) {
                throw new AppError(
                    "Coupon is not active yet",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            if (
                currentDate >
                new Date(coupon.endDate)
            ) {
                throw new AppError(
                    "Coupon has expired",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            if (
                coupon.usageLimit !== null &&
                coupon.usedCount >= coupon.usageLimit
            ) {
                throw new AppError(
                    "Coupon usage limit has been reached",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            const previousUsage =
                await CouponUsage.findOne({
                    where: {
                        couponId: coupon.id,
                        userId,
                    },
                    transaction,
                });

            if (previousUsage) {
                throw new AppError(
                    "You have already used this coupon",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            eligibleSubtotal =
                Number(
                    sellerSubtotals[coupon.sellerId] || 0
                );

            if (eligibleSubtotal <= 0) {
                throw new AppError(
                    "This coupon is not applicable to your cart",
                    STATUS_CODES.BAD_REQUEST
                );
            }
            if (
                eligibleSubtotal <
                Number(coupon.minOrderAmount)
            ) {
                throw new AppError(
                    `Minimum order amount of ₹${Number(
                        coupon.minOrderAmount
                    )} is required for this coupon`,
                    STATUS_CODES.BAD_REQUEST
                );
            }
            if (coupon.discountType === "FLAT") {
                discount =
                    Number(coupon.discountValue);
            }
            if (
                coupon.discountType ===
                "PERCENTAGE"
            ) {
                discount =
                    (eligibleSubtotal *
                        Number(coupon.discountValue)) /
                    100;
            }
            if (
                coupon.maxDiscount !== null &&
                discount >
                Number(coupon.maxDiscount)
            ) {
                discount =
                    Number(coupon.maxDiscount);
            }

            if (discount > eligibleSubtotal) {
                discount = eligibleSubtotal;
            }

            // Round to 2 decimal places
            discount =
                Math.round(discount * 100) / 100;
        }
        // Free shipping for now
        const shippingFee = 0;

        const totalAmount =
            subtotal -
            discount +
            shippingFee;
        const orderNumber = `ORD-${randomUUID()}`;
        const order = await Order.create(
            {
                userId,
                addressId,
                orderNumber,

                subtotal,

                discount,

                couponId: coupon
                    ? coupon.id
                    : null,

                couponCode: coupon
                    ? coupon.code
                    : null,

                shippingFee,

                totalAmount,

                status: "PENDING",

                paymentStatus: "PENDING",
            },
            {
                transaction,
            }
        );
        const orderItems =
            orderItemsData.map((item) => ({
                orderId: order.id,
                ...item,
            }));

        await OrderItem.bulkCreate(
            orderItems,
            {
                transaction,
            }
        );
        for (const cartItem of cartItems) {
            const inventory =
                cartItem.variant.inventory;

            inventory.reservedQuantity =
                Number(
                    inventory.reservedQuantity
                ) +
                Number(cartItem.quantity);

            await inventory.save({
                transaction,
            });
        }
        await OrderStatusHistory.create(
            {
                orderId: order.id,
                status: "PENDING",
                note:
                    coupon
                        ? `Order placed with coupon ${coupon.code} and awaiting payment`
                        : "Order placed and awaiting payment",
                changedBy: userId,
            },
            {
                transaction,
            }
        );
        await CartItem.destroy({
            where: {
                cartId: cart.id,
            },
            transaction,
        });
        await transaction.commit();
        return {
            order,
            orderItems,

            coupon: coupon
                ? {
                    id: coupon.id,
                    code: coupon.code,
                    discountType:
                        coupon.discountType,
                    discountValue:
                        Number(
                            coupon.discountValue
                        ),
                    eligibleSubtotal,
                    discount,
                }
                : null,

            pricing: {
                subtotal,
                discount,
                shippingFee,
                totalAmount,
            },
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};