import express from "express";
import {
    createCustomerNotification,
    deleteCustomerNotification,
    getNotifications,
    getUnreadCount,
    markAllAsRead,
    markAsRead,
} from "../controllers/notificationController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createNotificationSchema,
    notificationIdSchema,
} from "../validations/notificationValidation.js";
const router = express.Router();

// CREATE NOTIFICATION
router.post(
    "/",
    protect,
    authorizeRoles("CUSTOMER"),
    validate(createNotificationSchema),
    createCustomerNotification
);

// GET CUSTOMER NOTIFICATIONS
router.get(
    "/",
    protect,
    authorizeRoles("CUSTOMER"),
    getNotifications
);

// GET UNREAD NOTIFICATION COUNT
router.get(
    "/unread-count",
    protect,
    authorizeRoles("CUSTOMER"),
    getUnreadCount
);

// MARK ALL NOTIFICATIONS AS READ
router.patch(
    "/read-all",
    protect,
    authorizeRoles("CUSTOMER"),
    markAllAsRead
);

// MARK ONE NOTIFICATION AS READ
router.patch(
    "/:id/read",
    protect,
    authorizeRoles("CUSTOMER"),
    validate(notificationIdSchema, "params"),
    markAsRead
);

// DELETE ONE NOTIFICATION
router.delete(
    "/:id",
    protect,
    authorizeRoles("CUSTOMER"),
    validate(notificationIdSchema, "params"),
    deleteCustomerNotification
);

export default router;
