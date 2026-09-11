import express from "express";
import {
    approveReturnController,
    cancelReturnController,
    createReturnController,
    getMyReturnsController,
    getReturnByIdController,
    markReturnPickedUpController,
    markReturnReceivedController,
    rejectReturnController,
} from "../controllers/returnController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createReturnSchema,
    rejectReturnSchema,
} from "../validations/returnValidation.js";

const router = express.Router();

// AUTHENTICATION
router.use(protect);

// CUSTOMER ROUTES
// Create return request
router.post(
    "/",
    authorizeRoles("CUSTOMER"),
    validate(createReturnSchema),
    createReturnController
);

// Get all my returns
router.get(
    "/",
    authorizeRoles("CUSTOMER"),
    getMyReturnsController
);

// Get return details
router.get(
    "/:id",
    authorizeRoles("CUSTOMER"),
    getReturnByIdController
);

// Cancel return
router.post(
    "/:id/cancel",
    authorizeRoles("CUSTOMER"),
    cancelReturnController
);

// SELLER ROUTES
// Approve return
router.patch(
    "/:id/approve",
    authorizeRoles("SELLER"),
    approveReturnController
);
// Reject return
router.patch(
    "/:id/reject",
    authorizeRoles("SELLER"),
    validate(rejectReturnSchema),
    rejectReturnController
);
// Mark return as picked up
router.patch(
    "/:id/picked-up",
    authorizeRoles("SELLER"),
    markReturnPickedUpController
);
// Mark return as received
router.patch(
    "/:id/received",
    authorizeRoles("SELLER"),
    markReturnReceivedController
);

export default router;