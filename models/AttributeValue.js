import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AttributeValue = sequelize.define(
    "AttributeValue",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        attributeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "attribute_id",
        },

        value: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: "attribute_values",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default AttributeValue;