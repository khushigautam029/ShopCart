import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },

        role: {
            type: DataTypes.ENUM("CUSTOMER", "SELLER"),
            allowNull: false,
            defaultValue: "CUSTOMER",
        },

        status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE", "BLOCKED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },

        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "is_verified",
        },
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default User;