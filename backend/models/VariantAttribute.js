import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VariantAttribute = sequelize.define(
    "VariantAttribute",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        variantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "variant_id",
        },

        attributeValueId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "attribute_value_id",
        },
    },
    {
        tableName: "variant_attributes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default VariantAttribute;