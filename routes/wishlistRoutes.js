import express from "express";
import {
    add,
    addToCart,
    get,
    remove,
} from "../controllers/wishlistController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    addWishlistToCartSchema,
} from "../validations/wishlistValidation.js";

const router = express.Router();

router.post(
    "/:productId",
    protect,
    authorizeRoles("CUSTOMER"),
    add
);

router.get(
    "/",
    protect,
    authorizeRoles("CUSTOMER"),
    get
);

router.delete(
    "/:productId",
    protect,
    authorizeRoles("CUSTOMER"),
    remove
);

// Add wishlist product to cart
router.post(
    "/:productId/add-to-cart",
    protect,
    authorizeRoles("CUSTOMER"),
    validate(addWishlistToCartSchema),
    addToCart
);

export default router;
