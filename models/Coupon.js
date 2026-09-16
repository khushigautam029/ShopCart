import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Coupon = sequelize.define(
    "Coupon",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        discountType: {
            type: DataTypes.ENUM(
                "FLAT",
                "PERCENTAGE"
            ),
            allowNull: false,
            field: "discount_type",
        },
        discountValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "discount_value",
        },
        minOrderAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            field: "min_order_amount",
        },
        maxDiscount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: "max_discount",
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "start_date",
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "end_date",
        },
        usageLimit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "usage_limit",
        },
        usedCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "used_count",
        },
        status: {
            type: DataTypes.ENUM(
                "ACTIVE",
                "INACTIVE"
            ),
            allowNull: false,
            defaultValue: "ACTIVE",
        },
    },
    {
        tableName: "coupons",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Coupon;