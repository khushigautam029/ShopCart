import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductVariant = sequelize.define(
    "ProductVariant",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },

        sku: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },
    },
    {
        tableName: "product_variants",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default ProductVariant;