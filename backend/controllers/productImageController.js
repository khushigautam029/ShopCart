import {
    createProductImage,
    deleteProductImage,
    getProductImages,
    updateProductImage
} from "../services/productImageService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const image = await createProductImage(
            req.params.productId,
            req.user.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.PRODUCT_IMAGE_ADDED,
            { data: image }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};

export const getAll = async (req, res) => {
    try {
        const images = await getProductImages(
            req.params.productId
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_IMAGES_FETCHED,
            { data: images }
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
        const image = await updateProductImage(
            req.params.productId,
            req.params.imageId,
            req.user.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_IMAGE_UPDATED,
            { data: image }
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
        await deleteProductImage(
            req.params.productId,
            req.params.imageId,
            req.user.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_IMAGE_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};