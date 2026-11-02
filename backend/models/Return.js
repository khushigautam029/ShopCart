import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Return = sequelize.define(
    "Return",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "order_id",
        },

        orderItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "order_item_id",
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },

        reason: {
            type: DataTypes.ENUM(
                "DAMAGED",
                "DEFECTIVE",
                "WRONG_ITEM",
                "ITEM_NOT_AS_DESCRIBED",
                "SIZE_ISSUE",
                "CHANGED_MIND",
                "OTHER"
            ),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(
                "REQUESTED",
                "APPROVED",
                "REJECTED",
                "PICKED_UP",
                "RECEIVED",
                "REFUNDED",
                "CANCELLED"
            ),
            allowNull: false,
            defaultValue: "REQUESTED",
        },

        requestedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "requested_at",
        },

        approvedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "approved_at",
        },

        receivedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "received_at",
        },

        refundedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "refunded_at",
        },
    },
    {
        tableName: "returns",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Return;