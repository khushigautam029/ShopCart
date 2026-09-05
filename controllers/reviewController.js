import {
    createReview,
    deleteReview,
    getProductReviews,
    getReviewById,
    updateReview,
} from "../services/reviewService.js";
import {
    sendError,
    sendSuccess,
} from "../utils/responseHandler.js";
import {
    STATUS_CODES
} from "../utils/setConstants.js";


export const create = async (req, res) => {
    try {
        const review = await createReview(
            req.user.id,
            req.params.productId,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            "Review created successfully",
            { data: review }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};


export const getByProduct = async (req, res) => {
    try {
        const reviews = await getProductReviews(
            req.params.productId
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            "Reviews fetched successfully",
            { data: reviews }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
};


export const getById = async (req, res) => {
    try {
        const review = await getReviewById(
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            "Review fetched successfully",
            { data: review }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
};


export const update = async (req, res) => {
    try {
        const review = await updateReview(
            req.params.id,
            req.user.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            "Review updated successfully",
            { data: review }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};


export const remove = async (req, res) => {
    try {
        await deleteReview(
            req.params.id,
            req.user.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            "Review deleted successfully"
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};