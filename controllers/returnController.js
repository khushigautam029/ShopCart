import {
    approveReturn,
    cancelReturn,
    createReturn,
    getMyReturns,
    getReturnById,
    markReturnPickedUp,
    markReturnReceived,
    rejectReturn
} from "../services/returnService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

// Customer-Create Return
export const createReturnController = asyncHandler(
    async (req, res) => {
        const {
            orderId,
            orderItemId,
            quantity,
            reason,
            description
        } = req.body;
        const returnRequest = await createReturn(
            req.user.id,
            Number(orderId),
            Number(orderItemId),
            Number(quantity),
            reason,
            description,
        );
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.RETURN_REQUEST_CREATED,
            {
                data: returnRequest,
            }
        );
    }
);

// Get my returns
export const getMyReturnsController = asyncHandler(
    async (req, res) => {
        const returns = await getMyReturns(
            req.user.id
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURNS_FETCHED,
            {
                data: returns,
            }
        );
    }
);

//Get BY ID
export const getReturnByIdController = asyncHandler(
    async (req, res) => {
        const returnRequest = await getReturnById(
            req.user.id,
            Number(req.params.id)
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURN_DETAIL_FETCHED,
            {
                data: returnRequest,
            }
        );
    }
);

export const approveReturnController = asyncHandler(
    async (req, res) => {
        const approveRequest = await approveReturn(
            req.user.id,
            Number(req.params.id)
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURN_APPROVED,
            {
                data: approveRequest
            }
        );
    }
);

// Reject Request
export const rejectReturnController = asyncHandler(
    async (res, req) => {
        const { note } = req.body;
        const rejectRequest = await rejectReturn(
            req.user.id,
            Number(req.params.id),
            note
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURN_REJECTED,
            {
                data: rejectRequest,
            }
        );
    }
);

//Marked Returned Picked Up
export const markReturnPickedUpController = asyncHandler(
    async (req, res) => {
        const returnRequest = await markReturnPickedUp(
            req.user.id,
            Number(req.params.id)
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURN_MARKED_AS_PICKED_UP,
            {
                data: returnRequest,
            }
        );
    }
);

//Mark Return Received
export const markReturnReceivedController = asyncHandler(
    async (req, res) => {
        const returnRequest = await markReturnReceived(
            req.user.id,
            Number(req.params.id)
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURN_MARKED_AS_RECEIVED,
            {
                data: returnRequest,
            }
        );
    }
);

//Cancel Return
export const cancelReturnController = asyncHandler(
    async(req,res) => {
        const returnRequest = await cancelReturn(
            req.user.id,
            Number(req.params.id)
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.RETURNED_CANCELLED,
            {
                data: returnRequest,
            }
        );
    }
);
