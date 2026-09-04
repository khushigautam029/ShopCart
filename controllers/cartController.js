import {
    addToCart,
    clearCart,
    getCart,
    removeCartItem,
    updateCartItem,
} from "../services/cartService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";


export const addItemToCart = asyncHandler(async (req, res) => {
    const { variantId, quantity } = req.body;
    const cartItem = await addToCart(
        req.user.id,
        variantId,
        quantity
    );
    res.status(STATUS_CODES.CREATED).json({
        success: true,
        message: MESSAGES.ITEM_ADDED_TO_CART,
        data: cartItem,
    });
});


export const getCustomerCart = asyncHandler(async (req, res) => {
    const cart = await getCart(req.user.id);
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.CART_FETCHED,
        data: cart,
    });
});


export const updateItemInCart = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const cartItem = await updateCartItem(
        req.user.id,
        req.params.itemId,
        quantity
    );
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.CART_ITEM_UPDATED,
        data: cartItem,
    });
});


export const deleteItemFromCart = asyncHandler(async (req, res) => {
    await removeCartItem(
        req.user.id,
        req.params.itemId
    );
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.CART_ITEM_REMOVED,
    });
});


export const deleteCustomerCart = asyncHandler(async (req, res) => {
    await clearCart(req.user.id);
    res.status(STATUS_CODES.OK).json({
        success: true,
        message: MESSAGES.CART_CLEARED,
    });
});