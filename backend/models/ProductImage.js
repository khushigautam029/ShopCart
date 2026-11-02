import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductImage = sequelize.define(
    "ProductImage",
    {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },
        imageUrl: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: "image_url",
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "is_primary",
        },
        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "sort_order",
        },
    },
    {
        tableName: "product_images",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default ProductImage;