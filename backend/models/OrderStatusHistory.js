import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderStatusHistory = sequelize.define(
    "OrderStatusHistory",
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
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "CONFIRMED",
                "PACKED",
                "SHIPPED",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "CANCELLED"
            ),
            allowNull: false,
        },

        note: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        changedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "changed_by",
        },
    },
    {
        tableName: "order_status_history",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default OrderStatusHistory;