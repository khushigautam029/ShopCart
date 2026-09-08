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
    // 1. Check product exists and is active
    const product = await Product.findOne({
        where: {
            id: productId,
            status: "ACTIVE",
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    // 2. Check customer has purchased and received this product
    const deliveredOrder = await Order.findOne({
        where: {
            userId,
            status: "DELIVERED",
        },
        include: [
            {
                model: OrderItem,
                as: "items",
                required: true,
                include: [
                    {
                        model: ProductVariant,
                        as: "variant",
                        required: true,
                        where: {
                            productId,
                        },
                    },
                ],
            },
        ],
    });

    if (!deliveredOrder) {
        throw new Error(
            "You can review only products you have purchased and received"
        );
    }

    // 3. Prevent duplicate review
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

    // 4. Create review
    const review = await Review.create({
        userId,
        productId,
        rating: data.rating,
        comment: data.comment ?? null,
        status: "PUBLISHED",
    });

    // 5. Return created review with user/product details
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