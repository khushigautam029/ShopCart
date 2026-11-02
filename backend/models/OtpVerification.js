import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OtpVerification = sequelize.define(
    "OtpVerification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "expires_at",
        },

        verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "verified_at",
        },
    },
    {
        tableName: "otp_verifications",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default OtpVerification;