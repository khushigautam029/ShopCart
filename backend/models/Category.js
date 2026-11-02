import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
    "Category",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique:true,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        images: {
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        status:{
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue:"active",
            allowNull:false,
        },
    },
    {
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Category;