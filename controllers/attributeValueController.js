import {
    createAttributeValue,
    deleteAttributeValue,
    getAttributeValueById,
    getAttributeValues,
    updateAttributeValue,
} from "../services/attributeValueService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const value = await createAttributeValue(
            req.params.attributeId,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.ATTRIBUTE_VALUE_CREATED,
            { data: value }
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
        const values = await getAttributeValues(
            req.params.attributeId
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_VALUE_FETCHED,
            { data: values }
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
        const value = await getAttributeValueById(
            req.params.attributeId,
            req.params.valueId
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_VALUE_FETCHED,
            { data: value }
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
        const value = await updateAttributeValue(
            req.params.attributeId,
            req.params.valueId,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_VALUE_UPDATED,
            { data: value }
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
        await deleteAttributeValue(
            req.params.attributeId,
            req.params.valueId
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ATTRIBUTE_VALUE_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
};