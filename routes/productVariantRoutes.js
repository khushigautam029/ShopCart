import express from "express";
import {
    create,
    getAll,
    getById,
    remove,
    update,
} from "../controllers/productVariantController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createProductVariantSchema,
    updateProductVariantSchema,
} from "../validations/productVariantValidation.js";

const router = express.Router();

// Public
router.get("/:productId", getAll);
router.get( "/:productId/:variantId", getById);

// Seller only
router.post( "/:productId", protect,authorizeRoles("SELLER"), validate(createProductVariantSchema), create);
router.put( "/:productId/:variantId", protect, authorizeRoles("SELLER"),validate(updateProductVariantSchema), update);
router.delete( "/:productId/:variantId", protect, authorizeRoles("SELLER"), remove);

export default router;