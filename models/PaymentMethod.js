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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
        type: {
            type: DataTypes.ENUM("CARD"),
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        providerPaymentMethodId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            field: "provider_payment_method_id",
        },
        last4: {
            type: DataTypes.STRING(4),
            allowNull: true,
        },
        cardBrand: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "card_brand",
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "is_default",
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