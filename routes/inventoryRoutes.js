import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

import {
    getAllInventory,
    getInventoryForVariant,
    updateInventoryStock,
} from "../controllers/inventoryController.js";

import {
    updateInventorySchema,
} from "../validations/inventoryValidation.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("SELLER"));

router.get(
    "/",
    getAllInventory
);

router.get(
    "/:variantId",
    getInventoryForVariant
);

router.put(
    "/:variantId",
    validate(updateInventorySchema),
    updateInventoryStock
);

export default router;