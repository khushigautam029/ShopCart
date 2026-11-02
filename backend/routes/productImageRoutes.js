import express from "express";
import {
    create,
    getAll,
    remove,
    update,
} from "../controllers/productImageController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createProductImageSchema,
    updateProductImageSchema,
} from "../validations/productImageValidation.js";

const router = express.Router();
// Public
router.get( "/:productId", getAll);

// Seller only
router.post( "/:productId", protect, authorizeRoles("SELLER"), validate(createProductImageSchema), create);
router.put( "/:productId/:imageId", protect, authorizeRoles("SELLER"), validate(updateProductImageSchema), update);
router.delete( "/:productId/:imageId", protect, authorizeRoles("SELLER"), remove);

export default router;