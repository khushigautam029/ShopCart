import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Review = sequelize.define(
    "Review",
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

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "product_id",
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM(
                "PUBLISHED",
                "HIDDEN"
            ),
            allowNull: false,
            defaultValue: "PUBLISHED",
        },
    },
    {
        tableName: "reviews",

        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

        indexes: [
            {
                unique: true,
                fields: ["user_id", "product_id"],
            },
        ],
    }
);

export default Review;