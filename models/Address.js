import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Address = sequelize.define(
    "Address",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },

        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "full_name",
        },

        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        addressLine1: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "address_line1",
        },

        addressLine2: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "address_line2",
        },

        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        state: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        postalCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: "postal_code",
        },

        country: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "India",
        },

        addressType: {
            type: DataTypes.ENUM(
                "HOME",
                "WORK",
                "OTHER"
            ),
            allowNull: false,
            defaultValue: "HOME",
            field: "address_type",
        },

        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "is_default",
        },
    },
    {
        tableName: "addresses",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Address;