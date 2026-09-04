import {
    addToCart,
    clearCart,
    getCart,
    removeCartItem,
    updateCartItem,
} from "../services/cartService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const addItemToCart = asyncHandler(async (req, res) => {
    const { variantId, quantity } = req.body;
    const cartItem = await addToCart(
        req.user.id,
        variantId,
        quantity
    );
    return sendSuccess(
        res,
        STATUS_CODES.CREATED,
        MESSAGES.ITEM_ADDED_TO_CART,
        { data: cartItem }
    );
});


export const getCustomerCart = asyncHandler(async (req, res) => {
    const cart = await getCart(req.user.id);
    return sendSuccess(
        res,
        STATUS_CODES.CREATED,
        MESSAGES.ITEM_ADDED_TO_CART,
        { data: cartItem }
    );
});


export const updateItemInCart = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const cartItem = await updateCartItem(
        req.user.id,
        req.params.itemId,
        quantity
    );
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.CART_ITEM_UPDATED,
        { data: cartItem }
    );
});


export const deleteItemFromCart = asyncHandler(async (req, res) => {
    await removeCartItem(
        req.user.id,
        req.params.itemId
    );
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.CART_ITEM_REMOVED
    );
});


export const deleteCustomerCart = asyncHandler(async (req, res) => {
    await clearCart(req.user.id);
    return sendSuccess(
        res,
        STATUS_CODES.OK,
        MESSAGES.CART_CLEARED
    );
});