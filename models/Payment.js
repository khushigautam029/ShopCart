import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Payment = sequelize.define(
    "Payment",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        orderId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"order_id",
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"user_id",
        },
        paymentMethodId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:"payment_method_id",
        },
        provider:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        providerPaymentId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            field: "provider_payment_id",
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        currency: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "INR",
        },

        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "PAID",
                "FAILED",
                "REFUNDED"
            ),
            allowNull: false,
            defaultValue: "PENDING",
        },

        paidAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "paid_at",
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at",
        },
    },
    {
        tableName: "payments",
        timestamps: true,
    }
);

export default Payment;