import {
    createProductVariant,
    deleteProductVariant,
    getProductVariantById,
    getProductVariants,
    updateProductVariant,
} from "../services/productVariantService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const variant =
            await createProductVariant(
                req.params.productId,
                req.user.id,
                req.body
            );
        return res.status(
            STATUS_CODES.CREATED
        ).json({
            success: true,
            message:MESSAGES.PRODUCT_VARIANT_CREATED,
            data: variant,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const variants =
            await getProductVariants(
                req.params.productId
            );
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:MESSAGES.PRODUCT_VARIANTS_FETCHED,
            data: variants,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.NOT_FOUND
        ).json({
            success: false,
            message: error.message,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const variant =
            await getProductVariantById(
                req.params.productId,
                req.params.variantId
            );
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:MESSAGES.PRODUCT_VARIANTS_FETCHED,
            data: variant,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.NOT_FOUND
        ).json({
            success: false,
            message: error.message,
        });
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
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:MESSAGES.PRODUCT_VARIANT_UPDATED,
            data: variant,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
        });
    }
};

export const remove = async (req, res) => {
    try {
        await deleteProductVariant(
            req.params.productId,
            req.params.variantId,
            req.user.id
        );
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:MESSAGES.PRODUCT_VARIANT_DELETED,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
        });
    }
};