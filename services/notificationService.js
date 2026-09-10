import Notification from "../models/Notification.js";
import User from "../models/User.js";

const createNotification = async ({
    userId,
    title,
    message,
    type,
}) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    if (user.role !== "CUSTOMER") {
        throw new Error("Notifications can only be created for customers");
    }
    const notification = await Notification.create({
        userId,
        title,
        message,
        type,
    });
    return notification;
};

const getCustomerNotifications = async (userId) => {
    const notifications = await Notification.findAll({
        where: {
            userId,
        },
        order: [["created_at", "DESC"]],
    });
    return notifications;
};

const getUnreadNotificationCount = async (userId) => {
    const count = await Notification.count({
        where: {
            userId,
            isRead: false,
        },
    });
    return count;
};

const markNotificationAsRead = async (notificationId, userId) => {
    const notification = await Notification.findOne({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        throw new Error("Notification not found");
    }
    if (!notification.isRead) {
        notification.isRead = true;
        await notification.save();
    }
    return notification;
};

const markAllNotificationsAsRead = async (userId) => {
    const [updatedCount] = await Notification.update(
        {
            isRead: true,
        },
        {
            where: {
                userId,
                isRead: false,
            },
        }
    );
    return updatedCount;
};

const deleteNotification = async (notificationId, userId) => {
    const notification = await Notification.findOne({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        throw new Error("Notification not found");
    }
    await notification.destroy();
    return notification;
};

export {
    createNotification, deleteNotification, getCustomerNotifications,
    getUnreadNotificationCount, markAllNotificationsAsRead, markNotificationAsRead
};
