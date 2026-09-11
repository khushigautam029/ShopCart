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
import { STATUS_CODES } from "../utils/setConstants.js";

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
            "Return request created successfully",
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
            "Returns fetched Successfully",
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
            "Return detail Fetched Successfully",
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
            "Return Approved Successfully",
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
            "Return Rejected Successfully",
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
            "Return marked as picked up successfully",
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
            "Return marked as received successfully",
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
            "Returned cancelled successfully",
            {
                data: returnRequest,
            }
        );
    }
);
