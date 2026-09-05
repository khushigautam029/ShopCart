import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../services/productService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const product = await createProduct(
            req.user.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.PRODUCT_CREATED,
            { data: product }
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
        const products = await getAllProducts();
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_FETCHED,
            { data: products }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

export const getById = async (req, res) => {
    try {
        const product = await getProductById(
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_FETCHED,
            { data: product }
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
        const product = await updateProduct(
            req.params.id,
            req.user.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_UPDATED,
            { data: product }
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
        await deleteProduct(
            req.params.id,
            req.user.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.PRODUCT_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};


