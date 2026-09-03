import {
    createAttribute,
    deleteAttribute,
    getAllAttributes,
    getAttributeById,
    updateAttribute,
} from "../services/attributeService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const create = async (req, res) => {
    try {
        const attribute = await createAttribute(req.body);
        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_CREATED,
            data: attribute,
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
        const attributes = await getAllAttributes();
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_FETCHED,
            data: attributes,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: error.message,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const attribute = await getAttributeById(
            req.params.id
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_FETCHED,
            data: attribute,
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
        const attribute = await updateAttribute(
            req.params.id,
            req.body
        );
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_UPDATED,
            data: attribute,
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
        await deleteAttribute(req.params.id);
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ATTRIBUTE_DELETED,
        });
    } catch (error) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: error.message,
        });
    }
};