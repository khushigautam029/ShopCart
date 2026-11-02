import {
    createAttribute,
    deleteAttribute,
    getAllAttributes,
    getAttributeById,
    updateAttribute,
} from "../services/attributeService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const attribute = await createAttribute(req.body);
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.ATTRIBUTE_CREATED,
            { data: attribute }
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
        const attributes = await getAllAttributes();
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_FETCHED,
            { data: attributes }
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
        const attribute = await getAttributeById(
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_FETCHED,
            { data: attribute }
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
        const attribute = await updateAttribute(
            req.params.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_UPDATED,
            { data: attribute }
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
        await deleteAttribute(req.params.id);
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
};