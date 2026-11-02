import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PaymentMethod = sequelize.define(
    "PaymentMethod",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        code: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },

        type: {
            type: DataTypes.ENUM(
                "CASH",
                "ONLINE",
                "CARD"
            ),
            allowNull: false,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "is_active",
        },
    },
    {
        tableName: "payment_methods",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default PaymentMethod;