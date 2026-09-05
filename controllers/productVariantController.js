import {
    createProductVariant,
    deleteProductVariant,
    getProductVariantById,
    getProductVariants,
    updateProductVariant,
} from "../services/productVariantService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const variant =
            await createProductVariant(
                req.params.productId,
                req.user.id,
                req.body
            );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.PRODUCT_VARIANT_CREATED,
            { data: variant }
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
        const variants =
            await getProductVariants(
                req.params.productId
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_VARIANTS_FETCHED,
            { data: variants }
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
        const variant =
            await getProductVariantById(
                req.params.productId,
                req.params.variantId
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_VARIANTS_FETCHED,
            { data: variant }
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
        const variant =
            await updateProductVariant(
                req.params.productId,
                req.params.variantId,
                req.user.id,
                req.body
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_VARIANT_UPDATED,
            { data: variant }
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
        await deleteProductVariant(
            req.params.productId,
            req.params.variantId,
            req.user.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_VARIANT_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};