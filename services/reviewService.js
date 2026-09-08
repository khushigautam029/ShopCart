import {
    Order,
    OrderItem,
    Product,
    ProductVariant,
    Review,
    User,
} from "../models/index.js";

export const createReview = async (
    userId,
    productId,
    data
) => {
    // 1. CHECK PRODUCT
    const product = await Product.findOne({
        where: {
            id: productId,
            status: "ACTIVE",
        },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    // 2. CHECK IF USER ALREADY REVIEWED
    const existingReview = await Review.findOne({
        where: {
            userId,
            productId,
        },
    });
    if (existingReview) {
        throw new Error(
            "You have already reviewed this product"
        );
    }
    // 3. FIND USER'S DELIVERED ORDERS
    const deliveredOrders = await Order.findAll({
        where: {
            userId,
            status: "DELIVERED",
        },
        attributes: ["id"],
    });
    if (deliveredOrders.length === 0) {
        throw new Error(
            "You can review only products you have purchased and received"
        );
    }
    const orderIds = deliveredOrders.map(
        (order) => order.id
    );
    // 4. FIND ORDER ITEMS FROM THOSE ORDERS
    const orderItems = await OrderItem.findAll({
        where: {
            orderId: orderIds,
        },
        attributes: ["id", "variantId"],
    });
    if (orderItems.length === 0) {
        throw new Error(
            "You can review only products you have purchased and received"
        );
    }
    // 5. GET VARIANT IDS
    const variantIds = orderItems.map(
        (item) => item.variantId
    );
    // 6. CHECK WHETHER ANY PURCHASED VARIANT
    //    BELONGS TO THIS PRODUCT
    const purchasedVariant =
        await ProductVariant.findOne({
            where: {
                id: variantIds,
                productId,
            },
            attributes: ["id"],
        });
    if (!purchasedVariant) {
        throw new Error(
            "You can review only products you have purchased and received"
        );
    }
    // 7. CREATE REVIEW
    const review = await Review.create({
        userId,
        productId,
        rating: data.rating,
        comment: data.comment ?? null,
        status: "PUBLISHED",
    });
    // 8. RETURN CREATED REVIEW
    return await getReviewById(review.id);
};

export const getProductReviews = async (
    productId
) => {
    const product = await Product.findOne({
        where: {
            id: productId,
            status: "ACTIVE",
        },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return await Review.findAll({
        where: {
            productId,
            status: "PUBLISHED",
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "name"],
            },
        ],
        order: [["created_at", "DESC"]],
    });
};

export const getReviewById = async (reviewId) => {
    const review = await Review.findOne({
        where: {
            id: reviewId,
            status: "PUBLISHED",
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "name"],
            },
            {
                model: Product,
                as: "product",
                attributes: ["id", "name"],
            },
        ],
    });
    if (!review) {
        throw new Error("Review not found");
    }
    return review;
};

export const updateReview = async (
    reviewId,
    userId,
    data
) => {
    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId,
        },
    });
    if (!review) {
        throw new Error(
            "Review not found or you are not authorized"
        );
    }
    await review.update({
        ...(data.rating !== undefined && {
            rating: data.rating,
        }),
        ...(data.comment !== undefined && {
            comment: data.comment,
        }),
    });
    return await getReviewById(reviewId);
};

export const deleteReview = async (
    reviewId,
    userId
) => {
    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId,
        },
    });
    if (!review) {
        throw new Error(
            "Review not found or you are not authorized"
        );
    }
    await review.destroy();
    return true;
};