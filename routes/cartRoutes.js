import express from "express";
import {
    addItemToCart,
    deleteCustomerCart,
    deleteItemFromCart,
    getCustomerCart,
    updateItemInCart,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { addToCartSchema, updateCartItemSchema, } from "../validations/cartValidation.js";

const router = express.Router();

// Customer authentication
router.use(protect);
// Customer only
router.use(authorizeRoles("CUSTOMER"));

// Get customer's cart
router.get("/", getCustomerCart);
// Add item to cart
router.post( "/items", validate(addToCartSchema), addItemToCart);
// Update cart item quantity
router.put( "/items/:itemId", validate(updateCartItemSchema), updateItemInCart);
// Remove cart item
router.delete( "/items/:itemId", deleteItemFromCart);
// Clear entire cart
router.delete( "/", deleteCustomerCart);

export default router;