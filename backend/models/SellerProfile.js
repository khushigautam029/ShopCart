import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SellerProfile = sequelize.define(
    "SellerProfile",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: "user_id",
        },

        storeName: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: "store_name",
        },

        storeDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "store_description",
        },
    },
    {
        tableName: "seller_profiles",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default SellerProfile;