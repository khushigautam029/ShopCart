import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../services/categoryService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const category = await createCategory(req.body);
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.CATEGORY_CREATED,
            { data: category }
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
        const categories = await getAllCategories();
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.CATEGORIES_FETCHED,
            { data: categories }
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
        const category = await getCategoryById(req.params.id);
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.CATEGORIES_FETCHED,
            { data: category }
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
        const category = await updateCategory(
            req.params.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.CATEGORY_UPDATED,
            { data: category }
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
        await deleteCategory(req.params.id);
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.CATEGORY_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
};