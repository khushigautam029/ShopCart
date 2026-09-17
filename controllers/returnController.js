import {
    approveReturn,
    cancelReturn,
    createReturn,
    getMyReturns,
    getReturnById,
    markReturnPickedUp,
    markReturnReceived,
    refundReturn,
    rejectReturn,
} from "../services/returnService.js";

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

// CUSTOMER - CREATE RETURN
export const createReturnController = asyncHandler(
    async (req, res) => {
        const {
            orderId,
            orderItemId,
            quantity,
            reason,
            description,
        } = req.body;

        const returnRequest = await createReturn(
            req.user.id,
            Number(orderId),
            Number(orderItemId),
            Number(quantity),
            reason,
            description
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

// CUSTOMER - GET MY RETURNS
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

// CUSTOMER - GET RETURN BY ID
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

// SELLER - APPROVE RETURN
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
                data: approveRequest,
            }
        );
    }
);

// SELLER - REJECT RETURN
export const rejectReturnController = asyncHandler(
    async (req, res) => {
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

// SELLER - MARK RETURN PICKED UP
export const markReturnPickedUpController =
    asyncHandler(
        async (req, res) => {
            const returnRequest =
                await markReturnPickedUp(
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

// SELLER - MARK RETURN RECEIVED
export const markReturnReceivedController =
    asyncHandler(
        async (req, res) => {
            const returnRequest =
                await markReturnReceived(
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

// SELLER - REFUND RETURN
export const refundReturnController =
    asyncHandler(
        async (req, res) => {
            const refundRequest =
                await refundReturn(
                    req.user.id,
                    Number(req.params.id)
                );

            return sendSuccess(
                res,
                STATUS_CODES.OK,
                "Refund processed successfully",
                {
                    data: refundRequest,
                }
            );
        }
    );

// CUSTOMER - CANCEL RETURN
export const cancelReturnController =
    asyncHandler(
        async (req, res) => {
            const returnRequest =
                await cancelReturn(
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