import {
    Product,
    Review,
    User,
} from "../models/index.js";

export const createReview = async (
    userId,
    productId,
    data
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
    const review = await Review.create({
        userId,
        productId,
        rating: data.rating,
        comment: data.comment ?? null,
        status: "PUBLISHED",
    });
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