import express from "express";
import {
    create,
    getAll,
    getById,
    remove,
    update
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { createProductSchema, updateProductSchema } from "../validations/productValidation.js";

const router = express.Router();

// Public
router.get("/", getAll);
router.get("/:id", getById);

// Seller only
router.post( "/", protect, authorizeRoles("SELLER"), validate(createProductSchema), create);
router.put( "/:id", protect, authorizeRoles("SELLER"), validate(updateProductSchema), update);
router.delete( "/:id", protect, authorizeRoles("SELLER"), remove);

export default router;