import express from "express";
import {
    create,
    getAll,
    getById,
    remove,
    update,
} from "../controllers/categoryController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    categorySchema,
    updateCategorySchema,
} from "../validations/categoryValidation.js";

const router = express.Router();

// Public
router.get("/", getAll);
router.get("/:id", getById);

// Seller only
router.post( "/", protect, authorizeRoles("SELLER"), validate(categorySchema), create);
router.put( "/:id", protect, authorizeRoles("SELLER"), validate(updateCategorySchema), update);
router.delete( "/:id", protect, authorizeRoles("SELLER"), remove);

export default router;