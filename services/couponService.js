import { Op } from "sequelize";
import {
    Cart,
    CartItem,
    Coupon,
    CouponUsage,
    Product,
    ProductVariant,
} from "../models/index.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

// CREATE COUPON - SELLER
export const createCoupon = async (sellerId, data) => {
    const {
        code,
        discountType,
        discountValue,
        minOrderAmount = 0,
        maxDiscount = null,
        startDate,
        endDate,
        usageLimit = null,
        status = "ACTIVE",
    } = data;
    // Check duplicate coupon code
    const existingCoupon = await Coupon.findOne({
        where: {
            code: code.toUpperCase(),
        },
    });
    if (existingCoupon) {
        throw new AppError(
            "Coupon code already exists",
            STATUS_CODES.CONFLICT
        );
    }
    // Percentage discount cannot exceed 100%
    if (
        discountType === "PERCENTAGE" &&
        Number(discountValue) > 100
    ) {
        throw new AppError(
            "Percentage discount cannot exceed 100%",
            STATUS_CODES.BAD_REQUEST
        );
    }
    // Validate date order
    if (new Date(endDate) <= new Date(startDate)) {
        throw new AppError(
            "End date must be after start date",
            STATUS_CODES.BAD_REQUEST
        );
    }
    // Create coupon
    const coupon = await Coupon.create({
        sellerId,
        code: code.toUpperCase(),
        discountType,
        discountValue,
        minOrderAmount,
        maxDiscount,
        startDate,
        endDate,
        usageLimit,
        status,
    });
    return coupon;
};

// GET ALL COUPONS - SELLER'S COUPONS ONLY
export const getAllCoupons = async (sellerId) => {
    const coupons = await Coupon.findAll({
        where: {
            sellerId,
        },
        order: [
            ["created_at", "DESC"],
        ],
    });
    return coupons;
};

// GET COUPON BY ID - SELLER'S COUPON ONLY
export const getCouponById = async (
    couponId,
    sellerId
) => {
    const coupon = await Coupon.findOne({
        where: {
            id: couponId,
            sellerId,
        },
    });
    if (!coupon) {
        throw new AppError(
            "Coupon not found",
            STATUS_CODES.NOT_FOUND
        );
    }
    return coupon;
};

// UPDATE COUPON - SELLER'S COUPON ONLY
export const updateCoupon = async (
    couponId,
    sellerId,
    data
) => {
    const coupon = await Coupon.findOne({
        where: {
            id: couponId,
            sellerId,
        },
    });

    if (!coupon) {
        throw new AppError(
            "Coupon not found",
            STATUS_CODES.NOT_FOUND
        );
    }

    // Check duplicate code if code is being changed
    if (data.code) {
        const existingCoupon = await Coupon.findOne({
            where: {
                code: data.code.toUpperCase(),
                id: {
                    [Op.ne]: couponId,
                },
            },
        });

        if (existingCoupon) {
            throw new AppError(
                "Coupon code already exists",
                STATUS_CODES.CONFLICT
            );
        }

        data.code = data.code.toUpperCase();
    }

    // Get final values after update
    const discountType =
        data.discountType ??
        coupon.discountType;

    const discountValue =
        data.discountValue ??
        coupon.discountValue;

    const startDate =
        data.startDate ??
        coupon.startDate;

    const endDate =
        data.endDate ??
        coupon.endDate;

    const usageLimit =
        data.usageLimit !== undefined
            ? data.usageLimit
            : coupon.usageLimit;

    // Percentage discount cannot exceed 100%
    if (
        discountType === "PERCENTAGE" &&
        Number(discountValue) > 100
    ) {
        throw new AppError(
            "Percentage discount cannot exceed 100%",
            STATUS_CODES.BAD_REQUEST
        );
    }
    // Validate date order
    if (
        new Date(endDate) <=
        new Date(startDate)
    ) {
        throw new AppError(
            "End date must be after start date",
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Usage limit cannot be lower than used count
    if (
        usageLimit !== null &&
        Number(usageLimit) <
            Number(coupon.usedCount)
    ) {
        throw new AppError(
            `Usage limit cannot be less than current used count (${coupon.usedCount})`,
            STATUS_CODES.BAD_REQUEST
        );
    }
    await coupon.update(data);
    return coupon;
};

// DELETE / DEACTIVATE COUPON
export const deleteCoupon = async (
    couponId,
    sellerId
) => {
    const coupon = await Coupon.findOne({
        where: {
            id: couponId,
            sellerId,
        },
    });
    if (!coupon) {
        throw new AppError(
            "Coupon not found",
            STATUS_CODES.NOT_FOUND
        );
    }
    // Soft delete by deactivating coupon
    coupon.status = "INACTIVE";
    await coupon.save();
    return coupon;
};

// GET CART ITEMS
const getCustomerCartItems = async (userId) => {
    const cart = await Cart.findOne({
        where: {
            userId,
        },
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
                            "status",
                            "sellerId",
                        ],
                    },
                ],
            },
        ],
    });

    if (cartItems.length === 0) {
        throw new AppError(
            "Cart is empty",
            STATUS_CODES.BAD_REQUEST
        );
    }
    return cartItems;
};

// CALCULATE CART TOTALS
const calculateCartTotals = async (
    cartItems,
    sellerId
) => {
    let subtotal = 0;

    let eligibleSubtotal = 0;

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

        const quantity =
            Number(cartItem.quantity);

        const price =
            Number(variant.price);

        const itemSubtotal =
            price * quantity;

        // Complete cart subtotal
        subtotal += itemSubtotal;

        // Only this seller's products are eligible
        if (
            Number(product.sellerId) ===
            Number(sellerId)
        ) {
            eligibleSubtotal +=
                itemSubtotal;
        }
    }

    return {
        subtotal,
        eligibleSubtotal,
    };
};

// APPLY COUPON - CUSTOMER
export const applyCoupon = async (
    userId,
    code
) => {
    const coupon = await Coupon.findOne({
        where: {
            code: code.toUpperCase(),
        },
    });

    if (!coupon) {
        throw new AppError(
            "Invalid coupon code",
            STATUS_CODES.NOT_FOUND
        );
    }

    // Coupon must be active
    if (coupon.status !== "ACTIVE") {
        throw new AppError(
            "Coupon is inactive",
            STATUS_CODES.BAD_REQUEST
        );
    }

    const now = new Date();

    // Coupon has not started yet
    if (
        now < new Date(coupon.startDate)
    ) {
        throw new AppError(
            "Coupon is not active yet",
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Coupon has expired
    if (
        now > new Date(coupon.endDate)
    ) {
        throw new AppError(
            "Coupon has expired",
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Check total usage limit
    if (
        coupon.usageLimit !== null &&
        Number(coupon.usedCount) >=
            Number(coupon.usageLimit)
    ) {
        throw new AppError(
            "Coupon usage limit has been reached",
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Check whether customer already used coupon
    const previousUsage =
        await CouponUsage.findOne({
            where: {
                couponId: coupon.id,
                userId,
            },
        });

    if (previousUsage) {
        throw new AppError(
            "You have already used this coupon",
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Get customer cart
    const cartItems =
        await getCustomerCartItems(userId);

    // Calculate complete cart and eligible seller subtotal
    const {
        subtotal,
        eligibleSubtotal,
    } = await calculateCartTotals(
        cartItems,
        coupon.sellerId
    );

    // Coupon seller must have products in cart
    if (eligibleSubtotal <= 0) {
        throw new AppError(
            "This coupon is not applicable to any product in your cart",
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Minimum order amount applies to eligible products
    if (
        eligibleSubtotal <
        Number(coupon.minOrderAmount)
    ) {
        throw new AppError(
            `Minimum order amount for this coupon is ₹${Number(
                coupon.minOrderAmount
            ).toFixed(2)}`,
            STATUS_CODES.BAD_REQUEST
        );
    }

    // Calculate discount
    let discountAmount = 0;

    if (coupon.discountType === "FLAT") {
        discountAmount =
            Number(coupon.discountValue);
    }

    if (
        coupon.discountType ===
        "PERCENTAGE"
    ) {
        discountAmount =
            (eligibleSubtotal *
                Number(coupon.discountValue)) /
            100;
    }

    // Apply maximum discount cap
    if (
        coupon.maxDiscount !== null &&
        discountAmount >
            Number(coupon.maxDiscount)
    ) {
        discountAmount =
            Number(coupon.maxDiscount);
    }

    // Discount cannot exceed eligible subtotal
    if (
        discountAmount >
        eligibleSubtotal
    ) {
        discountAmount =
            eligibleSubtotal;
    }

    discountAmount = Number(
        discountAmount.toFixed(2)
    );

    // Free shipping for now
    const shippingFee = 0;

    // Discount is subtracted from complete cart
    const totalAmount =
        subtotal -
        discountAmount +
        shippingFee;

    return {
        coupon: {
            id: coupon.id,
            code: coupon.code,
            sellerId: coupon.sellerId,
            discountType:
                coupon.discountType,
            discountValue:
                coupon.discountValue,
            minOrderAmount:
                coupon.minOrderAmount,
            maxDiscount:
                coupon.maxDiscount,
        },

        subtotal: Number(
            subtotal.toFixed(2)
        ),

        eligibleSubtotal: Number(
            eligibleSubtotal.toFixed(2)
        ),

        discount: discountAmount,

        shippingFee,

        totalAmount: Number(
            totalAmount.toFixed(2)
        ),
    };
};