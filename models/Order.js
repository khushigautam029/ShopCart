import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define(
    "Order",
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        userId :{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"user_id",
        },

        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "address_id",
        },

        orderNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: "order_number",
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },

        shippingFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            field: "shipping_fee",
        },

        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "total_amount",
        },

        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "CONFIRMED",
                "PROCESSING",
                "SHIPPED",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "CANCELLED"
            ),
            allowNull: false,
            defaultValue: "PENDING",
        },

        paymentStatus: {
            type: DataTypes.ENUM(
                "PENDING",
                "PAID",
                "FAILED",
                "REFUNDED"
            ),
            allowNull: false,
            defaultValue: "PENDING",
            field: "payment_status",
        },
    },
    {
        tableName: "orders",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Order;
