import {
    createNotification,
    deleteNotification,
    getCustomerNotifications,
    getUnreadNotificationCount,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "../services/notificationService.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
    sendError,
    sendSuccess,
} from "../utils/responseHandler.js";

// CREATE NOTIFICATION
// Mainly used internally by other services
const createCustomerNotification = asyncHandler(async (req, res) => {
    try {
        const { userId, title, message, type } = req.body;
        const notification = await createNotification({
            userId,
            title,
            message,
            type,
        });
        return sendSuccess(
            res,
            201,
            "Notification created successfully",
            {
                notification,
            }
        );
    } catch (error) {
        return sendError(
            res,
            400,
            error.message
        );
    }
});

// GET CUSTOMER NOTIFICATIONS
const getNotifications = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await getCustomerNotifications(userId);
        return sendSuccess(
            res,
            200,
            "Notifications fetched successfully",
            {
                notifications,
            }
        );
    } catch (error) {
        return sendError(
            res,
            500,
            error.message
        );
    }
});

// GET UNREAD NOTIFICATION COUNT
const getUnreadCount = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const count = await getUnreadNotificationCount(userId);
        return sendSuccess(
            res,
            200,
            "Unread notification count fetched successfully",
            {
                count,
            }
        );
    } catch (error) {
        return sendError(
            res,
            500,
            error.message
        );
    }
});

// MARK ONE NOTIFICATION AS READ
const markAsRead = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const notification = await markNotificationAsRead(
            id,
            userId
        );
        return sendSuccess(
            res,
            200,
            "Notification marked as read successfully",
            {
                notification,
            }
        );
    } catch (error) {
        return sendError(
            res,
            404,
            error.message
        );
    }
});

// MARK ALL NOTIFICATIONS AS READ
const markAllAsRead = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedCount = await markAllNotificationsAsRead(userId);
        return sendSuccess(
            res,
            200,
            "All notifications marked as read successfully",
            {
                updatedCount,
            }
        );
    } catch (error) {
        return sendError(
            res,
            500,
            error.message
        );
    }
});

// DELETE NOTIFICATION
const deleteCustomerNotification = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await deleteNotification(id, userId);
        return sendSuccess(
            res,
            200,
            "Notification deleted successfully"
        );
    } catch (error) {
        return sendError(
            res,
            404,
            error.message
        );
    }
});

export {
    createCustomerNotification, deleteCustomerNotification, getNotifications,
    getUnreadCount, markAllAsRead, markAsRead
};

