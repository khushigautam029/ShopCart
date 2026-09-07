import {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from "../services/wishlistService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const add = async (req,res) => {
    try{
        const wishlistItem = await addToWishlist(
            req.user.id,
            req.params.productId
        );
        return sendSuccess(res,
            STATUS_CODES.CREATED,
            MESSAGES.WISHLIST_ITEM_ADDED,
            {
                data: wishlistItem,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};

export const get = async (req, res) => {
    try {
        const wishlist = await getWishlist(req.user.id);
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.WISHLIST_FETCHED,
            {
                data: wishlist,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

export const remove = async (req, res) => {
    try {
        await removeFromWishlist(
            req.user.id,
            req.params.productId
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.WISHLIST_ITEM_REMOVED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};