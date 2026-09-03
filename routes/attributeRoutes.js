import express from "express";
import {
    create,
    getAll,
    getById,
    remove,
    update,
} from "../controllers/attributeController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createAttributeSchema,
    updateAttributeSchema,
} from "../validations/attributeValidation.js";

const router = express.Router();

// Public
router.get("/", getAll);
router.get("/:id", getById);

// Seller only
router.post( "/",  protect, authorizeRoles("SELLER"), validate(createAttributeSchema), create);
router.put( "/:id", protect, authorizeRoles("SELLER"), validate(updateAttributeSchema), update);
router.delete("/:id", protect, authorizeRoles("SELLER"), remove);

export default router;