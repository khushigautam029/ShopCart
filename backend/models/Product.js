import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "seller_id",
        },

        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "category_id",
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        brand: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        gender: {
            type: DataTypes.ENUM(
                "MEN",
                "WOMEN",
                "UNISEX",
                "KIDS"
            ),
            allowNull: true,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        discount: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0,
        },

        deliveryTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "delivery_time",
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
        tableName: "products",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Product;