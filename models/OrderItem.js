import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItem = sequelize.define(
    "OrderItem",
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

        variantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "variant_id",
        },

        productName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: "product_name",
        },

        sku: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "unit_price",
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: "order_items",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default OrderItem;