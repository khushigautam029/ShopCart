import {
    createAddress,
    deleteAddress,
    getAddressById,
    getAddresses,
    makeDefaultAddress,
    updateAddress,
} from "../services/addressService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const createCustomerAddress = asyncHandler(async (req, res) => {
    const address = await createAddress(
        req.user.id,
        req.body
    );
    return sendSuccess(
        res,
        STATUS_CODES.CREATED,
        MESSAGES.ADDRESS_CREATED,
        { data: address }
    );
});

export const getCustomerAddresses = asyncHandler(async (req, res) => {
    const addresses =
        await getAddresses(req.user.id);
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.ADDRESS_FETCHED,
        { data: addresses }
    );
});

export const getCustomerAddress = asyncHandler(async (req, res) => {
    const address =
        await getAddressById(
            req.user.id,
            req.params.id
        );
    if (!address) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            MESSAGES.ADDRESS_NOT_FOUND
        );
    }
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.ADDRESS_FETCHED,
        { data: address }
    );
});

export const updateCustomerAddress =
    asyncHandler(async (req, res) => {
        const address =
            await updateAddress(
                req.user.id,
                req.params.id,
                req.body
            );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ADDRESS_UPDATED,
            { data: address }
        );
    });

export const deleteCustomerAddress =
    asyncHandler(async (req, res) => {
        await deleteAddress(
            req.user.id,
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ADDRESS_DELETED
        );
    });

export const setDefaultCustomerAddress =
    asyncHandler(async (req, res) => {
        const address =
            await makeDefaultAddress(
                req.user.id,
                req.params.id
            );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.DEFAULT_ADDRESS_UPDATED,
            { data: address }
        );
    });