import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
    "Product",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        sellerId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            field:"seller_id",
        },
        categoryId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            field:"category_id",
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
        },
        status:{
            type:DataTypes.ENUM("active","inactive"),
            allowNull:false,
            defaultValue:"active",
        },
    },
    {
        tableName:"products",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
);

export default Product;