import {
    addToWishlist,
    addWishlistItemToCart,
    getWishlist,
    removeFromWishlist,
} from "../services/wishlistService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const add = asyncHandler(async (req, res) => {
    const wishlistItem = await addToWishlist(
        req.user.id,
        Number(req.params.productId)
    );
    return sendSuccess(
        res,
        STATUS_CODES.CREATED,
        MESSAGES.WISHLIST_ITEM_ADDED,
        {
            data: wishlistItem,
        }
    );
});

export const get = asyncHandler(async (req, res) => {
    const wishlist = await getWishlist(req.user.id);
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.WISHLIST_FETCHED,
        {
            data: wishlist,
        }
    );
});

export const remove = asyncHandler(async (req, res) => {
    await removeFromWishlist(
        req.user.id,
        Number(req.params.productId)
    );
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.WISHLIST_ITEM_REMOVED
    );
});

// Add wishlist product to cart
export const addToCart = asyncHandler(async (req, res) => {
    const {
        variantId,
        quantity,
    } = req.body;
    const cartItem = await addWishlistItemToCart(
        req.user.id,
        Number(req.params.productId),
        Number(variantId),
        Number(quantity)
    );
    return sendSuccess(
        res,
        STATUS_CODES.CREATED,
        "Product added to cart successfully",
        {
            data: cartItem,
        }
    );
});