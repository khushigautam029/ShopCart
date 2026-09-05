import express from "express";

import {
    create,
    getById,
    getByProduct,
    remove,
    update,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createReviewSchema,
    updateReviewSchema,
} from "../validations/reviewValidation.js";

const router = express.Router();

// Public
router.get( "/products/:productId", getByProduct);
router.get( "/:id", getById);

// Customer only
router.post("/products/:productId", protect, authorizeRoles("CUSTOMER"), validate(createReviewSchema), create);
router.put( "/:id", protect, authorizeRoles("CUSTOMER"), validate(updateReviewSchema), update);
router.delete( "/:id", protect, authorizeRoles("CUSTOMER"), remove);

export default router;