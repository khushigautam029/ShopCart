import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CouponUsage = sequelize.define(
    "CouponUsage",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        couponId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "coupon_id",
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "order_id",
        },

        discountAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "discount_amount",
        },

        usedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "used_at",
        },
    },
    {
        tableName: "coupon_usages",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default CouponUsage;