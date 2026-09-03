import express from "express";

import {
    create,
    getAll,
    getById,
    remove,
    update,
} from "../controllers/attributeValueController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

import {
    createAttributeValueSchema,
    updateAttributeValueSchema,
} from "../validations/attributeValueValidation.js";

const router = express.Router();

// Public
router.get(
    "/:attributeId",
    getAll
);

router.get(
    "/:attributeId/:valueId",
    getById
);

// Seller only
router.post(
    "/:attributeId",
    protect,
    authorizeRoles("SELLER"),
    validate(createAttributeValueSchema),
    create
);

router.put(
    "/:attributeId/:valueId",
    protect,
    authorizeRoles("SELLER"),
    validate(updateAttributeValueSchema),
    update
);

router.delete(
    "/:attributeId/:valueId",
    protect,
    authorizeRoles("SELLER"),
    remove
);

export default router;