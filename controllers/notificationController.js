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
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

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
            STATUS_CODES.CREATED,
            MESSAGES.NOTIFICATION_CREATED,
            {
                notification,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
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
            STATUS_CODES.OK,
            MESSAGES.NOTIFICATION_FETCHED,
            {
                notifications,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
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
            STATUS_CODES.OK,
            MESSAGES.UNREAD_NOTIFICATION_COUNT_FETCHED,
            {
                count,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
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
            STATUS_CODES.OK,
            MESSAGES.NOTIFICATION_MARKED_AS_READ,
            {
                notification,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
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
            STATUS_CODES.OK,
            MESSAGES.ALL_NOTIFICATION_MARKED_AS_READ,
            {
                updatedCount,
            }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.INTERNAL_SERVER_ERROR,
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
            STATUS_CODES.OK,
            MESSAGES.NOTIFICATION_DELETED
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.NOT_FOUND,
            error.message
        );
    }
});

export {
    createCustomerNotification, deleteCustomerNotification, getNotifications,
    getUnreadCount, markAllAsRead, markAsRead
};

