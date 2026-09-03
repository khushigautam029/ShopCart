import {
    createAttributeValue,
    deleteAttributeValue,
    getAttributeValueById,
    getAttributeValues,
    updateAttributeValue,
} from "../services/attributeValueService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const value = await createAttributeValue(
            req.params.attributeId,
            req.body
        );
        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_VALUE_CREATED,
            data: value,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const values = await getAttributeValues(
            req.params.attributeId
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_VALUE_FETCHED,
            data: values,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const value = await getAttributeValueById(
            req.params.attributeId,
            req.params.valueId
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_VALUE_FETCHED,
            data: value,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const value = await updateAttributeValue(
            req.params.attributeId,
            req.params.valueId,
            req.body
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_VALUE_UPDATED,
            data: value,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};

export const remove = async (req, res) => {
    try {
        await deleteAttributeValue(
            req.params.attributeId,
            req.params.valueId
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_VALUE_DELETED ,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};